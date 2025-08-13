import pandas as pd
import faiss
from pathlib import Path
from app.utils.embedder import get_embedder
import importlib
import sys

# Paths
CSV_PATH = Path("app/data/nco2015_job_reference.csv")
FAISS_INDEX_PATH = Path("app/data/nco2015_faiss.index")

def rebuild_faiss_index(hot_reload=False):
    print("🔄 Rebuilding FAISS index...")

    # --- Step 1: Load CSV ---
    if not CSV_PATH.exists():
        raise FileNotFoundError(f"❌ CSV not found: {CSV_PATH}")
    df = pd.read_csv(CSV_PATH)
    df.columns = df.columns.str.lower()

    if "nco_code" not in df.columns or "title" not in df.columns:
        raise ValueError("❌ CSV must contain 'nco_code' and 'title' columns.")

    print(f"📄 Loaded {len(df)} jobs from CSV.")

    # --- Step 2: Prepare text for embeddings ---
    texts = df.apply(lambda row: f"{row['nco_code']} {row['title']}", axis=1).tolist()

    # --- Step 3: Load embedder ---
    embedder = get_embedder()
    try:
        model_name = getattr(embedder, 'model_card', None) or getattr(embedder, 'name', 'Unknown model')
    except:
        model_name = 'Unknown model'
    print(f"🧠 Using embedding model: {model_name}")

    # --- Step 4: Encode text ---
    vectors = embedder.encode(texts)
    if len(vectors) != len(df):
        raise ValueError("❌ Mismatch: Number of vectors != number of rows in CSV.")

    print(f"🔢 Encoded {len(vectors)} vectors with dimension {vectors.shape[1]}.")

    # --- Step 5: Build and save FAISS index ---
    index = faiss.IndexFlatL2(vectors.shape[1])
    index.add(vectors)
    faiss.write_index(index, str(FAISS_INDEX_PATH))
    print(f"✅ FAISS index saved with {index.ntotal} entries → {FAISS_INDEX_PATH}")

    # --- Step 6: Show last few jobs ---
    print("🆕 Last few jobs in index:")
    print(df.tail(3).to_string(index=False))

    # --- Step 7: Optional hot reload ---
    if hot_reload:
        print("♻️ Hot reloading search module...")
        try:
            if "app.routes.search_routes" in sys.modules:
                importlib.reload(sys.modules["app.routes.search_routes"])
                print("✅ Search routes reloaded.")
            else:
                print("ℹ️ No search_routes module loaded in memory yet.")
        except Exception as e:
            print(f"⚠️ Hot reload failed: {e}")

if __name__ == "__main__":
    rebuild_faiss_index(hot_reload=False)
