import type { Project } from "@/types";

// TODO: Replace placeholder github / demo URLs with real project links.
export const projects: Project[] = [
  {
    slug: "erp-dms-integration",
    title: "Enterprise ERP & DMS Integration",
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
    featured: true,
    architecture: [
      "Angular",
      ".NET API",
      "Business Logic",
      "SQL Server",
      "Azure Services",
      "ERP / DMS",
    ],
    accent: "lavender",
    github: "https://github.com/manisha-sahay",
    demo: "https://github.com/manisha-sahay",
  },
  {
    slug: "traffic-sign-detection",
    title: "Traffic Sign Detection",
    description:
      "Computer vision based traffic sign detection using deep learning.",
    technologies: ["Python", "YOLOv8", "PyTorch", "OpenCV"],
    featured: false,
    accent: "sky",
    github: "https://github.com/manisha-sahay",
    demo: "https://github.com/manisha-sahay",
  },
  {
    slug: "ai-person-detection",
    title: "AI Person Detection App",
    description:
      "AI-powered person detection application designed for efficient on-device inference.",
    technologies: [".NET MAUI", "TensorFlow Lite", "Computer Vision"],
    featured: false,
    accent: "lavender",
    github: "https://github.com/manisha-sahay",
    demo: "https://github.com/manisha-sahay",
  },
  {
    slug: "smart-expense-tracker",
    title: "Smart Expense Tracker",
    description:
      "A modern expense management application focused on clean UX, financial insights and responsive design.",
    technologies: ["Next.js", "TypeScript", "React"],
    featured: false,
    accent: "sky",
    github: "https://github.com/manisha-sahay",
    demo: "https://github.com/manisha-sahay",
  },
];