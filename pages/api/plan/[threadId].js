import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Extract threadId from the dynamic route parameter
      const { threadId } = req.query;

      // Validate threadId
      if (!threadId) {
        return res.status(400).json({ message: "threadId is required" });
      }

      // Fetch plans associated with the threadId
      const plans = await prisma.plan.findMany({
        where: {
          threadId: threadId, // Filter plans by threadId
        },
      });

      // If no plans are found, return a 404 error
      if (plans.length === 0) {
        return res
          .status(404)
          .json({ message: "No plans found for this thread" });
      }

      // Return the plans as the response
      return res.status(200).json(plans);
    } catch (error) {
      console.error("Error fetching plans:", error.message);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // Handle other HTTP methods
    return res.status(405).json({ message: "Method not allowed" });
  }
}
