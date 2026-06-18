"use client";

import Link from "next/link";
import { useState } from "react";

type VerificationResult = {
  status: "genuine" | "used" | "invalid";
  product?: string;
  batch?: string;
  manufactured?: string;
  message: string;
};

const demoCodes: Record<string, VerificationResult> = {
  BEAST01: {
    status: "genuine",
    product: "Creatine Monohydrate",
    batch: "BL-CR-2026-04",
    manufactured: "April 2026",
    message:
      "This demo product code has been verified successfully and appears to be genuine.",
  },
  BEAST02: {
    status: "used",
    product: "Whey Protein",
    batch: "BL-WP-2026-02",
    manufactured: "February 2026",
    message:
      "This code has already been checked before. Please inspect the packaging and contact support if you believe there is an issue.",
  },
};

export default function VerifyProductPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);

  function verifyCode() {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      return;
    }

    if (demoCodes[normalizedCode]) {
      setResult(demoCodes[normalizedCode]);
      return;
    }

    setResult({
      status: "invalid",
      message:
        "We could not verify this demo code. Please double-check the code or contact customer support.",
    });
  }

  const statusStyles = {
    genuine: {
      label: "Product Verified",
      icon: "✓",
      className:
        "border-lime-400/30 bg-lime-400/10 text-lime-200",
    },
    used: {
      label: "Code Previously Checked",
      icon: "!",
      className:
        "border-yellow-400/30 bg-yellow-400/10 text-yellow-100",
    },
    invalid: {
      label: "Verification Unsuccessful",
      icon: "×",
      className:
        "border-red-400/30 bg-red-400/10 text-red-100",
    },
  };

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

        <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
          Trust Demo
        </span>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-semibold tracking-wide text-lime-300">
            TRUST & AUTHENTICITY
          </p>

          <h1 className="mt-3 text-5xl font-black leading-tight tracking-tight">
            Verify your product.
            <span className="block text-lime-400">Train with confidence.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            Enter your product code to check its verification status. This
            prototype demonstrates how an AI-enabled trust workflow could help
            customers identify genuine products and reduce support confusion.
          </p>

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="font-bold">Try these demo verification codes</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-zinc-950 p-4">
                <p className="text-sm font-bold text-lime-300">BEAST01</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Genuine product result
                </p>
              </div>

              <div className="rounded-xl bg-zinc-950 p-4">
                <p className="text-sm font-bold text-yellow-300">BEAST02</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Previously checked result
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-zinc-500">
              This is an independent demo with mock verification data. It is
              not connected to BeastLife’s live authentication system.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 shadow-2xl shadow-lime-950/20">
          <p className="text-sm font-medium text-zinc-400">
            PRODUCT AUTHENTICITY CHECK
          </p>

          <h2 className="mt-2 text-2xl font-bold">Enter your product code</h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Enter the 6–8 character code displayed on your product packaging.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <input
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setResult(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  verifyCode();
                }
              }}
              placeholder="Example: BEAST01"
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold uppercase text-white outline-none placeholder:text-zinc-600 focus:border-lime-400"
            />

            <button
              onClick={verifyCode}
              className="rounded-xl bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
            >
              Verify
            </button>
          </div>

          {result && (
            <div
              className={`mt-7 rounded-2xl border p-5 ${
                statusStyles[result.status].className
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/20 text-xl font-black">
                  {statusStyles[result.status].icon}
                </div>

                <div>
                  <p className="font-bold">
                    {statusStyles[result.status].label}
                  </p>

                  <p className="mt-2 text-sm leading-6 opacity-90">
                    {result.message}
                  </p>
                </div>
              </div>

              {result.product && (
                <div className="mt-5 grid gap-3 border-t border-current/20 pt-5 text-sm sm:grid-cols-3">
                  <div>
                    <p className="text-xs opacity-70">Product</p>
                    <p className="mt-1 font-bold">{result.product}</p>
                  </div>

                  <div>
                    <p className="text-xs opacity-70">Batch</p>
                    <p className="mt-1 font-bold">{result.batch}</p>
                  </div>

                  <div>
                    <p className="text-xs opacity-70">Manufactured</p>
                    <p className="mt-1 font-bold">{result.manufactured}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-7 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm leading-6 text-zinc-400">
            <span className="font-bold text-zinc-200">Why this matters: </span>
            A clear verification flow can reduce counterfeit concerns, improve
            customer confidence, and help support teams handle trust-related
            questions faster.
          </div>
        </div>
      </section>
    </main>
  );
}