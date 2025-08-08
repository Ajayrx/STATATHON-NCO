from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import routes_search, routes_admin

app = FastAPI(
    title="Smart NCO-2015 Search API",
    version="1.0"
)

# CORS for frontend → backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_search.router, prefix="/api/v1/search", tags=["Search"])
app.include_router(routes_admin.router, prefix="/api/v1/admin", tags=["Admin"])
