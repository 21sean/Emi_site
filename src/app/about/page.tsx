import type { Metadata } from "next";
import profile from "@/data/profile";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: `About – ${profile.name}`,
  description: profile.about.bio[0],
};

export default function AboutPage() {
  return <AboutContent />;
}
