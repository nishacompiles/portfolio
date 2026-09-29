import About from "@/components/sections/About";
import ArchitectureFlow from "@/components/sections/ArchitectureFlow";
import Contact from "@/components/sections/Contact";
import EngineeringMindset from "@/components/sections/EngineeringMindset";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <EngineeringMindset />
      <ArchitectureFlow />
      <Contact />
    </>
  );
}