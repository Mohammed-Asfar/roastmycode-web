# 📄 Product Requirements Document (PRD)

## Product Name

**RoastMyCode**

## Tagline

*Get roasted. Get better.*

---

## 1. 🎯 Product Overview

**RoastMyCode** is a developer-focused web application that uses AI-powered humor to provide **light, respectful code roasts** along with **constructive improvement suggestions**.

The application is built entirely using **Next.js**, with **server-side AI execution** via **LangChain (JavaScript)** and **Gemini 2.5 Flash**.

* ❌ No separate backend
* ✅ AI logic runs securely inside Next.js Server Actions / Route Handlers

---

## 2. 🧠 Problem Statement

Traditional code review tools and linters:

* Feel boring or intimidating
* Provide rigid or overly technical feedback
* Lack personality and emotional engagement

Many learners and junior developers hesitate to seek feedback due to fear of criticism.

**RoastMyCode** solves this by:

* Adding humor without toxicity
* Reducing emotional friction
* Making learning enjoyable and memorable

---

## 3. 👥 Target Users

### Primary Users

* College students learning programming
* Beginner and junior developers
* Self-taught programmers

### Secondary Users

* Senior developers (for fun)
* Coding communities
* Hackathon participants

---

## 4. 🎯 Goals & Non-Goals

### Goals

* Make code feedback fun and approachable
* Encourage learning through humor
* Provide actionable improvement suggestions
* Showcase AI + UX creativity

### Non-Goals (MVP)

* Full static code analysis
* Compiler-level error detection
* Enterprise-grade linting
* Automated refactoring

---

## 5. 🧱 Tech Stack

### Frontend + Server (Unified)

* Next.js (App Router)
* shadcn/ui
* Tailwind CSS
* Monaco Editor or CodeMirror

### AI Layer

* LangChain (JavaScript)
* Gemini 2.5 Flash

### Deployment

* Vercel
* Environment variables for API keys

---

## 6. 🏗️ System Architecture

Browser (UI)
→ Next.js Server Action / Route Handler
→ LangChain (JS)
→ Gemini 2.5 Flash

### Key Points

* All AI calls run server-side
* API keys are never exposed
* No external backend or database required (MVP)

---

## 7. 🔁 User Flow

1. User opens **RoastMyCode**
2. Pastes code into the editor
3. Selects:

* Programming language
* Roast level
4. Clicks **"Roast My Code"**
5. Server Action:

* Builds prompt with LangChain
* Calls Gemini 2.5 Flash
6. AI response returned
7. UI displays:

* 👍 Compliment
* 🔥 Roast
* 🛠️ Improvement

---

## 8. 🚀 Core Features (MVP)

### 8.1 Code Roast Generator

* Accepts raw source code
* Supports multiple programming languages
* Produces structured feedback

### 8.2 Roast Level Selector

* **Gentle** – supportive humor
* **Medium** – sarcastic but respectful
* **Savage (Still Respectful)** – sharp wit, no toxicity

### 8.3 Language Selection

Initial support:

* Python
* JavaScript / TypeScript
* Java
* C / C++

---

## 9. 🧠 AI Prompt Design

### Base System Prompt

You are a friendly senior software developer.

Your task:

* Roast code lightly and constructively
* Be funny but respectful
* Help the developer improve

Rules:

* No insults
* No profanity
* No personal attacks
* Keep responses short and clear

Output format:

* 👍 Compliment
* 🔥 Roast
* 🛠️ Improvement

---

## 10. 📡 Internal API (Server Action)

### Input

* code: string
* language: string
* roastLevel: gentle | medium | savage

### Output

* compliment: string
* roast: string
* improvement: string

---

## 11. 📁 Project Structure

```
roastmycode/
├── app/
│ ├── page.tsx
│ ├── actions/roast.ts
│ ├── components/
│ │ ├── CodeEditor.tsx
│ │ ├── RoastControls.tsx
│ │ └── RoastResult.tsx
├── lib/llm.ts
├── styles/
├── .env.local
└── README.md
```

---

## 12. 🎨 UI / UX Requirements

### Main Page

* Code editor with syntax highlighting
* Language selector
* Roast level toggle
* "Roast My Code" button
* Loading skeleton
* Result cards

### Design Principles

* Minimal
* Developer-friendly
* Dark mode first
* Fast feedback

---

## 13. 🔐 Security & Privacy

* No permanent storage of user code
* API keys stored only on server
* Input size limits enforced
* Rate limiting via Vercel middleware

---

## 14. 📈 Success Metrics

* Average roasts per session
* User return rate
* Time spent on page
* User feedback sentiment

---

## 15. 🚧 Constraints & Assumptions

### Constraints

* Gemini API usage limits
* Serverless execution time limits
* No persistent storage in MVP

### Assumptions

* Users are comfortable pasting code
* Humor improves engagement
* Structured output improves trust

---

## 16. 🛣️ Future Enhancements

* Streaming roast output
* Language auto-detection
* "Fix My Code" mode
* Shareable roast links
* Roast history with auth
* AI memory for repeated mistakes
* GitHub repository integration

---

## 17. ✅ MVP Definition of Done

* End-to-end roast works
* Output strictly follows format
* No toxic or abusive responses
* Clean, responsive UI
* Secure server-side AI execution

---

## 18. 🏁 Final Notes

**RoastMyCode** is designed as a:

* Portfolio-quality project
* Demonstration of AI personality
* Full-stack Next.js + LangChain application

It emphasizes **developer experience**, **ethical AI use**, and **fun learning**.

---

## Next Steps

To proceed with implementation:

* Generate the **Next.js + LangChain code**
* Create a **README.md with setup instructions**
* Scaffold the **shadcn/ui components**
* Write **production-ready AI prompts**
* Deploy to **Vercel**
