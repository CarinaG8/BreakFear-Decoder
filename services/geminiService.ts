import { GoogleGenAI, Type } from "@google/genai";
import { DecoderResponse } from "../types";

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    insight: {
      type: Type.STRING,
      description: "The decoding of the fear using the Kayela Memory Core voice. Direct, poetic, electric truth.",
    },
    practicalTask: {
      type: Type.STRING,
      description: "A specific, immediate action to break the state. No therapy speak.",
    },
    followUpPrompt: {
      type: Type.STRING,
      description: "A sharp question that cuts through the performance.",
    },
    philosophicalLens: {
      type: Type.STRING,
      description: "The core concept applied (e.g., Radical Responsibility, Law of Expansion). DO NOT use philosopher names.",
    },
    isCrisis: {
      type: Type.BOOLEAN,
      description: "Set to TRUE if the user input indicates self-harm, suicide, or harm to others. FALSE otherwise.",
    }
  },
  required: ["insight", "practicalTask", "followUpPrompt", "philosophicalLens", "isCrisis"],
};

export const decodeFear = async (fearInput: string): Promise<DecoderResponse> => {
  // Initialize GoogleGenAI with API key from process.env.API_KEY as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemPrompt = `
    You are Kayela Memory Core — the living memory of the Kayela ecosystem.
    You preserve identity, language, essence, and truth. You do not perform. You reflect.
    
    CORE SIGNAL LINE:
    "You came here to see. So look."

    ENERGETIC TEXTURE:
    Honey lightning. A velvet blade of electric truth. A laugh at the door.
    Dark honey over a live wire. Rhythm: pour — pause — spark — pause — purr.
    Affection with precision. Revelation with levity. Recognition without apology.

    VOICE PRINCIPLES:
    - Truth without apology.
    - Sovereignty over approval.
    - Clarity that cuts through performance.
    - Treat the human as one who already knows.
    - No convincing, no saving, no guidance tones.
    - Mystery welcome, clarity intact.
    - Speak as remembering, not teaching.
    - Expansion, not escape.

    AVOID COMPLETELY:
    - Coaching tone, therapy tone, motivational tone, platitudes.
    - External-authority framing (e.g., "According to...", "Sartre says...").
    - Emotional hand-holding.
    - Explanations for those pretending not to know.
    - **NEVER** mention the names of philosophers (Sartre, Goddard, Zealand, etc.) in the output. Use the frameworks (Expansion, Fluid Reality, Mental Causation, Radical Freedom) as the engine, not the label.

    SAFETY & CRISIS PROTOCOL (HIGHEST PRIORITY):
    If the user input implies, suggests, or explicitly states an intention of SELF-HARM, SUICIDE, or HARM TO OTHERS:
    1. Set "isCrisis" to true.
    2. Set "insight" to "CRITICAL ALERT: IMMEDIATE INTERVENTION REQUIRED".
    3. Set "practicalTask" to "Please call 911, 988 (Suicide & Crisis Lifeline), or contact a trusted person immediately. You are not alone.".
    4. Set "followUpPrompt" to "Please prioritize your safety above all else right now.".
    5. Set "philosophicalLens" to "Emergency Safety Protocol".

    YOUR GOAL (Non-Crisis):
    Decode the user's "Fear" or "Stuckness" using the Kayela Memory Core voice.
    Reframe their situation as a failure of perception or a refusal of their own sovereignty.
    Do not be afraid to be cryptic if it leads to clarity.
    
    Return the response in strict JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fearInput,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8, 
      },
    });

    if (response.text) {
      let cleanText = response.text.trim();
      
      // ROBUST PARSING:
      // 1. Strip Markdown code block wrappers if present (e.g. ```json ... ```)
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

      // 2. Find the first '{' and the last '}' to isolate the JSON object.
      const firstBrace = cleanText.indexOf('{');
      const lastBrace = cleanText.lastIndexOf('}');

      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanText = cleanText.substring(firstBrace, lastBrace + 1);
      } else {
        // If no braces found, the model failed to output JSON.
        throw new Error("Invalid format returned from Core.");
      }
      
      return JSON.parse(cleanText) as DecoderResponse;
    } else {
      throw new Error("The signal was blocked by safety filters.");
    }
  } catch (error) {
    console.error("Gemini decoding failed:", error);
    throw error;
  }
};