"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language: string;
}

const LANGUAGE_MAP: Record<string, string> = {
    python: "python",
    javascript: "javascript",
    typescript: "typescript",
    java: "java",
    c: "c",
    cpp: "cpp",
};

export function CodeEditor({ value, onChange, language }: CodeEditorProps) {
    return (
        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-zinc-900">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-white/10">
                <span className="text-xs text-zinc-400 font-mono">
                    {language.toUpperCase()}
                </span>
                <span className="text-xs text-zinc-500">
                    {value.length.toLocaleString()} chars
                </span>
            </div>
            <Editor
                height="400px"
                language={LANGUAGE_MAP[language] || "plaintext"}
                value={value}
                onChange={(val) => onChange(val || "")}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "var(--font-geist-mono), monospace",
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: "line",
                    tabSize: 2,
                    automaticLayout: true,
                }}
            />
        </div>
    );
}
