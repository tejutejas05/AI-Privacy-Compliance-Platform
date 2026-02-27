CATEGORY_RISK = {
    "Finance": 25,
    "Professional": 15,
    "Social": 10,
    "E-commerce": 8,
    "Subscription": 5,
    "Other": 3
}

def calculate_exposure(df):
    total = 0
    for _, row in df.iterrows():
        total += CATEGORY_RISK.get(row["Category"], 3)

    return min(total, 100)

def risk_level(score):
    if score < 30:
        return "Low"
    elif score < 70:
        return "Moderate"
    else:
        return "High"