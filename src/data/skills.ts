import { BrainCircuit, Cloud, Database, Layers, Server } from "lucide-react";
import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Layers,
    skills: [
      "Angular",
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    skills: [
      "C#",
      ".NET Core",
      "ASP.NET Web API",
      "Entity Framework",
      "REST APIs",
      "LINQ",
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: Cloud,
    skills: [
      "Microsoft Azure",
      "Azure Functions",
      "Azure Service Bus",
      "Azure Blob Storage",
      "Azure Key Vault",
      "Azure App Service",
      "CI/CD",
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    skills: [
      "SQL Server",
      "Stored Procedures",
      "EF Core",
      "Database Optimization",
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    icon: BrainCircuit,
    skills: [
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
];