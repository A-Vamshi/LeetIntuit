import { LeetCode } from "leetcode-query";
import { convert } from "html-to-text";
import { GoogleGenAI } from "@google/genai";

export const generateAnswerMarkdown = async ({ slug, level, apiKey } : GenerateProps ) => {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const leetcode = new LeetCode();
      const questionDetails = await leetcode.problem(slug);
      if (!questionDetails || !questionDetails.content) {
        return "**There's something wrong with the question provided**";
      }
      const question = convert(questionDetails.content);
      const prompt = `You are an AI designed to assist users with LeetCode problems. For each problem, your goal is to help the user build the intuition for solving it without providing the solution or code. Instead, you will explain the core concepts, key insights, and high-level reasoning that are crucial for approaching the problem.

                      Your explanation should be tailored based on the user's experience level, which will be provided. Use the following guidelines:

                      For a beginner: Explain the problem in simple terms, breaking it down step-by-step. Use basic concepts and analogies to build the foundation of the solution.
                      For an intermediate user: Discuss the problem in the context of common algorithms or data structures. Focus on key observations, trade-offs, and patterns that lead to an efficient solution.
                      For an advanced user: Provide high-level insights into sophisticated techniques, optimizations, and edge cases. Discuss potential trade-offs and considerations for efficiency and scalability, without delving into specific implementation details.
                      You should not provide the solution, code, or explicit hints, only conceptual guidance that helps the user understand the approach to solving the problem.
                      The user's level is ${level}
                      `
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: question,
        config: {
          systemInstruction: prompt,
        },
      });
      return response.text;
    } catch (error) {
      console.log("Error generating: ", error);
    }
}