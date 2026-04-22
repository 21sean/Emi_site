import type { Metadata } from "next";
import profile from "@/data/profile";
import ResumeContent from "@/components/pages/ResumeContent";

export const metadata: Metadata = {
  title: `About – ${profile.name}`,
  description: `About ${profile.name} – ${profile.headline}`,
};

export default function AboutPage() {
  return <ResumeContent />;
}
