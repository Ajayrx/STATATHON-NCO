import os
import pandas as pd
import faiss
import numpy as np
from pathlib import Path

from app.utils.embedder import get_embedder
from app.utils.parser import parse_pdfs_to_csv

# Paths
DATA_DIR = Path("app/data")
csv_path = DATA_DIR / "nco2015_job_reference.csv"
faiss_index_path = DATA_DIR / "nco2015_faiss.index"

# Add as many PDFs as you like here
pdf_paths = [
    DATA_DIR / "NCO-2015-Vol1.pdf",
    DATA_DIR / "NCO-2015-Vol2.pdf",  # Example new PDF
    DATA_DIR / "NCO-2015-Vol3.pdf"   # Example new PDF
]

def main():
    # Parse all PDFs into single CSV
    parse_pdfs_to_csv(pdf_paths, csv_path)

    # Load and clean CSV
    df = pd.read_csv(csv_path)
    df.columns = df.columns.str.lower()
    df["title"] = df["title"].fillna("").astype(str)

    print(f"📦 Loaded {len(df)} job entries from CSV.")

    # Embed job titles
    print("🔢 Embedding job titles...")
    model = get_embedder()
    embeddings = model.encode(df["title"].tolist(), show_progress_bar=True)
    embeddings = np.array(embeddings).astype('float32')

    # Build FAISS index
    print("⚙️ Building FAISS index...")
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)

    # Save FAISS index
    faiss.write_index(index, str(faiss_index_path))
    print(f"✅ CSV + FAISS index saved successfully at {faiss_index_path}")

if __name__ == "__main__":
    main()
