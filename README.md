# BeastGuide

**BeastGuide** is an independent AI-powered supplement discovery and customer-support prototype inspired by public sports-nutrition ecommerce workflows.

It demonstrates how AI can help a fitness and nutrition brand improve product discovery, customer trust, support automation, and internal decision-making.

## Live Demo

[Open BeastGuide Live Demo](https://beastguide-ai-git-main-nix03.vercel.app/)

## Core Features

### 1. Goal-Based Supplement Recommendations

Users can select their:

* Fitness goal: muscle gain, weight gain, strength, or recovery
* Training experience: beginner, intermediate, or advanced
* Dietary preference: no preference, lactose-sensitive, or vegan

The prototype then provides a small recommendation stack with an explanation of why each product category may fit the selected goal.

### 2. Product Authenticity Verification Demo

A mock product-code verification flow demonstrates how a trust-focused supplement brand could help customers check product authenticity.

Demo codes:

* `BEAST01` — verified product
* `BEAST02` — previously checked code
* Any other code — invalid demo code

This feature uses mock data only and is not connected to any live brand authentication database.

### 3. Live AI Support Chat

The app includes a Gemini-powered AI assistant that can answer general questions in English and Hinglish about:

* Whey protein
* Creatine
* Mass gainers
* Lactose-sensitive and vegan protein options
* Product-verification workflows
* General customer-support workflows

The assistant includes safety guardrails and avoids medical diagnosis, treatment advice, or claims of access to live customer or order data.

### 4. Internal AI Insights Dashboard

The dashboard demonstrates how AI could summarize recurring customer questions and convert them into business actions.

Example insights include:

* Authenticity concerns
* Product-selection confusion
* Lactose-sensitive customer needs
* Order and delivery questions
* Beginner education opportunities

All dashboard analytics use mock data for demonstration purposes.

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* Gemini API
* React Markdown
* Vercel

## Architecture

```text
Customer interaction
        ↓
Next.js frontend
        ↓
Goal recommendation / verification workflow / chat interface
        ↓
Next.js API route
        ↓
Gemini API
        ↓
Safety-guided AI response
```

## Safety and Scope

BeastGuide is a product prototype, not a medical or nutritional advisory service.

It does not:

* Diagnose medical conditions
* Provide personalised medical dosage advice
* Claim to cure, treat, or prevent disease
* Access live customer, order, inventory, laboratory, or authentication data
* Represent BeastLife or any other company

Users with medical conditions, allergies, pregnancy, medication interactions, or kidney/liver concerns should consult a qualified healthcare professional.

## Run Locally

Clone the repository:

```bash
git clone https://github.com/tanishqqsharma/beastguide-ai.git
cd beastguide-ai
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Pages

* `/` — BeastGuide homepage and recommendation flow
* `/verify` — Product authenticity verification demo
* `/ask` — Gemini-powered Hinglish and English support assistant
* `/insights` — Internal AI customer-insights dashboard

## Why This Project

This prototype was built to demonstrate a practical approach to AI in D2C sports nutrition:

* Improve product discovery and conversion
* Reduce repeated support questions
* Strengthen customer trust through verification workflows
* Support Hinglish-first customer interactions
* Turn customer questions into actionable business insights
