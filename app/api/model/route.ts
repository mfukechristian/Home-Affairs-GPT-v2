import { NextResponse, NextRequest } from "next/server";
import dotenv from "dotenv";
dotenv.config();
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { z } from "zod";

const webSearchContentTool = new TavilySearchResults({
  maxResults: 5,
  apiKey: process.env.TAVILY_API_KEY_1,
});

const RequestBodySchema = z.object({
  service: z.string().min(1, "Service cannot be empty"),
  subService: z.string().min(1, "Sub-service cannot be empty"),
  query: z.string().min(1, "Query cannot be empty"),
});

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const validationResult = RequestBodySchema.safeParse(requestBody);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { query, service, subService } = validationResult.data;
    const prompt = `You are an expert South African expert in civic and immigration service. You will only answer the user based on the following query. Do research about the ${service} for the ${subService} and here is more detail: ${query}`;

    const userQueryResults = await webSearchContentTool.invoke({
      input: prompt,
    });

    const parsedData = JSON.parse(userQueryResults as string) as {
      content: string;
    }[];
    const allContent = parsedData.map((result) => result.content).join("\n\n");

    return NextResponse.json({
      message: "Web search completed successfully!",
      data: allContent,
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: error.message },
      { status: 500 }
    );
  }
}
