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

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

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
      return NextResponse.json(
        { error: "Gemini API key is missing from .env.local." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

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

    const reply =
      response.text?.trim() ||
      "I could not generate a response right now. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini chat error:", error);

    return NextResponse.json(
      {
        error:
          "BeastGuide could not reach the AI service. Please check your API key and try again.",
      },
      { status: 500 }
    );
  }
}