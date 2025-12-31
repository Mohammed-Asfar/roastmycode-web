"use client";

import { ThumbsUp, Flame, Wrench } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { RoastResponse } from "@/lib/llm";

interface RoastResultProps {
    result: RoastResponse | null;
    isLoading: boolean;
}

export function RoastResult({ result, isLoading }: RoastResultProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-200">Analyzing your code...</h2>
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="p-6 rounded-xl bg-zinc-800/50 border border-white/5 animate-pulse"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-zinc-700" />
                                <div className="w-24 h-4 rounded bg-zinc-700" />
                            </div>
                            <div className="space-y-2">
                                <div className="w-full h-4 rounded bg-zinc-700" />
                                <div className="w-3/4 h-4 rounded bg-zinc-700" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">🔥</div>
                <h2 className="text-xl font-bold text-zinc-200 mb-2">
                    Ready to get roasted?
                </h2>
                <p className="text-zinc-400">
                    Paste your code above and click the button to receive your roast.
                </p>
            </div>
        );
    }

    const cards = [
        {
            icon: ThumbsUp,
            title: "Compliment",
            content: result.compliment,
            gradient: "from-emerald-500 to-green-600",
            bgGradient: "from-emerald-500/10 to-green-600/10",
            borderColor: "border-emerald-500/30",
        },
        {
            icon: Flame,
            title: "Roast",
            content: result.roast,
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-500/10 to-red-500/10",
            borderColor: "border-orange-500/30",
        },
        {
            icon: Wrench,
            title: "Improvement",
            content: result.improvement,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-500/10 to-indigo-600/10",
            borderColor: "border-blue-500/30",
        },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-zinc-200">Your Roast Results</h2>
            <div className="grid gap-4">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className={`p-6 rounded-xl bg-gradient-to-r ${card.bgGradient} border ${card.borderColor} transition-all hover:scale-[1.01]`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className={`p-2 rounded-lg bg-gradient-to-r ${card.gradient}`}
                            >
                                <card.icon className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-bold text-zinc-200">{card.title}</h3>
                        </div>
                        <div className="text-zinc-300 leading-relaxed prose prose-invert prose-sm max-w-none prose-p:my-1 prose-code:bg-zinc-700 prose-code:px-1 prose-code:rounded">
                            <ReactMarkdown>{card.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
