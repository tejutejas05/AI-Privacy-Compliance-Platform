CATEGORY_RISK = {
    "Finance": 25,
    "Professional": 15,
    "Social": 10,
    "E-commerce": 8,
    "Subscription": 5,
    "Other": 3
}

def calculate_exposure(df):
    if df.empty:
        return 0

    # Remove duplicate platforms
    df_unique = df.drop_duplicates(subset=["Platform"])

    # Calculate total weighted risk
    total_risk = 0
    for _, row in df_unique.iterrows():
        total_risk += CATEGORY_RISK.get(row["Category"], 3)

    # Normalize by number of platforms
    avg_risk = total_risk / len(df_unique)

    # Scale to 0–100 range
    normalized_score = min(int((avg_risk / 25) * 100), 100)

    return normalized_score


def risk_level(score):
    if score < 30:
        return "Low"
    elif score < 70:
        return "Moderate"
    else:
        return "High"