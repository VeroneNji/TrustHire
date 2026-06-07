import Link from "next/link";
import { ShieldCheck, ChevronLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0A66C2] rounded flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-[#0A66C2]">TrustHire</span>
        </Link>
        <Link href="/" className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-[#0A66C2]">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto p-12 my-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-4xl font-bold text-[#0F172A] mb-8">Privacy Policy</h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-10">Last updated: June 2026</p>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">1. Introduction</h2>
            <p>Welcome to TrustHire. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">2. The Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, and CNI (National ID) information for verification.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Profile Data</strong> includes your username and password, work history, skills, and endorsements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide and improve our recruitment services, verify identities, and facilitate communication between employers and workers.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
