import { GoogleGenAI } from "@google/genai";

// Ensure you have a valid API key in your environment variables.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.warn("Gemini API key not found. AI features will be disabled.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const suggestTasks = async (goal: string): Promise<string[]> => {
    if (!API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }

    const prompt = `Based on the goal "${goal}", generate a short, actionable to-do list of 3 to 5 tasks. The tasks should be clear and concise. Return the response as a JSON object with a single key "tasks" which is an array of strings.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.7,
            },
        });
        
        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }

        const parsedData = JSON.parse(jsonStr);

        if (parsedData && Array.isArray(parsedData.tasks)) {
            return parsedData.tasks.filter((task: unknown) => typeof task === 'string');
        } else {
            throw new Error("Invalid JSON structure in Gemini response.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get suggestions from AI. Please try again.");
    }
};
