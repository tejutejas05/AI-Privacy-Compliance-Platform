import uuid
from datetime import datetime

def generate_request(name, email, platform):
    request_id = str(uuid.uuid4())[:8]
    date = datetime.now().strftime("%Y-%m-%d")

    letter = f"""
Subject: Request for Personal Data Erasure

Dear {platform} Team,

I am formally requesting deletion of all personal data associated 
with my account under applicable data protection laws.

Name: {name}
Registered Email: {email}
Request ID: {request_id}
Date: {date}

Please confirm once completed.

Regards,
{name}
"""

    return letter, request_id

    