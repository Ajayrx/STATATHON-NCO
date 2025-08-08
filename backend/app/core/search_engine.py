import faiss
import numpy as np
import pandas as pd
from app.utils.embedder import get_embedder
from app.core.config import settings


df = pd.read_csv("app/data/nco2015_job_reference.csv")
index = faiss.read_index("app/data/nco2015_faiss.index")
model = get_embedder(settings.model_name)


def search_jobs(query: str, k: int = 5):
    vector = model.encode([query])
    D, I = index.search(np.array(vector), k)
    results = []
    for i, score in zip(I[0], D[0]):
        row = df.iloc[i]
        results.append({
            "nco_code": row["NCO_Code"],
            "title": row["Job_Title"],
            "score": float(score)
        })
    return results
