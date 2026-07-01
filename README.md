# AI-Powered Smart Resume Screening System

A full-stack application that leverages modern AI (Sentence Transformers) to match candidate resumes against a job description. 

## Features
- Upload multiple resumes in PDF or DOCX format (Drag and Drop supported).
- Extracts text using `pdfplumber` and `python-docx`.
- Uses `SentenceTransformers` (`all-MiniLM-L6-v2`) to generate embeddings and calculate cosine similarity scores (0-100%).
- Extracts tech skills and identifies missing vs. matched skills.
- Generates a brief AI-style explanation for the candidate's match score.
- Modern, glassmorphism UI built with React, Vite, and Tailwind CSS.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Axios, React Dropzone, Lucide Icons.
- **Backend**: Python, FastAPI, Uvicorn, SentenceTransformers, spaCy/regex (for skills), Scikit-Learn.

---

## 🚀 Setup Instructions

### 1. Backend Setup

Open a terminal and navigate to the `backend` folder:
```bash
cd backend
```

Create a virtual environment (recommended):
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Mac/Linux
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the FastAPI server:
```bash
python main.py
```
*Note: The first time you run this, it will download the `all-MiniLM-L6-v2` AI model (~90MB). Please wait for it to finish downloading.*
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup

Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The React app will be available at the URL provided in the terminal (usually `http://localhost:5173`).

---

## Usage
1. Open the Frontend URL in your browser.
2. Paste a job description into the text area.
3. Drag and drop (or select) 1 or more PDF/DOCX resumes.
4. Click **Analyze Resumes**.
5. View the matched skills, missing skills, match percentage, and explanation!
