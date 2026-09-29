/**
 * Structured, single source of truth for the AI portfolio assistant.
 *
 * Everything the chatbot knows about Manisha lives here. Keep this file in
 * sync with the portfolio's public data (src/data/site.ts, experience.ts,
 * skills.ts, projects.ts) whenever those change.
 */

export const profile = {
  name: "Manisha Sahay",
  role: "Associate Developer / Software Engineer",
  yearsExperience: "4+ years",
  company: "Evon Technologies",
  location: "Dehradun, Uttarakhand, India",
  currentRole: "Associate Developer",
  employmentPeriod: "November 2022 – Present",
  availability: "Available for exciting opportunities",

  summary:
    "Associate Developer at Evon Technologies building and maintaining enterprise full-stack applications — from Angular frontends and .NET APIs to cloud services on Azure — with a focus on reliability, performance and clean architecture.",

  skills: {
    main: [
      "C#",
      ".NET Core",
      "ASP.NET Web API",
      "Entity Framework",
      "Angular",
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "SQL Server",
      "Azure",
      "Azure Functions",
      "Azure Service Bus",
      "Azure Blob Storage",
      "Azure Key Vault",
      "Azure App Service",
      "CI/CD",
    ],
    aiMl: [
      "Python",
      "YOLOv8",
      "PyTorch",
      "TensorFlow Lite",
      "OpenCV",
      "Pandas",
      "NumPy",
      "Scikit-learn",
    ],
  },

  experience: [
    {
      role: "Associate Developer",
      company: "Evon Technologies",
      location: "Dehradun, Uttarakhand",
      period: "November 2022 – Present",
      present: true,
      summary:
        "Building and maintaining enterprise full-stack applications — from Angular frontends and .NET APIs to cloud services on Azure — with a focus on reliability, performance and clean architecture.",
      responsibilities: [
        "Full-stack application development",
        ".NET Core / C#",
        "Angular",
        "REST APIs",
        "SQL Server",
        "Azure Functions",
        "Azure Service Bus",
        "Azure Blob Storage",
        "ERP / DMS integrations",
        "Production debugging",
        "Performance optimization",
      ],
    },
  ],

  projects: [
    {
      title: "Enterprise ERP / DMS Integration",
      description:
        "Enterprise integration workflows connecting DMS and ERP systems using modern backend APIs, cloud services and event-driven architecture.",
      technologies: [
        ".NET Core",
        "C#",
        "Angular",
        "SQL Server",
        "Azure Functions",
        "Azure Service Bus",
      ],
      highlights: [
        "Event-driven integration between ERP and DMS systems",
        "Angular frontend talking to .NET Web APIs",
        "Azure Functions and Azure Service Bus for async workflows",
        "SQL Server for data persistence",
      ],
    },
    {
      title: "Traffic Sign Detection using YOLOv8",
      description: "Computer vision based traffic sign detection using deep learning.",
      technologies: ["Python", "YOLOv8", "PyTorch", "OpenCV"],
      highlights: [
        "Detects traffic signs from images using a YOLOv8 deep-learning model",
        "Built with Python, PyTorch and OpenCV",
      ],
    },
    {
      title: "AI Person Detection App",
      description:
        "AI-powered person detection application designed for efficient on-device inference.",
      technologies: [".NET MAUI", "TensorFlow Lite", "Computer Vision"],
      highlights: [
        "Runs person detection on-device using TensorFlow Lite",
        "Mobile application built with .NET MAUI",
      ],
    },
    {
      title: "Smart Expense Tracker",
      description:
        "A modern expense management application focused on clean UX, financial insights and responsive design.",
      technologies: ["Next.js", "TypeScript", "React"],
      highlights: [
        "Built with Next.js, React and TypeScript",
        "Modern, responsive interface for tracking expenses",
      ],
    },
  ],

  contact: {
    email: "hello@manishasahay.dev",
    location: "Dehradun, Uttarakhand, India",
    links: {
      github: "https://github.com/manisha-sahay",
      linkedin: "https://www.linkedin.com/in/manisha-sahay",
    },
  },

  resume: {
    available: false,
    label: "Download resume",
    href: "/resume/Manisha-Sahay-Resume.pdf",
  },

  // Education details have not been provided on the site; keep null until they are.
  education: null,

  // Sections answerable from the live site.
  websiteSections: [
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
} as const;