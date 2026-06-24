import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// AI Assistant endpoint
app.post("/api/wave-assistant", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array" });
  }

  try {
    const ai = getGemini();
    
    // Convert conversation format
    const lastMessage = messages[messages.length - 1]?.text || "Hola";
    
    // Construct context
    const contextPrompt = `Eres el "Asistente Wave", la inteligencia artificial integrada en WAVE, una aplicación de mensajería premium de alta velocidad.
Hablas español, eres amigable, dinámico, moderno y usas un tono natural pero profesional. Puedes usar emojis ocasionalmente.
El usuario te está enviando este mensaje: "${lastMessage}"
Responde de manera directa, concisa y atractiva, adaptada para leerse en una burbuja de chat de celular.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contextPrompt,
      config: {
        temperature: 0.7,
      },
    });

    const reply = response.text || "¡Hola! Estoy listo para ayudarte con lo que necesites.";
    res.json({ text: reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // If API key is missing or there is any other error, fallback to a smart offline response
    let errorMessage = "¡Hola! Soy el Asistente Wave. Parece que estoy operando en modo desconectado, pero estaré encantado de conversar contigo.";
    if (error.message && error.message.includes("GEMINI_API_KEY")) {
      errorMessage = "¡Hola! Soy el Asistente Wave. Para conectarme por completo con la API de Gemini, recuerda configurar tu 'GEMINI_API_KEY' en el panel de Secrets de AI Studio. Mientras tanto, ¿en qué puedo ayudarte en modo offline? ✨";
    }
    res.json({ text: errorMessage });
  }
});

// App metadata / health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Setup Vite or static serving
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
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
});
