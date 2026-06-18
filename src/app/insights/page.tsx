import Link from "next/link";

const insights = [
  {
    title: "Authenticity concerns",
    percentage: "34%",
    description:
      "Customers are frequently asking whether products are genuine and how to verify them.",
    action:
      "Add a stronger verification CTA on product pages and send customers to the authenticity checker.",
    icon: "✓",
  },
  {
    title: "Product selection confusion",
    percentage: "27%",
    description:
      "Customers are unsure whether they need whey protein, creatine, or a mass gainer.",
    action:
      "Show a goal-based comparison quiz before customers browse products.",
    icon: "↔",
  },
  {
    title: "Lactose-sensitive questions",
    percentage: "18%",
    description:
      "Customers are looking for non-dairy or easier-to-digest protein options.",
    action:
      "Create a dedicated lactose-sensitive and vegan product discovery flow.",
    icon: "🌿",
  },
  {
    title: "Order and delivery support",
    percentage: "13%",
    description:
      "Customers want quick answers about order status, delivery, and support.",
    action:
      "Connect BeastGuide to approved order-management data for secure order updates.",
    icon: "📦",
  },
  {
    title: "General beginner guidance",
    percentage: "8%",
    description:
      "New gym-goers want simple explanations before buying supplements.",
    action:
      "Use AI-generated beginner guides, FAQs, and product education content.",
    icon: "🎯",
  },
];

export default function InsightsPage() {
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
          Internal Demo
        </span>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold tracking-wide text-lime-300">
              AI CUSTOMER INSIGHTS DASHBOARD
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              Turn customer questions into action.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
              A prototype internal dashboard showing how AI can summarize
              customer support questions and recommend business actions for
              product, marketing, and support teams.
            </p>
          </div>

          <Link
            href="/ask"
            className="rounded-xl border border-lime-400/50 bg-lime-400/10 px-5 py-3 text-center font-bold text-lime-300 transition hover:bg-lime-400 hover:text-black"
          >
            Open AI Chat
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Demo Conversations</p>
            <p className="mt-2 text-3xl font-black text-lime-300">1,284</p>
            <p className="mt-2 text-xs text-zinc-500">
              Simulated customer-support dataset
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Top Intent</p>
            <p className="mt-2 text-xl font-black">Authenticity</p>
            <p className="mt-2 text-xs text-lime-300">
              34% of demo questions
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Support Deflection</p>
            <p className="mt-2 text-3xl font-black text-lime-300">62%</p>
            <p className="mt-2 text-xs text-zinc-500">
              Estimated AI-answerable questions
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Suggested Priority</p>
            <p className="mt-2 text-xl font-black">Trust Education</p>
            <p className="mt-2 text-xs text-zinc-500">
              Improve verification visibility
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {insights.map((insight) => (
            <div
              key={insight.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400/10 text-xl font-black text-lime-300">
                  {insight.icon}
                </div>

                <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-sm font-bold text-lime-300">
                  {insight.percentage}
                </span>
              </div>

              <h2 className="mt-5 text-xl font-bold">{insight.title}</h2>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {insight.description}
              </p>

              <div className="mt-5 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
                <p className="text-xs font-bold tracking-wide text-lime-300">
                  AI-SUGGESTED ACTION
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  {insight.action}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-wide text-lime-300">
            WHY THIS MATTERS
          </p>

          <h2 className="mt-3 text-2xl font-black">
            From customer questions to business decisions.
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            In a production version, BeastGuide could analyze anonymized
            support tickets, website searches, reviews, and chat questions.
            It could then identify repeating objections, product confusion,
            trust concerns, and content opportunities for BeastLife teams.
          </p>

          <p className="mt-5 text-xs leading-5 text-zinc-500">
            This dashboard uses mock data for demonstration purposes and is not
            connected to BeastLife customer, order, or support systems.
          </p>
        </div>
      </section>
    </main>
  );
}