"use client";

import { Flame } from "lucide-react";

interface RoastControlsProps {
    language: string;
    onLanguageChange: (language: string) => void;
    roastLevel: string;
    onRoastLevelChange: (level: string) => void;
    onRoast: () => void;
    isLoading: boolean;
    disabled: boolean;
}

const LANGUAGES = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
];

const ROAST_LEVELS = [
    { value: "gentle", label: "Gentle", emoji: "😊", description: "Supportive humor" },
    { value: "medium", label: "Medium", emoji: "😏", description: "Sarcastic but fair" },
    { value: "savage", label: "Savage", emoji: "🔥", description: "Maximum roast" },
];

export function RoastControls({
    language,
    onLanguageChange,
    roastLevel,
    onRoastLevelChange,
    onRoast,
    isLoading,
    disabled,
}: RoastControlsProps) {
    return (
        <div className="space-y-6">
            {/* Language Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                    Programming Language
                </label>
                <select
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all disabled:opacity-50"
                >
                    {LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Roast Level Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                    Roast Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {ROAST_LEVELS.map((level) => (
                        <button
                            key={level.value}
                            onClick={() => onRoastLevelChange(level.value)}
                            disabled={isLoading}
                            className={`px-4 py-3 rounded-lg border transition-all ${roastLevel === level.value
                                    ? "bg-gradient-to-r from-orange-500 to-red-500 border-orange-400 text-white shadow-lg shadow-orange-500/20"
                                    : "bg-zinc-800 border-white/10 text-zinc-300 hover:border-orange-500/50 hover:bg-zinc-700"
                                } disabled:opacity-50`}
                        >
                            <span className="text-lg">{level.emoji}</span>
                            <span className="block text-sm font-medium mt-1">{level.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Roast Button */}
            <button
                onClick={onRoast}
                disabled={isLoading || disabled}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold text-lg rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3"
            >
                {isLoading ? (
                    <>
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        Roasting...
                    </>
                ) : (
                    <>
                        <Flame className="w-6 h-6" />
                        Roast My Code
                    </>
                )}
            </button>
        </div>
    );
}
