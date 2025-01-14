import { OpenAI } from "openai";
import { config } from "dotenv";
import { system_prompt } from "./data/prompt";
  // Make sure to import your auth config

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const assistantID = process.env.ASSISTANT;
let threads = {};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userTokenHeader = req.headers["x-user-token"];
    const user = userTokenHeader ? JSON.parse(userTokenHeader) : null;

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user token founds" , req : req.headers});
    }

    const { thread_id, message } = req.body;

    if (!assistantID) {
      return res
        .status(500)
        .json({ error: "Assitent ID is missed, serevr-side Error" });
    }

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      let currentThreadId = thread_id;

      // If no thread exists, create one
      if (!currentThreadId || !threads[currentThreadId]) {
        const thread = await openai.beta.threads.create();
        currentThreadId = thread.id;
        threads[currentThreadId] = thread;
      }

      // Send user message to the thread
      await openai.beta.threads.messages.create(currentThreadId, {
        role: "user",
        content: message,
      });

      // Create a run to get the assistant's response

      // Send request to start the run
      const run = await openai.beta.threads.runs.createAndPoll(
        currentThreadId,
        {
          assistant_id: assistantID,
          instructions: system_prompt("jhone"),
          tools: [
            {
              type: "file_search",
            },
          ],
        }
      );

      // Wait for the run to complete
      while (true) {
        const runStatus = await openai.beta.threads.runs.retrieve(
          currentThreadId,
          run.id
        );
        if (runStatus.status === "completed") {
          break;
        }
      }

      // Retrieve the assistant's response
      const messages = await openai.beta.threads.messages.list(run.thread_id);

      const assistantMessage = messages.data.find(
        (msg) => msg.role === "assistant"
      );

      res.status(200).json({
        response: assistantMessage
          ? assistantMessage.content[0].text.value
          : "No response",
        thread_id: currentThreadId,
        user,
      });
    } catch (error) {
      console.error("Error: ", error); // Log full error for debugging
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
