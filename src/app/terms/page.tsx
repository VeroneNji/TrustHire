import Link from "next/link";
import { ShieldCheck, ChevronLeft } from "lucide-react";

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold text-[#0F172A] mb-8">User Agreement</h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-10">Last updated: June 2026</p>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using TrustHire, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">2. Professional Conduct</h2>
            <p>TrustHire is a professional network. Users are expected to maintain high standards of professionalism. Employers must provide safe working environments, and workers must provide honest information about their skills and experience.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">3. Identity Verification</h2>
            <p>TrustHire requires CNI verification for all professional workers. Providing false identity documents is a serious violation and will result in immediate permanent deactivation and reporting to local authorities in Cameroon.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
