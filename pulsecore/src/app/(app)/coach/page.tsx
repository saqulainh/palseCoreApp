"use client";

import { useState, useRef, useEffect } from "react";
import { useCoachStore } from "@/store/coachStore";
import { useRecoveryStore } from "@/store/recoveryStore";
import { useUserStore } from "@/store/userStore";

const QUICK_PROMPTS = [
  { icon: "bolt", label: "Should I train today?" },
  { icon: "calendar_month", label: "Plan my week" },
  { icon: "restaurant", label: "Nutrition advice" },
  { icon: "bedtime", label: "Improve my sleep" },
];

export default function CoachPage() {
  const { messages, isStreaming, streamingContent, sendMessage } = useCoachStore();
  const { recoveryScore, readinessLevel } = useRecoveryStore();
  const { profile } = useUserStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages / streaming content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;
    const msg = input;
    setInput("");
    await sendMessage(msg, {
      recoveryScore,
      readinessLevel,
      streak: 12,
      fitnessGoal: profile.fitnessGoal,
      fitnessLevel: profile.fitnessLevel,
    });
  };

  const handleQuickPrompt = (label: string) => {
    setInput(label);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] relative">
      {/* Chat messages */}
      <div ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 pt-6 pb-[160px] flex flex-col gap-6 max-w-4xl mx-auto w-full no-scrollbar">
        {/* Date separator */}
        <div className="flex justify-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] px-4 py-1 rounded-full bg-[#282933]">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "user" ? (
              <div className="max-w-[85%] p-4 rounded-xl rounded-tr-none text-[#e6e8ff] text-[14px] leading-relaxed"
                style={{ background: "linear-gradient(135deg, #1a56ff 0%, #1e40af 100%)" }}>
                {msg.content}
              </div>
            ) : (
              <div className="flex gap-3 max-w-[90%]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border bg-[#282933] border-white/5">
                  <span className="material-symbols-outlined text-[#b8c4ff]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div className="p-4 rounded-xl rounded-tl-none border border-white/20"
                  style={{ background: "rgba(30,30,46,0.85)", backdropFilter: "blur(64px)" }}>
                  <div className="text-[14px] text-[#F9FAFB] leading-relaxed whitespace-pre-wrap">
                    {renderMarkdown(msg.content)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Streaming message */}
        {isStreaming && streamingContent && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[90%]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border bg-[#282933] border-white/5">
                <span className="material-symbols-outlined text-[#b8c4ff]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <div className="p-4 rounded-xl rounded-tl-none border border-white/20"
                style={{ background: "rgba(30,30,46,0.85)", backdropFilter: "blur(64px)" }}>
                <div className="text-[14px] text-[#F9FAFB] leading-relaxed whitespace-pre-wrap">
                  {renderMarkdown(streamingContent)}
                  <span className="inline-block w-2 h-4 bg-[#b8c4ff] ml-1 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typing indicator (before streaming starts) */}
        {isStreaming && !streamingContent && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#282933] border border-white/5">
              <span className="material-symbols-outlined text-[#b8c4ff]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
            <div className="p-4 rounded-xl rounded-tl-none border border-white/20 flex items-center gap-2"
              style={{ background: "rgba(30,30,46,0.85)", backdropFilter: "blur(64px)" }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-pulse" style={{ animationDelay: `${d}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed input bar */}
      <div className="fixed bottom-[72px] md:bottom-0 left-0 w-full z-40 px-5 pb-5 pt-3 flex flex-col gap-3 border-t border-[#2D2D3A] bg-[#13131A]">
        {/* Quick prompt chips */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar max-w-4xl mx-auto w-full">
          {QUICK_PROMPTS.map((p) => (
            <button key={p.label} onClick={() => handleQuickPrompt(p.label)}
              className="whitespace-nowrap px-4 py-2 rounded-full text-[12px] text-[#b8c4ff] flex items-center gap-2 transition-all active:scale-95 border border-[#b8c4ff]/50 hover:bg-[#b8c4ff]/10">
              <span className="material-symbols-outlined text-[16px]">{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>
        {/* Input */}
        <div className="relative max-w-4xl mx-auto w-full">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={isStreaming ? "Coach is typing..." : "Message your AI Coach..."}
            disabled={isStreaming}
            className="w-full h-[52px] rounded-xl pl-4 pr-14 text-[14px] text-[#F9FAFB] placeholder:text-[#9CA3AF] outline-none bg-[#191b25] border border-[#434656] focus:border-[#b8c4ff] transition-all disabled:opacity-50" />
          <button onClick={handleSend} disabled={isStreaming || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-[#b8c4ff] text-[#002584] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-40">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/** Simple markdown-like renderer for bold text and bullet points */
function renderMarkdown(text: string) {
  // Split by lines and process
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold text
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} className="text-[#b8c4ff] font-semibold">{part.slice(2, -2)}</strong>;
      }
      return <span key={j}>{part}</span>;
    });

    // Bullet points
    if (line.startsWith("- ")) {
      return (
        <div key={i} className="flex items-start gap-2 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b8c4ff] flex-shrink-0 mt-2" />
          <span>{rendered.map((r, idx) => <span key={idx}>{idx === 0 && typeof r === 'object' && 'props' in r ? <span>{(r.props as {children: string}).children.replace(/^- /, '')}</span> : r}</span>)}</span>
        </div>
      );
    }

    // Empty line = spacer
    if (line.trim() === "") {
      return <div key={i} className="h-2" />;
    }

    return <div key={i}>{rendered}</div>;
  });
}
