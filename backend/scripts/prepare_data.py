from app.utils.embedder import get_embedder
from app.utils.parser import parse_pdf_to_csv
from app.core.config import settings
import pandas as pd
import faiss
import numpy as np
import os

# Parse PDF to CSV
csv_path = "app/data/nco2015_job_reference.csv"
pdf_path = "app/data/NCO-2015-Vol1.pdf"
parse_pdf_to_csv(pdf_path, csv_path)

# Load and clean CSV
df = pd.read_csv(csv_path)
df["Job_Title"] = df["Job_Title"].fillna("").astype(str)  # <- ✅ this line fixes your issue

# Embed job titles
model = get_embedder()
embeddings = model.encode(df["Job_Title"].tolist(), show_progress_bar=True)

# Save FAISS index
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(np.array(embeddings))
faiss.write_index(index, "app/data/nco2015_faiss.index")

print("✅ CSV and FAISS index generated successfully.")
