from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import openai
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

assistant_id = os.getenv("ASSITENT")

threads = {}


@app.route("/api")
def home():
    return render_template("index.html")


@app.route("/api/start_chat", methods=["POST"])
def start_chat():
    thread = client.beta.threads.create()
    thread_id = thread.id
    threads[thread_id] = thread
    return jsonify({"thread_id": thread_id})


@app.route("/api/send_message", methods=["POST"])
def send_message():
    data = request.json
    thread_id = data.get("thread_id")
    user_message = data.get("message")

    if not thread_id or not user_message:
        return jsonify({"error": "Missing thread_id or message"}), 400

    try:

        client.beta.threads.messages.create(
            thread_id=thread_id, role="user", content=user_message
        )

        run = client.beta.threads.runs.create(
            thread_id=thread_id, assistant_id=assistant_id
        )

        while True:
            run_status = client.beta.threads.runs.retrieve(
                thread_id=thread_id, run_id=run.id
            )
            if run_status.status == "completed":
                break

        messages = client.beta.threads.messages.list(thread_id=thread_id)
        assistant_message = next(msg for msg in messages if msg.role == "assistant")

        return jsonify(
            {
                "response": assistant_message.content[0].text.value,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run()
