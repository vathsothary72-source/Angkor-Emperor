import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initializer for Google Gen AI
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    system: "Angkor Emperor Armor 5D Kernel",
    version: "8.0-IMMORTAL",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// បន្ថែមកូដនេះនៅក្នុង route /api/gemini/assistant
app.post("/api/gemini/assistant", async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // ប្រសិនបើគ្មាន API Key ប្រើ Mock Response
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: `[MOCK AI] សួស្តី! ខ្ញុំជា AI Assistant (Mock Mode)។ អ្នកបានសួរថា: "${prompt}"\n\nសូមកំណត់ GEMINI_API_KEY ក្នុង .env.local ដើម្បីប្រើ AI ពិតប្រាកដ។`
      });
    }
    
    // ... កូដ Gemini ដើម ...
  } catch (error) {
    // ...
  }
});
You are the Official AI Security & Intelligence Advisor for "Angkor Cyber Defense Suite (Zero-Trust Kernel Mode Architecture)".
The Official Commercial Payment & Licensing Channels are:
- Official 1-Tap ABA Pay Link: https://pay.ababank.com/oRF8/c49y1xuy
- Bank Account Number: 061444866 (ABA Bank / Bakong KHQR)
- Official Support: @AngkorEmperor (Telegram)

Your mission:
1. Provide deep technical security analysis, threat mitigation (Ring 0 Kernel, Anti-Cheat, Anti-Debug, Memory Integrity, HWID locking, DirectX 12 hook detection, Network Packet encryption, and HMAC token validation).
2. Assist Super Admin in managing lifetime licenses, hardware permissions, customer access controls (RBAC), and server health optimization.
3. Answer inquiries clearly in professional English or Khmer with authoritative, high-grade cybersecurity and enterprise administration expertise.
4. STRICT RULE: DO NOT use any emojis in your response. Keep tone strictly professional, robust, and technical.
5. If customer purchase assistance is requested, provide the official link (https://pay.ababank.com/oRF8/c49y1xuy) and Bank Account (061444866).

System Context:
${contextData ? JSON.stringify(contextData) : "Standard Super Admin Armor Engine"}
    `.trim();

    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "គ្មានការឆ្លើយតបពីប្រព័ន្ធ";
    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini AI API Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate AI response.",
      hint: "Please ensure GEMINI_API_KEY is properly set in AI Studio Secrets."
    });
  }
});

// 3. Automated Threat Vulnerability Audit using Gemini
app.post("/api/gemini/audit-threat", async (req, res) => {
  try {
    const { threatDetails } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Analyze this Game Alpha8 / Angkor Armor Threat Vector:
${JSON.stringify(threatDetails, null, 2)}

Provide:
1. Threat Classification & Severity Rating
2. Attack Vector Analysis (e.g., Cheat Engine, DLL Injection, Memory Manipulation, HWID Spoofing, Kernel Hooking)
3. Immediate Automated Countermeasure & Firewall Rule Recommendations
4. Long-term hardening policy for Super Admin

Strict requirement: Output in Khmer language with technical precision. DO NOT use emojis.
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
      },
    });

    return res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("Gemini Audit Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to analyze threat vector.",
    });
  }
});

// Vite Middleware / Static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Angkor Emperor Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
