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

    # Load CSV and force nco_code/title as string
    df = pd.read_csv(
        "app/data/nco2015_job_reference.csv",
        dtype={"nco_code": str, "title": str}
    )

    # Ensure codes are exactly as in CSV (with dot)
    df["nco_code"] = df["nco_code"].apply(lambda x: x if "." in x else x[:4] + "." + x[4:])

    # Replace missing titles with a placeholder
    df["title"] = df["title"].fillna("Title Not Available").apply(lambda t: t.strip() if isinstance(t, str) else t)

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
    seen = set()

    for i, score in zip(I[0], D[0]):
        if i == -1 or i >= len(df):
            continue
        if not math.isfinite(score):
            continue

        row = df.iloc[i]

        # Ensure both are strings & handle missing titles
        nco_code = str(row["nco_code"]).strip() if pd.notna(row["nco_code"]) else "Unknown Code"
        title = str(row["title"]).strip() if pd.notna(row["title"]) and str(row["title"]).strip() else "Title Not Available"

        key = (nco_code.lower(), title.lower())
        if key in seen:
            continue
        seen.add(key)

        results.append({
            "nco_code": nco_code,
            "title": title,
            "score": float(score)
        })

        print(f"Match: {title} ({nco_code}) with score {score}")

    return results
