/**
 * Client-safe chat UI copy for the "Nish01" assistant.
 *
 * Import this from client components. It deliberately contains no system
 * prompt or configuration secrets — those live in `@/data/chatbot` and are
 * only ever imported from server-side code.
 */

export const chatUI = {
  assistantName: "Nish01",
  headerTitle: "Nish01",
  headerSubtitle: "Manisha's AI Portfolio Assistant",

  welcomeMessage:
    "**Hi, I'm Nish01 👋**\n\nI'm Manisha's AI portfolio assistant. Ask me about her experience, projects, skills or technologies.",

  /** Heading shown above the suggestion chips. */
  exploreWorkHeading: "Explore Manisha's work",
  suggestionChips: [
    { label: "💻  Tech stack", question: "What's Manisha's tech stack?" },
    { label: "☁️  Azure experience", question: "What Azure services has she worked with?" },
    { label: "🤖  AI projects", question: "Tell me about her AI/ML projects." },
    { label: "🚀  Featured projects", question: "Tell me about the ERP/DMS project." },
  ],

  /** Quick navigation to portfolio sections below the welcome message. */
  exploreNavHeading: "Explore",
  exploreNavItems: [
    { label: "Experience", target: "experience" },
    { label: "Projects", target: "projects" },
    { label: "Skills", target: "skills" },
    { label: "Contact", target: "contact" },
  ],

  inputHint: "Ask Nish01 anything about my work",
  inputPlaceholder: "e.g. What Azure services has Manisha worked with?",

  /** Shown when the request itself fails (network error / no response). */
  networkErrorFallback:
    "Nish01 couldn't respond right now. Please try again or use the contact options below.",

  labels: {
    fab: "Ask Nish01",
    open: "Open chat",
    close: "Close chat",
    minimize: "Minimize chat",
    online: "Online",
    send: "Send message",
    input: "Ask Nish01 anything about my work",
    retry: "Retry",
    typing: "Nish01 is typing",
  },
} as const;