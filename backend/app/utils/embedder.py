from sentence_transformers import SentenceTransformer
from pathlib import Path

DEFAULT_MODEL = "all-MiniLM-L6-v2"

def get_embedder(model_name: str = DEFAULT_MODEL):
    """
    Always load SentenceTransformer model from local storage if available.
    Falls back to downloading from HuggingFace if not found locally.
    """
    local_path = Path("app/models") / model_name
    if local_path.exists():
        print(f"✅ Loading embedder from local path: {local_path}")
        return SentenceTransformer(str(local_path))

    print(f"🌐 Model not found locally. Downloading {model_name} from HuggingFace...")
    model = SentenceTransformer(model_name)
    local_path.parent.mkdir(parents=True, exist_ok=True)
    model.save(str(local_path))
    print(f"💾 Model saved locally to: {local_path}")
    return model

