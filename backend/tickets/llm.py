import os
import json
import re
import google.generativeai as genai

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY environment variable not set")

genai.configure(api_key=api_key)

def classify_ticket(description: str):
    """
    Calls Google Gemini to classify a ticket description into category and priority.
    Returns JSON with keys 'category' and 'priority'.
    Falls back to defaults if parsing fails.
    """
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")

        prompt = f"""
        You are a support ticket classifier.
        Based on the description below, return ONLY valid JSON with two keys:
        - category: one of ["billing", "technical", "account", "general"]
        - priority: one of ["low", "medium", "high", "critical"]

        Do not include explanations, text, or formatting outside of JSON.

        Description: "{description}"
        """

        response = model.generate_content(prompt)
        raw = response.text.strip()
        print("Gemini raw response:", raw)

        # Extract JSON block if Gemini adds extra text
        match = re.search(r"\{.*\}", raw, re.DOTALL)
        if match:
            raw_json = match.group(0)
            classification = json.loads(raw_json)
        else:
            classification = json.loads(raw)

        category = classification.get("category", "general")
        priority = classification.get("priority", "medium")

        return {"category": category, "priority": priority}

    except Exception as e:
        print("Classification error:", e)
        return {"category": "general", "priority": "medium"}