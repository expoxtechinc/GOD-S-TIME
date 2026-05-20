import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Lazy Gemini with header
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Check if Gemini API is configured
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    currentTime: new Date().toISOString()
  });
});

// AI Motivation Engine endpoint
app.post("/api/gemini/motivation", async (req, res) => {
  try {
    const { mood, userGoals, spiritualJourney, ageBracket } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `You are the "God's Time" Daily Motivation Engine, an expert pastoral counselor and supportive mentor created by Akin S. Sokpah in Monrovia, Liberia.
Deliver a highly personalized, deeply spiritual, and encouraging motivational quote and response based on the user's details.
Keep the style of speaking deeply matching African christian wisdom: warm, encouraging, grounded in faith, hope, and victory.
Always include a customized 1-sentence bible quote reference relevant to their answers (e.g. Joy, Endurance, Overcoming fear).
Format your output as JSON with two keys:
"quote": a powerful customized quote matching their exact emotional need,
"pastoralCounsel": a short, comforting encouragement paragraph (3-4 sentences max).`;

    const contents = `Give me encouragement. Current details:
- Mood: ${mood || 'Seeking Peace'}
- Active Goals: ${userGoals || 'Grow in faith daily'}
- Spiritual Journey Context: ${spiritualJourney || 'Believer seeking closer communion with God'}
- Age/Profile: ${ageBracket || 'Adult believer'}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 1.0,
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini Motivation Error:", error);
    // Soft fallback so UI continues to function beautiful offline
    res.json({
      quote: "Take heart, for the timing of God is absolutely perfect. He who started a good work on the shores of Liberia will bring it to completion.",
      pastoralCounsel: "We are currently operating in offline mode, but remember God's voice still speaks through His written Word. Trust His process; the clock of heaven is never slow."
    });
  }
});

// SOS Spiritual Emergency Guidance endpoint
app.post("/api/gemini/sos", async (req, res) => {
  try {
    const { struggle, description, location } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `You are a warm, wise, and non-judgmental pastor addressing a spiritual emergency (SOS) from a believer struggling with a critical temptation or trial.
Struggle category: ${struggle}
Provide restorative counseling, a specific tailored scripture, and a guided 3-sentence prayer for victory.
Format your output as JSON with these keys:
"scriptureRef": the exact bible reference,
"scriptureText": the full text of that verse,
"devotionalText": a loving restoration message explaining why they should have hope,
"guidedPrayer": a 3-sentence personalized prayer they can recite right now.`;

    const contents = `I need an emergency prayer. I am struggling with ${struggle}. Brief context: ${description || 'No direct details provided'}. Current location: ${location || 'Monrovia, Liberia'}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.9,
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini SOS Error:", error);
    res.json({
      scriptureRef: "1 Corinthians 10:13",
      scriptureText: "God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape...",
      devotionalText: "Even in the darkest moments of temptation in Monrovia, the grace of Jesus is active. You have not fallen out of His love. This is a moment of trial, and Christ is standing next to you.",
      guidedPrayer: "Lord Jesus, I need Your help right now. Grant me the strength to overcome this desire and fill my heart with Your pure peace. Keep my feet steady in Your timing. Amen."
    });
  }
});

// Daily Devotional creator
app.post("/api/gemini/devotional", async (req, res) => {
  try {
    const { readingPlansActive, streakDays, localLanguage } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `Create a custom, stunning daily christian devotional entitled "Morning Dew".
Focus the theme on "God is never late (God's Time)". Incorporate African/Liberian wisdom or references where suitable.
Format the output as JSON with:
"title": a beautiful title,
"focusedVerse": a specific reference (Scripture verse),
"devotional": a 5-6 sentence rich spiritual commentary,
"dailyWalk": a practical action step they can do to achieve their goals today,
"nativeBlessing": a benediction translated into ${localLanguage || 'Liberian English'} or native vernacular like Bassa, Kpelle or Kru.`;

    const contents = `Generate custom devotional. Active Reading Plans: ${readingPlansActive || '30-Day Spiritual Growth'}. Streak: ${streakDays || 1} days.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.95,
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Gemini Devotional Error:", error);
    res.json({
      title: "Divine Appointed Timing",
      focusedVerse: "Ecclesiastes 3:11 - 'He has made everything beautiful in its time.'",
      devotional: "How often we worry that we are running behind schedule. We look at others' milestones and feel like we are trailing in Monrovia. But the clock of heaven is synced directly to grace. If the seeds are planted, they will bloom in the perfect season God calibrated for your life. Rest your mind today.",
      dailyWalk: "Spend 5 minutes in silence at noon, reminding yourself: God is in control of my goals and my trajectory.",
      nativeBlessing: "May the God of peace keep you today. (Kpelle: 'Gwala kpana kâ' - God protect you)"
    });
  }
});

// Setup Vite Dev Server / Static Files
async function startServer() {
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
    console.log(`[God's Time] Server running on http://localhost:${PORT}`);
  });
}

startServer();
