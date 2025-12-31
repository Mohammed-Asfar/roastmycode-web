"use client";

import { useState } from "react";
import { CodeEditor } from "./components/CodeEditor";
import { RoastControls } from "./components/RoastControls";
import { RoastResult } from "./components/RoastResult";
import { roastMyCode, type RoastInput } from "./actions/roast";
import type { RoastResponse } from "@/lib/llm";
import { Flame, Github, Sparkles } from "lucide-react";

const DEFAULT_CODE = `def calculate_sum(numbers):
    total = 0
    for i in range(len(numbers)):
        total = total + numbers[i]
    return total

# TODO: fix this someday
result = calculate_sum([1, 2, 3, 4, 5])
print(result)`;

export default function Home() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState<RoastInput["language"]>("python");
  const [roastLevel, setRoastLevel] = useState<RoastInput["roastLevel"]>("medium");
  const [result, setResult] = useState<RoastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoast = async () => {
    if (!code.trim()) {
      setError("Please enter some code to roast!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await roastMyCode({ code, language, roastLevel });

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/20">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">RoastMyCode</h1>
              <p className="text-xs text-zinc-500">Get roasted. Get better.</p>
            </div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by Gemini AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get your code{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
              roasted
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Paste your code, pick your pain level, and receive constructive feedback
            wrapped in humor. No feelings harmed. 🔥
          </p>
        </div>

        {/* App Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Code Editor Section */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
              Your Code
            </h3>
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
            />
          </div>

          {/* Controls Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
              Settings
            </h3>
            <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-xl">
              <RoastControls
                language={language}
                onLanguageChange={(lang) => setLanguage(lang as RoastInput["language"])}
                roastLevel={roastLevel}
                onRoastLevelChange={(level) => setRoastLevel(level as RoastInput["roastLevel"])}
                onRoast={handleRoast}
                isLoading={isLoading}
                disabled={!code.trim()}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* Results Section */}
        <div className="mt-12 p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
          <RoastResult result={result} isLoading={isLoading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-zinc-500 text-sm">
          Made with 🔥 and a questionable sense of humor
        </div>
      </footer>
    </div>
  );
}
