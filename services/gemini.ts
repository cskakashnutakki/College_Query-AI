import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, MessageRole } from "../types";

// Initialize Gemini Client
// IMPORTANT: The API key is obtained from process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  prompt: string,
  history: Message[]
): Promise<{ text: string; groundingMetadata?: any }> => {
  try {
    // We only use the last few messages for context to save tokens, 
    // but for this specific "Search" use case, single-turn or short context is often best 
    // to prevent hallucinating old context into new search results.
    // However, basic history is helpful for follow-up questions.
    
    // Construct a simple history string or use the Chat API. 
    // Given we want Search Grounding, we use models.generateContent directly with tools.
    
    // Convert history to string context (simplified for this demo)
    const context = history
      .slice(-4) // Keep last 4 messages for context
      .map(msg => `${msg.role === MessageRole.User ? 'User' : 'Model'}: ${msg.text}`)
      .join('\n');

    const fullPrompt = `
      Context:
      ${context}

      Current User Query: ${prompt}

      System Instruction:
      You are an expert college counselor and university researcher specialized in the Indian education system. 
      Your goal is to provide accurate, up-to-date, and helpful information about Indian colleges (IITs, NITs, IIITs, Private Universities), entrance exams (JEE, NEET, CAT, CUET, GATE), and admission processes (JoSAA, CSAB, etc.).
      
      Formatting:
      - Use Markdown for readability (bold key facts, lists for features).
      - Be concise but thorough.
      - If comparing colleges, use a structured list or table format.
      - Mention specific details like NIRF rankings, placement statistics (average package), and campus facilities where relevant.
      - Always cite your sources implicitly via the Grounding tool (Google Search).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable Google Search Grounding
      },
    });

    // Extract text
    const text = response.text || "I couldn't find information on that. Please try a different query.";
    
    // Extract grounding metadata for citations
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

    return { text, groundingMetadata };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch response from Gemini.");
  }
};