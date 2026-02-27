import streamlit as st
from ai_engine import detect_platforms
from risk_engine import calculate_exposure, risk_level
from deletion_engine import generate_request
from compliance_engine import generate_status, compliance_score

st.set_page_config(page_title="PrivacyGuard", layout="wide")

st.title("🔐 PrivacyGuard – AI Privacy Compliance Platform")

name = st.text_input("Enter Your Name")
email = st.text_input("Enter Your Email")

uploaded_file = st.file_uploader("Upload Email Data (.txt)", type=["txt"])

if uploaded_file:
    text = uploaded_file.read().decode("utf-8")

    df = detect_platforms(text)

    if not df.empty:
        st.subheader("Detected Platforms")
        st.dataframe(df)

        score = calculate_exposure(df)
        level = risk_level(score)

        st.metric("Digital Exposure Score", score)
        st.write("Risk Level:", level)

        platform = st.selectbox("Select Platform", df["Platform"])

        if st.button("Generate Deletion Request"):
            letter, request_id = generate_request(name, email, platform)

            st.text_area("Generated Request", letter, height=250)

            status = generate_status()
            comp_score = compliance_score(status)

            st.subheader("Compliance Tracking")
            st.write("Status:", status)
            st.write("Compliance Score:", comp_score)
    else:
        st.warning("No platforms detected.")