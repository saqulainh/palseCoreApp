"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    question: "What is your primary fitness goal?",
    options: ["Lose weight", "Build muscle", "Improve endurance", "Stay active"],
  },
  {
    question: "What equipment do you have access to?",
    options: ["Full gym", "Home gym", "Dumbbells only", "Bodyweight only"],
  },
  {
    question: "How would you describe your fitness level?",
    options: ["Beginner", "Intermediate", "Advanced", "Elite"],
  },
  {
    question: "How many days per week can you train?",
    options: ["2–3 days", "4 days", "5 days", "6–7 days"],
  },
  {
    question: "Do you have any injuries or limitations?",
    options: ["None", "Lower back", "Knees", "Shoulders"],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});

  const currentStep = STEPS[step];
  const totalSteps = STEPS.length + 1; // +1 for AI reveal
  const isLastStep = step === STEPS.length - 1;
  const isGenerating = step === STEPS.length;

  const select = (option: string) => {
    setSelections((prev) => ({ ...prev, [step]: option }));
  };

  const handleNext = () => {
    if (step < STEPS.length) {
      setStep((s) => s + 1);
      if (isLastStep) {
        // simulate AI generation then redirect
        setTimeout(() => router.push("/dashboard"), 3000);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  // ── AI Generating Screen ──
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-5">
        <div className="fixed top-0 right-0 w-3/4 h-3/4 rounded-full pointer-events-none -z-10"
          style={{ background: "rgba(26,86,255,0.1)", filter: "blur(120px)" }} />
        <div className="text-center">
          <div className="w-24 h-24 rounded-full border-2 border-[#1a56ff] flex items-center justify-center mx-auto mb-8 animate-pulse"
            style={{ boxShadow: "0 0 40px rgba(26,86,255,0.3)" }}>
            <span className="material-symbols-outlined text-5xl text-[#b8c4ff]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          </div>
          <h2 style={{ fontFamily: "Lexend, sans-serif", fontSize: "28px", fontWeight: 700, color: "#F9FAFB" }}>
            Building Your Plan
          </h2>
          <p className="text-[14px] text-[#9CA3AF] mt-2 mb-8">
            Our AI is analyzing your profile and creating a personalized fitness program...
          </p>
          <div className="flex gap-2 justify-center">
            {["Analyzing goals", "Calculating load", "Optimizing recovery"].map((t, i) => (
              <div key={t} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#b8c4ff]/20 bg-[#b8c4ff]/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7dffa2] animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                <span className="text-[11px] text-[#9CA3AF]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col">
      {/* Background glow */}
      <div className="fixed top-0 right-0 w-3/4 h-3/4 rounded-full pointer-events-none -z-10"
        style={{ background: "rgba(26,86,255,0.1)", filter: "blur(120px)" }} />

      {/* Progress dots */}
      <header className="w-full px-5 py-6 flex justify-center items-center">
        <div className="flex items-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-300"
              style={{
                width: i === step ? "32px" : "8px",
                height: "8px",
                borderRadius: "9999px",
                background: i === step ? "#1a56ff" : i < step ? "#b8c4ff" : "#434656",
              }}
            />
          ))}
        </div>
      </header>

      {/* Question card */}
      <main className="flex-1 w-full max-w-lg mx-auto px-5 flex flex-col justify-center pb-10">
        <div className="glass-card p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <h1 style={{ fontFamily: "Lexend, sans-serif", fontSize: "22px", fontWeight: 600, color: "#F9FAFB", lineHeight: 1.35, marginBottom: "32px" }}>
            {currentStep.question}
          </h1>

          <div className="flex flex-col gap-4">
            {currentStep.options.map((option) => {
              const isSelected = selections[step] === option;
              return (
                <button
                  key={option}
                  onClick={() => select(option)}
                  className="w-full flex items-center px-6 py-4 rounded-full transition-all duration-200 text-left"
                  style={{
                    border: `1.5px solid ${isSelected ? "#1a56ff" : "#2D2D3A"}`,
                    background: isSelected ? "#1a56ff" : "transparent",
                    boxShadow: isSelected ? "0 0 15px rgba(26,86,255,0.2)" : "none",
                  }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: isSelected ? 500 : 400, color: isSelected ? "white" : "#F9FAFB", flex: 1 }}>
                    {option}
                  </span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-white text-[20px]">check</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer actions */}
      <footer className="w-full max-w-lg mx-auto px-5 pb-8 pt-4 flex gap-4 items-center sticky bottom-0 z-10"
        style={{ background: "rgba(10,10,15,0.8)", backdropFilter: "blur(12px)" }}>
        <button onClick={handleBack} disabled={step === 0}
          className="h-[52px] px-6 rounded-lg border border-[#2D2D3A] hover:border-[#b8c4ff] flex items-center justify-center transition-all bg-transparent text-[#F9FAFB] disabled:opacity-40">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <button onClick={handleNext} disabled={!selections[step]}
          className="h-[52px] flex-1 rounded-lg flex items-center justify-center transition-all active:scale-[0.97] disabled:opacity-40"
          style={{
            background: selections[step] ? "#1a56ff" : "#1a56ff",
            boxShadow: "0 8px 24px rgba(26,86,255,0.2)",
            fontFamily: "Lexend, sans-serif", fontSize: "18px", fontWeight: 600, color: "white"
          }}>
          <span>{isLastStep ? "Generate My Plan" : "Next"}</span>
          <span className="material-symbols-outlined text-white ml-2 text-[20px]">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
}
