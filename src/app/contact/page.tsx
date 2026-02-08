import type { Metadata } from "next";
import profile from "@/data/profile";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: `Contact – ${profile.name}`,
  description: `Get in touch with ${profile.name}.`,
};

export default function ContactPage() {
  return <ContactContent />;
}
