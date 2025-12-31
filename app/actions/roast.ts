"use server";

import { roastCode, RoastResponse } from "@/lib/llm";
import { z } from "zod";

// Input validation schema
const RoastInputSchema = z.object({
    code: z.string().min(1, "Code is required").max(10000, "Code is too long (max 10,000 characters)"),
    language: z.enum(["python", "javascript", "typescript", "java", "c", "cpp"]),
    roastLevel: z.enum(["gentle", "medium", "savage"]),
});

export type RoastInput = z.infer<typeof RoastInputSchema>;

export type RoastActionResult =
    | { success: true; data: RoastResponse }
    | { success: false; error: string };

export async function roastMyCode(input: RoastInput): Promise<RoastActionResult> {
    try {
        // Validate input
        const validated = RoastInputSchema.safeParse(input);
        if (!validated.success) {
            return {
                success: false,
                error: validated.error.issues[0]?.message || "Invalid input",
            };
        }

        const { code, language, roastLevel } = validated.data;

        // Call the LLM
        const result = await roastCode(code, language, roastLevel);

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        console.error("Roast error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        };
    }
}
