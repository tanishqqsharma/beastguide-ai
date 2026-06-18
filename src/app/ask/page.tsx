"use client";

import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
    role: "user" | "assistant";
    text: string;
};



export default function AskBeastGuidePage() {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            text: "Hey! I’m BeastGuide. Ask me about supplements, product authenticity, muscle gain, weight gain, or Hinglish support.",
        },
    ]);

    async function sendMessage() {
        const trimmedInput = input.trim();

        if (!trimmedInput || isLoading) {
            return;
        }

        const userMessage: Message = {
            role: "user",
            text: trimmedInput,
        };

        setMessages((currentMessages) => [...currentMessages, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: trimmedInput,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Could not get an AI response.");
            }

            const assistantMessage: Message = {
                role: "assistant",
                text: data.reply,
            };

            setMessages((currentMessages) => [...currentMessages, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                role: "assistant",
                text:
                    error instanceof Error
                        ? `Sorry, I could not respond right now: ${error.message}`
                        : "Sorry, I could not respond right now. Please try again.",
            };

            setMessages((currentMessages) => [...currentMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }

    const quickPrompts = [
        "Bhai beginner hu, muscle gain ke liye kya lu?",
        "Lactose sensitive hu, kaunsa protein better rahega?",
        "Creatine aur whey me kya difference hai?",
        "Product original kaise verify karu?",
    ];

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 font-black text-black">
                        B
                    </div>

                    <div>
                        <p className="text-lg font-bold tracking-tight">BeastGuide</p>
                        <p className="text-xs text-zinc-400">AI Supplement Concierge</p>
                    </div>
                </Link>

                <Link
                    href="/verify"
                    className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-lime-400 hover:text-lime-300"
                >
                    Verify Product
                </Link>
            </nav>

            <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
                <div className="mb-8">
                    <p className="text-sm font-semibold tracking-wide text-lime-300">
                        HINGLISH AI SUPPORT DEMO
                    </p>

                    <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                        Ask BeastGuide
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
                        A prototype support assistant for supplement discovery, product
                        education, authenticity questions, and safe customer guidance.
                    </p>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-7">
                    <div className="max-h-[480px] space-y-4 overflow-y-auto pr-1">
                        {messages.map((message, index) => (
                            <div
                                key={`${message.role}-${index}`}
                                className={`max-w-[88%] whitespace-pre-line rounded-2xl p-4 text-sm leading-6 sm:text-base ${message.role === "user"
                                    ? "ml-auto rounded-tr-sm bg-lime-400 font-medium text-black"
                                    : "rounded-tl-sm border border-zinc-700 bg-zinc-950 text-zinc-200"
                                    }`}
                            >
                                {message.role === "assistant" ? (
                                    <ReactMarkdown>{message.text}</ReactMarkdown>
                                ) : (
                                    message.text
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-zinc-700 bg-zinc-950 p-4 text-sm text-zinc-400">
                                BeastGuide is thinking...
                            </div>
                        )}
                    </div>

                    <div className="mt-7 border-t border-zinc-800 pt-5">
                        <p className="mb-3 text-sm font-semibold text-zinc-300">
                            Try a quick question
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {quickPrompts.map((prompt) => (
                                <button
                                    key={prompt}
                                    onClick={() => setInput(prompt)}
                                    className="rounded-full border border-zinc-700 px-3 py-2 text-left text-xs text-zinc-300 transition hover:border-lime-400 hover:text-lime-300"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <input
                            value={input}
                            disabled={isLoading}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            placeholder="Ask in English or Hinglish..."
                            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-lime-400"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={isLoading}
                            className="rounded-xl bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
                        >
                            {isLoading ? "Thinking..." : "Send"}
                        </button>
                    </div>

                    <p className="mt-4 text-xs leading-5 text-zinc-500">
                        Demo assistant using a controlled response workflow. A production
                        version can connect this interface to an LLM and approved product
                        knowledge base.
                    </p>
                </div>
            </section>
        </main>
    );
}