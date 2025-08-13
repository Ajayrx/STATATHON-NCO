import faiss
import numpy as np
import pandas as pd
from app.utils.embedder import get_embedder
from app.core.config import settings
import math

# Globals to hold index and dataframe
df = None
index = None
model = get_embedder(settings.model_name)


def load_index_and_data():
    global df, index

    # Load CSV and force nco_code as string to preserve decimals and trailing zeros
    df = pd.read_csv(
        "app/data/nco2015_job_reference.csv",
        dtype={"nco_code": str}
    )

    # Ensure codes are exactly as in CSV (with dot)
    df["nco_code"] = df["nco_code"].apply(lambda x: x if "." in x else x[:4] + "." + x[4:])

    # Load FAISS index
    index = faiss.read_index("app/data/nco2015_faiss.index")


# Load data and index at startup
load_index_and_data()


def search_jobs(query: str, k: int = 99):
    """
    Search for jobs using FAISS vector index.

    Args:
        query (str): Search query string.
        k (int): Number of top results to return.

    Returns:
        List[dict]: Each dict contains 'nco_code', 'title', 'score'.
    """
    vector = model.encode([query])
    vector = np.array(vector).astype('float32')

    D, I = index.search(vector, k)
    print("Query:", query)
    print("Returned indices:", I)
    print("Returned distances:", D)

    results = []
    for i, score in zip(I[0], D[0]):
        if i == -1 or i >= len(df):
            continue
        if not math.isfinite(score):
            continue

        row = df.iloc[i]

        results.append({
            "nco_code": row["nco_code"],  # Full string code with dot
            "title": row["title"],
            "score": float(score)
        })

        print(f"Match: {row['title']} ({row['nco_code']}) with score {score}")

    return results
