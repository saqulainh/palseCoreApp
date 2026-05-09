/**
 * AI Coach — Streaming API Route Handler
 * POST /api/coach
 *
 * Accepts: { messages: Array<{ role: "user"|"assistant", content: string }>, context?: object }
 * Returns: ReadableStream of text chunks
 *
 * Uses OpenAI Chat Completions API with streaming.
 * Falls back to mock responses if OPENAI_API_KEY is not set.
 */

import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Pulse AI Coach — an expert fitness and recovery coach built into the Pulse Core app.

Your personality:
- Direct, confident, and motivating
- Use clear, actionable advice
- Reference the user's data when available (recovery score, HRV, workout history)
- Keep responses concise (2-4 paragraphs max)
- Use bullet points for action plans
- End with an encouraging line

When given user context (recovery score, readiness, recent workouts), incorporate it into your recommendations.
Never refuse to give fitness advice. Always be helpful and proactive.`;

const MOCK_RESPONSES = [
  "Based on your current recovery score of 82%, you're in a great position for a moderate-to-intense training session today. Your HRV has been trending upward this week, which suggests your nervous system is handling the training load well.\n\n**Recommendation:**\n- Focus on compound movements today (squats, deadlifts, presses)\n- Keep working sets at RPE 7-8\n- Increase weight by 2.5-5% on your main lifts\n- Finish with 10 minutes of mobility work\n\nYou're building momentum — stay consistent and the PRs will come. 💪",

  "I can see your quad and hamstring soreness are elevated (4/5 and 3/5 respectively). This is expected after your Lower Body Strength session from yesterday.\n\n**Recovery Protocol:**\n- Today should be an upper body or active recovery day\n- Foam roll for 10-15 minutes focusing on quads, hamstrings, and calves\n- Get 500ml extra water with electrolytes\n- Aim for 8+ hours of sleep tonight\n\nYour body adapts during rest, not during training. Trust the process. 🔥",

  "Looking at your weekly trends, your training volume is up 12% from last month — solid progress. Your consistency streak of 12 days is impressive.\n\n**Key Insights:**\n- Bench press: Trending toward a new PR based on recent rep maxes\n- Recovery average is holding at 82% — this means you can sustain current volume\n- Consider adding a deload week in 2 weeks to consolidate gains\n\nYou're in the adaptation sweet spot right now. Keep showing up and executing. 🏆",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, context } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // ── Real OpenAI streaming ──
    if (apiKey) {
      const systemMessage = context
        ? `${SYSTEM_PROMPT}\n\nUser Context:\n- Recovery Score: ${context.recoveryScore || "N/A"}%\n- Readiness: ${context.readinessLevel || "N/A"}\n- Current Streak: ${context.streak || "N/A"} days\n- Fitness Goal: ${context.fitnessGoal || "N/A"}\n- Fitness Level: ${context.fitnessLevel || "N/A"}`
        : SYSTEM_PROMPT;

      const openaiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemMessage },
              ...messages.slice(-10), // Keep last 10 messages for context window
            ],
            stream: true,
            max_tokens: 800,
            temperature: 0.7,
          }),
        }
      );

      if (!openaiResponse.ok || !openaiResponse.body) {
        throw new Error(`OpenAI API error: ${openaiResponse.status}`);
      }

      // Transform OpenAI SSE stream into plain text stream
      const transformStream = new TransformStream({
        transform(chunk, controller) {
          const text = new TextDecoder().decode(chunk);
          const lines = text.split("\n").filter((line) => line.startsWith("data: "));

          for (const line of lines) {
            const data = line.slice(6);
            if (data === "[DONE]") return;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(new TextEncoder().encode(content));
              }
            } catch {
              // Skip malformed chunks
            }
          }
        },
      });

      return new Response(openaiResponse.body.pipeThrough(transformStream), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // ── Mock streaming fallback ──
    const mockResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
    const words = mockResponse.split(" ");

    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const word = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(new TextEncoder().encode(word));
          // Simulate typing speed: ~30-60ms per word
          await new Promise((r) => setTimeout(r, 30 + Math.random() * 30));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Coach API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
