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
    df = pd.read_csv("app/data/nco2015_job_reference.csv")
    index = faiss.read_index("app/data/nco2015_faiss.index")

# Initially load on startup
load_index_and_data()

def search_jobs(query: str, k: int = 5):
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
        print(f"Match: {row['title']} with score {score}")
        results.append({
            "nco_code": row["nco_code"],
            "title": row["title"],
            "score": float(score)
        })
    return results
