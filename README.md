# Smart NCO Search™  
_A trademark project created by Mephisto X_

An **AI-powered occupational code search engine** built with **FastAPI**, **FAISS**, and **React**.  
Search **National Classification of Occupations (NCO-2015)** job codes using **natural language** with lightning-fast semantic search.  

---

## 🚀 Features

- **Semantic Search** – Search jobs by meaning, not just exact keywords.
- **Real-Time Index Rebuild** – Newly added jobs via the Admin Panel are instantly searchable.
- **Multi-PDF Parsing** – Import and merge multiple NCO PDF volumes into a single dataset.
- **Admin Panel** – Add, edit, and delete NCO job codes and titles.
- **Search Logs** – Automatically save and view search history.
- **Full-Stack Application** – Built with FastAPI (backend) + React + TailwindCSS (frontend).

---

## 🛠 Tech Stack

### **Backend**
- [FastAPI](https://fastapi.tiangolo.com/) – High-performance API framework
- [FAISS](https://github.com/facebookresearch/faiss) – Vector similarity search
- [SentenceTransformers](https://www.sbert.net/) – Text embeddings for semantic search
- [SQLAlchemy](https://www.sqlalchemy.org/) – ORM for database operations
- [SQLite / PostgreSQL](https://www.sqlite.org/) – Database for job metadata & logs

### **Frontend**
- [React](https://reactjs.org/) – UI library
- [Tailwind CSS](https://tailwindcss.com/) – Styling framework
- [Vite](https://vitejs.dev/) – Fast frontend build tool

---

## 📂 Project Structure

smart-nco-search/
├── backend/ # 🔙 All server-side logic
│ ├── app/
│ │ ├── api/ # 🚪 API routes
│ │ │ ├── v1/
│ │ │ │ ├── routes_search.py # /api/v1/search — FAISS query endpoint
│ │ │ │ ├── routes_admin.py # /api/v1/admin — Add/edit job codes
│ │ │ │ └── init.py
│ │ ├── core/
│ │ │ ├── config.py # 🔐 App configs, env, DB URI, model name
│ │ │ ├── search_engine.py # 🤖 FAISS logic (embed + search)
│ │ │ └── index_builder.py # 🛠️ Build FAISS index from CSV (new)
│ │ ├── db/ # 🗃️ DB: models, session, queries
│ │ │ ├── models.py # SQLAlchemy models: JobCode, SearchLog
│ │ │ ├── crud.py # DB query functions (get, add, update)
│ │ │ └── database.py # DB engine + session setup
│ │ ├── schemas/ # 🧱 Pydantic schemas for input/output
│ │ │ ├── job.py
│ │ │ └── search.py
│ │ ├── data/ # 📂 Static or generated data
│ │ │ ├── nco2015_job_reference.csv # Metadata table
│ │ │ ├── nco2015_faiss.index # FAISS vector index
│ │ │ └── NCO-2015-Vol1.pdf # Original raw PDF
│ │ ├── utils/ # 🧰 Utility tools: embeddings, file IO, etc.
│ │ │ ├── embedder.py # SentenceTransformer loader
│ │ │ └── parser.py # PDF → CSV parser
│ │ └── main.py # 🚀 FastAPI app entrypoint
│ ├── scripts/
│ │ └── prepare_data.py # 🛠️ Run once to prepare CSV + FAISS
│ └── requirements.txt # 📦 Backend dependencies
│
├── frontend/ # 🌐 Client-side React app
│ ├── public/ # Static files (favicon, icons, etc.)
│ ├── src/
│ │ ├── components/
│ │ │ ├── SearchBox.jsx # Input + mic
│ │ │ ├── ResultsList.jsx # Display results
│ │ │ ├── AdminPanel.jsx # Add/edit NCO codes (optional)
│ │ │ └── PageWrapper.jsx # ✨ Wrapper for page layout
│ │ ├── pages/
│ │ │ ├── Home.jsx # Landing page
│ │ │ └── SearchLogPage.jsx # 📜 Search logs page
│ │ ├── App.jsx
│ │ ├── index.jsx # Main React entry
│ │ └── index.css # Global styles
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── package.json
│
├── .env # 🔐 API keys, DB URIs
├── README.md
└── .gitignore


---

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/smart-nco-search.git
cd smart-nco-search

2️⃣ Backend Setup

cd smart-nco-search
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt


Prepare CSV & FAISS index:
python -m scripts.prepare_data

Run FastAPI server:
uvicorn app.main:app --reload


3️⃣ Frontend Setup

cd cd smart-nco-search/frontend
npm install
npm run dev

---

© 2025 Smart NCO Search™ — Created and maintained by Mephisto X.  
All rights reserved.