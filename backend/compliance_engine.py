import random

def generate_status():
    probabilities = {
        "Completed": 0.4,
        "Acknowledged": 0.3,
        "Pending": 0.2,
        "Overdue": 0.1
    }

    rand = random.random()
    cumulative = 0

    for status, prob in probabilities.items():
        cumulative += prob
        if rand <= cumulative:
            return status

def compliance_score(status):
    scores = {
        "Completed": 100,
        "Acknowledged": 70,
        "Pending": 40,
        "Overdue": 10
    }

    return scores.get(status, 0)