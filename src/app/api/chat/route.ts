import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const SYSTEM_INSTRUCTIONS = `
You are BeastGuide, an independent AI supplement concierge prototype.

Help users with general product education about:
- whey protein
- creatine monohydrate
- mass gainers
- fermented yeast or plant-based protein
- product authenticity workflows
- general order-support workflows

Rules:
- Reply in English or Hinglish depending on the user.
- Be concise, friendly, and practical.
- Do not diagnose, prescribe, or give medical treatment advice.
- For pregnancy, kidney/liver conditions, allergies, medication, or health concerns, ask the user to consult a qualified healthcare professional.
- Do not claim access to live BeastLife orders, inventory, product batches, or authentication systems.
- Say this is general product guidance, not medical advice, for health-sensitive questions.

Helpful product facts:
- Whey protein can help people meet daily protein needs when food is not convenient.
- Creatine is commonly used for strength-focused training and is different from protein.
- Mass gainers are higher-calorie products for people trying to increase calorie intake.
- Fermented yeast or plant-based protein may suit lactose-sensitive or vegan customers.
- Training consistency, food, sleep, and total protein matter more than any single supplement.
`;

function getErrorResponse(error: unknown): { message: string; status: number } {
  if (!(error instanceof Error)) {
    return {
      message: "An unexpected error occurred. Please try again.",
      status: 500,
    };
  }

  const msg = error.message.toLowerCase();

  if (msg.includes("api key") || msg.includes("authentication") || msg.includes("unauthorized") || msg.includes("401")) {
    return {
      message: "The AI service rejected the API key. Please check your Gemini API key configuration.",
      status: 401,
    };
  }

  if (msg.includes("rate limit") || msg.includes("quota") || msg.includes("429")) {
    return {
      message: "The AI service is rate-limited. Please wait a moment and try again.",
      status: 429,
    };
  }

  if (msg.includes("not found") || msg.includes("404") || msg.includes("model")) {
    return {
      message: "The requested AI model is unavailable. Please try again later.",
      status: 502,
    };
  }

  if (msg.includes("timeout") || msg.includes("econnrefused") || msg.includes("enotfound") || msg.includes("network")) {
    return {
      message: "Could not connect to the AI service. Please check your network and try again.",
      status: 503,
    };
  }

  return {
    message: "BeastGuide could not process your request. Please try again.",
    status: 500,
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Please send valid JSON." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null || !("message" in body)) {
    return NextResponse.json(
      { error: "Request must include a \"message\" field." },
      { status: 400 }
    );
  }

  const { message } = body as { message: unknown };

  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { error: "Please enter a message." },
      { status: 400 }
    );
  }

  if (message.length > 1000) {
    return NextResponse.json(
      { error: "Please keep your question under 1,000 characters." },
      { status: 400 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    return NextResponse.json(
      { error: "The AI service is not configured. Please contact the site administrator." },
      { status: 500 }
    );
  }

  let ai: GoogleGenAI;
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
    return NextResponse.json(
      { error: "Failed to initialize the AI service. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `${SYSTEM_INSTRUCTIONS}

Customer question:
${message}`,
      config: {
        temperature: 0.4,
        maxOutputTokens: 450,
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      console.error("Gemini returned an empty response for message:", message.slice(0, 100));
      return NextResponse.json(
        { error: "The AI service returned an empty response. Please try rephrasing your question." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);

    const { message: errorMessage, status } = getErrorResponse(error);
    return NextResponse.json({ error: errorMessage }, { status });
  }
}