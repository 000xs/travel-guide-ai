import { OpenAI } from "openai";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { parseItineraryToJSON } from "@/utils/parseItinerary";

config();

// Initialize Prisma Client once and reuse it
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;

    try {
      // Validate user token
      let token;
      try {
        const userToken = req.headers["x-user-token"];
        if (!userToken) {
          return res
            .status(401)
            .json({ message: "Unauthorized: No user token found" });
        }
        token = JSON.parse(userToken);
      } catch (error) {
        console.error("Invalid user token format:", error.message);
        return res.status(400).json({ message: "Invalid user token format" });
      }

      // Validate OpenAI configuration
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const assistantID = process.env.ASSISTANT;
      if (!assistantID || !process.env.OPENAI_API_KEY) {
        return res
          .status(500)
          .json({ error: "Assistant ID or OpenAI Key is missing" });
      }

      // Create thread using OpenAI API
      let thread;
      try {
        thread = await openai.beta.threads.create();
        if (!thread) throw new Error("Thread creation failed");
      } catch (error) {
        console.error("Error creating thread:", error.message);
        return res
          .status(500)
          .json({ message: "Thread creation failed", error });
      }

      // Lookup account by userId
      const accounts = await prisma.account.findMany({
        where: { userId: token.userId },
      });

      if (accounts.length === 0) {
        console.error("No accounts found for user:", token.userId);
        return res.status(404).json({ message: "No accounts found for user" });
      }

      // Assuming you're using the first account or specify one if needed
      const account = accounts[0];

      // Validate accountId
      const accountExists = await prisma.account.findUnique({
        where: { id: account.id },
      });

      if (!accountExists) {
        return res.status(404).json({ message: "Account not found" });
      }

      // Parse itinerary data
      let itineraryData;
      try {
        itineraryData = JSON.parse(parseItineraryToJSON(body.prompt));
      } catch (error) {
        console.error("Error parsing itinerary data:", error.message);
        return res
          .status(400)
          .json({ message: "Invalid itinerary data format" });
      }

      // Validate dates
      const startDate = new Date(body.startDate);
      const endDate = new Date(body.endDate);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }

      // Step 1: Create a new thread in the database
      const newThread = await prisma.thread.create({
        data: {
          id: thread.id,
          name: itineraryData.tripName,
          account: {
            connect: { id: account.id },
          },
          ...(account.userId && {
            User: {
              // Use `User` (uppercase)
              connect: { id: account.userId },
            },
          }),
        },
      });

      // Step 2: Create a new plan and connect it to the thread
      const newPlan = await prisma.plan.create({
        data: {
          tripName: itineraryData.tripName,
          startDate: startDate,
          endDate: endDate,
          budget: body.budget || "Upscale",
          travelers: body.travelers || {},
          selectedViber: body.selectedViber || [],
          itinerary: itineraryData.itinerary || [],
          thread: {
            connect: { id: newThread.id },
          },
        },
      });

      // Return the newly created plan and thread
      return res.status(201).json({
        message: "Plan and thread created successfully!",
        thread: newThread,
        plan: newPlan,
      });
    } catch (error) {
      console.error("Error in /api/plan handler:", error.message);
      res.status(500).json({ message: "Internal Server Error", error });
    } finally {
      await prisma.$disconnect();
    }
  }
  if (req.method === "GET") {
    try {
      // Validate user token
      let token;
      try {
        const userToken = req.headers["x-user-token"];
        if (!userToken) {
          return res
            .status(401)
            .json({ message: "Unauthorized: No user token found" });
        }
        token = JSON.parse(userToken);
      } catch (error) {
        console.error("Invalid user token format:", error.message);
        return res.status(400).json({ message: "Invalid user token format" });
      }

      // Lookup account by userId
      const accounts = await prisma.account.findMany({
        where: { userId: token.userId },
      });

      if (accounts.length === 0) {
        console.error("No accounts found for user:", token.userId);
        return res.status(404).json({ message: "No accounts found for user" });
      }

      // Assuming you're using the first account or specify one if needed
      const account = accounts[0];

      // Fetch all plans where the thread's accountId matches the account.id
      const plans = await prisma.plan.findMany({
        where: {
          thread: {
            accountId: account.id, // Filter plans by thread's accountId
          },
        },
        include: {
          thread: true, // Include thread details if needed
        },
      });

      // Return the plans as the response
      return res.status(200).json(plans);
    } catch (error) {
      console.error("Error in /api/plan handler:", error.message);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
