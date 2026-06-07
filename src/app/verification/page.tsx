import Link from "next/link";
import { ShieldCheck, ChevronLeft, CheckCircle2, Award, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerificationPage() {
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

      <main className="max-w-4xl mx-auto p-12 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tight">Trust & Safety on TrustHire</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">We are building Cameroon's most secure domestic labor market through rigorous CNI verification and background checks.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="w-14 h-14 bg-[#EDF3F8] rounded-full flex items-center justify-center">
              <Award className="w-7 h-7 text-[#0A66C2]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A]">CNI Verification</h2>
            <p className="text-gray-600 leading-relaxed">Every professional worker on our platform must submit their National ID Card (CNI). Our admin team manually verifies these documents against official standards to prevent identity fraud.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="w-14 h-14 bg-[#EDF3F8] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-[#0A66C2]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Background Checks</h2>
            <p className="text-gray-600 leading-relaxed">We require a clean criminal record certificate (Certificat de non-conviction) for premium verification badges. Safety is our priority for your home and family.</p>
          </div>
        </div>

        <div className="bg-[#0F172A] text-white p-12 rounded-[40px] text-center space-y-8">
          <h2 className="text-3xl font-black">Ready to get verified?</h2>
          <p className="text-gray-400 max-w-lg mx-auto font-medium">Join as a professional today and start your journey towards becoming a verified elite worker.</p>
          <Link href="/register/worker">
            <Button className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full px-10 h-14 font-bold text-lg">Start Verification</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
