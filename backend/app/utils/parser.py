import re
import pandas as pd
from PyPDF2 import PdfReader

def parse_pdf_to_csv(pdf_path, output_csv_path):
    reader = PdfReader(pdf_path)
    pattern = re.compile(r"(\d{4}\.\d{4})\s+([^\d\n]+)")
    rows = []
    for i in range(32, len(reader.pages)):
        text = reader.pages[i].extract_text()
        if not text:
            continue
        matches = pattern.findall(text)
        for code, title in matches:
            rows.append((code.strip(), title.strip()))
    df = pd.DataFrame(rows, columns=["NCO_Code", "Job_Title"])
    df.to_csv(output_csv_path, index=False)
