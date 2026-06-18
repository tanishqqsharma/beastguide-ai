"use client";

import Link from "next/link";
import { useState } from "react";

type Recommendation = {
  title: string;
  description: string;
  reason: string;
};

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [diet, setDiet] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  function getRecommendations() {
    const result: Recommendation[] = [];

    if (goal === "muscle") {
      result.push({
        title: "Whey Protein",
        description: "A convenient protein option to help support your daily protein intake.",
        reason:
          "You selected muscle gain, so protein support is the first priority.",
      });

      result.push({
        title: "Creatine Monohydrate",
        description:
          "A strength-focused supplement commonly used alongside consistent training.",
        reason:
          "Creatine may support strength-focused training when used appropriately.",
      });
    }

    if (goal === "weight") {
      result.push({
        title: "Mass Gainer",
        description:
          "A higher-calorie option designed for people trying to increase calorie intake.",
        reason:
          "You selected weight gain, so additional calories and protein may be useful.",
      });

      result.push({
        title: "Peanut Butter",
        description:
          "A calorie-dense food option that can help increase daily calorie intake.",
        reason:
          "It can be an easy way to add calories to meals and shakes.",
      });
    }

    if (goal === "strength") {
      result.push({
        title: "Creatine Monohydrate",
        description:
          "A popular performance supplement for strength-focused training.",
        reason:
          "You selected strength as your main goal.",
      });

      result.push({
        title: "Whey Protein",
        description:
          "Helps support protein intake for recovery and muscle maintenance.",
        reason:
          "Training recovery still depends on adequate daily protein intake.",
      });
    }

    if (goal === "recovery") {
      result.push({
        title: "Whey Protein",
        description:
          "A protein option that may help support recovery when daily protein intake is low.",
        reason:
          "Recovery is strongly linked to nutrition, rest, and sufficient protein intake.",
      });

      result.push({
        title: "Omega-3 / Multivitamin",
        description:
          "General wellness supplements that may fit a broader recovery routine.",
        reason:
          "You selected recovery and general wellness support.",
      });
    }

    if (diet === "lactose") {
      result.unshift({
        title: "Fermented Yeast Protein",
        description:
          "A non-dairy protein alternative for customers looking beyond whey.",
        reason:
          "You selected lactose-sensitive preferences.",
      });
    }

    if (diet === "vegan") {
      result.unshift({
        title: "Plant-Based / Fermented Yeast Protein",
        description:
          "A non-dairy protein option suited to vegan dietary preferences.",
        reason:
          "You selected a vegan dietary preference.",
      });
    }

    if (result.length === 0) {
      result.push({
        title: "Start With Your Goal",
        description:
          "Choose your main fitness goal so BeastGuide can suggest relevant products.",
        reason:
          "A clear goal helps make product guidance more useful.",
      });
    }

    setRecommendations(result.slice(0, 3));
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 font-black text-black">
            B
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight">BeastGuide</p>
            <p className="text-xs text-zinc-400">AI Supplement Concierge</p>
          </div>
        </div>

        <button className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-lime-400 hover:text-lime-300">
          Demo Prototype
        </button>
      </nav>

      {!showQuiz ? (
        <>
          <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-16 lg:grid-cols-2 lg:items-center lg:pt-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm text-lime-300">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                Built for smarter sports-nutrition decisions
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
                Find the right supplement.
                <span className="block text-lime-400">
                  Train with confidence.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                BeastGuide is an AI-powered assistant that helps customers
                discover suitable supplements, understand product authenticity,
                and get clear answers in English or Hinglish.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  onClick={() => setShowQuiz(true)}
                  className="rounded-xl bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
                >
                  Find My Supplement
                </button>

                <Link
                  href="/verify"
                  className="rounded-xl border border-zinc-700 px-6 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-300"
                >
                  Verify Product
                </Link>
                <Link
                  href="/ask"
                  className="rounded-xl border border-lime-400/50 bg-lime-400/10 px-6 py-3 font-bold text-lime-300 transition hover:bg-lime-400 hover:text-black"
                >
                  Ask BeastGuide
                </Link>
                <Link
                  href="/insights"
                  className="rounded-xl border border-zinc-700 px-6 py-3 font-bold text-zinc-200 transition hover:border-lime-400 hover:text-lime-300"
                >
                  AI Insights
                </Link>̃
              </div>

              <p className="mt-5 text-sm text-zinc-500">
                Independent demo prototype inspired by public BeastLife
                workflows.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-lime-950/20">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">BeastGuide AI</p>
                  <p className="text-lg font-bold">
                    How can I help you today?
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-black text-black">
                  AI
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl rounded-tl-sm bg-zinc-800 p-4 text-sm leading-6 text-zinc-200">
                  Bhai, beginner hu aur muscle gain karna hai. Mere liye kya
                  best rahega?
                </div>

                <div className="ml-8 rounded-2xl rounded-tr-sm border border-lime-400/20 bg-lime-400/10 p-4 text-sm leading-6 text-zinc-100">
                  Start by focusing on your daily protein intake through food.
                  Based on a muscle-gain goal, a protein supplement may help
                  fill gaps, while creatine can be considered separately for
                  strength-focused training.
                  <p className="mt-3 text-xs text-lime-300">
                    General product guidance — not medical advice.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3 rounded-xl border border-zinc-700 bg-zinc-950 p-3">
                <span className="flex-1 text-sm text-zinc-500">
                  Ask about supplements, product verification, or goals...
                </span>
                <button className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-black">
                  Send
                </button>
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-2xl">🎯</p>
              <h2 className="mt-4 text-lg font-bold">Goal-Based Guidance</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Helps customers choose products based on fitness goals, dietary
                preferences, experience level, and budget.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-2xl">✅</p>
              <h2 className="mt-4 text-lg font-bold">Trust & Authenticity</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Explains product-verification workflows and helps customers
                feel confident before purchasing.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-2xl">💬</p>
              <h2 className="mt-4 text-lg font-bold">Hinglish AI Support</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Handles common questions naturally in English and Hinglish,
                while escalating health-sensitive cases safely.
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <button
            onClick={() => {
              setShowQuiz(false);
              setRecommendations([]);
            }}
            className="mb-8 text-sm font-medium text-lime-300 hover:text-lime-200"
          >
            ← Back to home
          </button>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <div className="mb-8">
              <p className="text-sm font-medium text-lime-300">
                BEASTGUIDE RECOMMENDATION FLOW
              </p>
              <h1 className="mt-2 text-4xl font-black">
                Find your supplement stack
              </h1>
              <p className="mt-3 text-zinc-400">
                Tell us a little about your goal and preferences.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <p className="mb-3 font-bold">1. What is your main goal?</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["muscle", "Build Muscle"],
                    ["weight", "Gain Weight"],
                    ["strength", "Improve Strength"],
                    ["recovery", "Recovery & Wellness"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setGoal(value)}
                      className={`rounded-xl border p-4 text-left font-semibold transition ${goal === value
                        ? "border-lime-400 bg-lime-400/10 text-lime-300"
                        : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 font-bold">2. Your training experience?</p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {["Beginner", "Intermediate", "Advanced"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setExperience(item)}
                      className={`rounded-xl border p-4 font-semibold transition ${experience === item
                        ? "border-lime-400 bg-lime-400/10 text-lime-300"
                        : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 font-bold">3. Dietary preference?</p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["none", "No Preference"],
                    ["lactose", "Lactose Sensitive"],
                    ["vegan", "Vegan"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setDiet(value)}
                      className={`rounded-xl border p-4 font-semibold transition ${diet === value
                        ? "border-lime-400 bg-lime-400/10 text-lime-300"
                        : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={getRecommendations}
                disabled={!goal || !experience || !diet}
                className="w-full rounded-xl bg-lime-400 px-6 py-4 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                Get My Recommendations
              </button>
            </div>

            {recommendations.length > 0 && (
              <div className="mt-10 border-t border-zinc-800 pt-8">
                <p className="text-sm font-medium text-lime-300">
                  YOUR BEASTGUIDE PICKS
                </p>

                <div className="mt-4 grid gap-4">
                  {recommendations.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-zinc-700 bg-zinc-950 p-5"
                    >
                      <h2 className="text-xl font-bold">{item.title}</h2>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {item.description}
                      </p>

                      <div className="mt-4 rounded-xl border border-lime-400/20 bg-lime-400/10 p-3 text-sm text-lime-200">
                        <span className="font-bold">Why this fits you: </span>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-xs leading-5 text-zinc-500">
                  This is a demo recommendation based on goal and dietary
                  preference. It does not replace medical advice. Customers
                  with health conditions, allergies, pregnancy, or ongoing
                  medication should consult a qualified professional.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}