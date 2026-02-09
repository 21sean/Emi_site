import type { Metadata } from "next";
import profile from "@/data/profile";
import ResumeContent from "@/components/pages/ResumeContent";

export const metadata: Metadata = {
  title: `Resume – ${profile.name}`,
  description: `Resume for ${profile.name} – ${profile.headline}`,
};

export default function ResumePage() {
  return <ResumeContent />;
}
