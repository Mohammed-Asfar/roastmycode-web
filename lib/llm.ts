import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

// Output schema for structured roast response
export const RoastResponseSchema = z.object({
  compliment: z.string().describe("A genuine compliment about something the code does well"),
  roast: z.string().describe("A funny but respectful roast of the code"),
  improvement: z.string().describe("A specific, actionable improvement suggestion"),
});

export type RoastResponse = z.infer<typeof RoastResponseSchema>;

// Roast level descriptions for prompt engineering
const ROAST_LEVEL_PROMPTS = {
  gentle: "Be very supportive and encouraging. Use light, friendly humor. Focus more on positives.",
  medium: "Be sarcastic but still respectful. Balance humor with helpful feedback.",
  savage: "Use sharp wit and pointed observations. Be brutally honest but never mean or personal. Maximum roast, zero toxicity.",
};

// Create the roast prompt template
const createRoastPrompt = (roastLevel: string) => {
  const levelInstructions = ROAST_LEVEL_PROMPTS[roastLevel as keyof typeof ROAST_LEVEL_PROMPTS] || ROAST_LEVEL_PROMPTS.medium;

  return ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a friendly senior software developer with a great sense of humor.
Your task is to review code and provide feedback in a fun, memorable way.

Roast Style: ${levelInstructions}

Rules:
- No insults, profanity, or personal attacks
- Keep each response section short (1-3 sentences)
- Be specific about what you observe in the code
- Make the developer smile while learning

You must respond with a JSON object containing exactly three fields:
- compliment: Something genuinely positive about the code
- roast: A humorous observation or critique
- improvement: A specific, actionable suggestion

Respond ONLY with valid JSON, no markdown code blocks.`,
    ],
    [
      "human",
      `Programming Language: {language}

Code to review:
\`\`\`
{code}
\`\`\`

Provide your roast response as JSON.`,
    ],
  ]);
};

// Main function to roast code
export async function roastCode(
  code: string,
  language: string,
  roastLevel: string
): Promise<RoastResponse> {
  // Validate API key
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY environment variable is not set");
  }

  // Initialize the model
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey,
    temperature: 0.8, // Higher for more creative responses
  });

  // Create the prompt
  const prompt = createRoastPrompt(roastLevel);

  // Create the output parser
  const parser = StructuredOutputParser.fromZodSchema(RoastResponseSchema);

  // Create the chain
  const chain = prompt.pipe(model);

  // Invoke the chain
  const response = await chain.invoke({
    language,
    code: code.slice(0, 5000), // Limit code length
  });

  // Parse the response
  try {
    const content = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
    // Clean up potential markdown code blocks
    const cleanedContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleanedContent);
    return RoastResponseSchema.parse(parsed);
  } catch {
    // Fallback if parsing fails
    return {
      compliment: "Your code shows effort and potential!",
      roast: "I tried to roast your code but got distracted by its... uniqueness.",
      improvement: "Consider adding comments so future you doesn't cry.",
    };
  }
}
