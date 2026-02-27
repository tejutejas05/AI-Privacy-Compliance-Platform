import spacy
import pandas as pd
import re

nlp = spacy.load("en_core_web_sm")

CATEGORY_KEYWORDS = {
    "Finance": ["bank", "payment", "transaction", "loan", "credit"],
    "Social": ["profile", "friend", "message", "social"],
    "E-commerce": ["order", "cart", "delivery", "purchase"],
    "Subscription": ["subscription", "renewal", "membership"],
    "Professional": ["job", "career", "resume", "hiring"]
}

def clean_text(text):
    text = re.sub(r'\n', ' ', text)
    return text

def classify_category(context):
    context = context.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        for word in keywords:
            if word in context:
                return category
    return "Other"

def detect_platforms(email_text):
    email_text = clean_text(email_text)
    doc = nlp(email_text)

    platforms = {}

    for ent in doc.ents:
        if ent.label_ == "ORG":
            name = ent.text.strip()
            context = email_text[max(0, ent.start_char-100):ent.end_char+100]
            category = classify_category(context)

            platforms[name] = category

    data = []
    for name, category in platforms.items():
        data.append({
            "Platform": name,
            "Category": category
        })

    return pd.DataFrame(data)