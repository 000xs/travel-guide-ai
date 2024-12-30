import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ thread_id: threadId, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setChat((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);

        // Store the thread_id for future interactions
        if (!threadId) {
          setThreadId(data.thread_id);
        }
      } else {
        setChat((prev) => [
          ...prev,
          { role: "assistant", content: "Error: " + data.error },
        ]);
      }
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Failed to send message." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">AI Chat</h1>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <div className="h-96 overflow-y-scroll border-b mb-4">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
          {loading && <div className="text-center">Thinking...</div>}
        </div>

        <div className="flex items-center mt-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
