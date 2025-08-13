import re
import pandas as pd
from PyPDF2 import PdfReader
from pathlib import Path

def parse_pdf(pdf_path):
    """
    Parses a single PDF and returns a DataFrame with columns: nco_code, title
    """
    reader = PdfReader(pdf_path)
    pattern = re.compile(r"(\d{4}\.\d{4})\s+([^\d\n]+)")
    rows = []

    # Adjust starting page index if your PDF has a long intro
    for i in range(32, len(reader.pages)):
        text = reader.pages[i].extract_text()
        if not text:
            continue
        matches = pattern.findall(text)
        for code, title in matches:
            rows.append((code.strip(), title.strip()))

    df = pd.DataFrame(rows, columns=["nco_code", "title"])
    df["nco_code"] = df["nco_code"].astype(str)  # Ensure string type
    return df

def parse_pdfs_to_csv(pdf_paths, output_csv_path):
    """
    Parse multiple PDFs and append to existing CSV (removing duplicates).
    """
    all_data = []

    # Load existing CSV if it exists
    if Path(output_csv_path).exists():
        existing_df = pd.read_csv(output_csv_path)
        existing_df.columns = existing_df.columns.str.lower()
        existing_df["nco_code"] = existing_df["nco_code"].astype(str)  # Ensure string type
        all_data.append(existing_df)

    # Parse each PDF and append
    for pdf_path in pdf_paths:
        print(f"📄 Parsing: {pdf_path}")
        df = parse_pdf(pdf_path)
        all_data.append(df)

    # Merge all data, drop duplicates, sort
    final_df = pd.concat(all_data, ignore_index=True)
    final_df.drop_duplicates(subset=["nco_code", "title"], inplace=True)
    final_df.sort_values(by="nco_code", inplace=True)

    # Save back to CSV
    final_df.to_csv(output_csv_path, index=False)
    print(f"✅ CSV updated with {len(final_df)} unique jobs at: {output_csv_path}")
