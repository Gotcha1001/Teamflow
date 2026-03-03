import { Webcam } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import MotionWrapperDelay from "../components1/FramerMotion/MotionWrapperDelay";
import { HeroHeader } from "./_components/header";
import HeroSection from "./_components/hero-section";

export default function Home() {
  return (
    <div className="">
      <MotionWrapperDelay
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      >
        <HeroHeader />
      </MotionWrapperDelay>
      <HeroSection />
    </div>
  );
}
