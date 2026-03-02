import { Webcam } from "lucide-react";
import MotionWrapperDelay from "./components1/FramerMotion/MotionWrapperDelay";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-radial from-purple-500 to-indigo-900 gap-4">
      <MotionWrapperDelay
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      >
        <Webcam />
        Welcome
      </MotionWrapperDelay>
      <ThemeToggle />
    </div>
  );
}
