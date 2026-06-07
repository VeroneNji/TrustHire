import Link from "next/link";
import { ShieldCheck, User, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F2F0] p-6">
      <div className="w-full max-w-[900px] space-y-12">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <div className="w-10 h-10 bg-[#0A66C2] rounded flex items-center justify-center group-hover:rotate-12 transition-all shadow-sm">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-[#0A66C2]">TrustHire</span>
          </Link>
          <h2 className="text-4xl font-light text-[#0F172A] tracking-tight">Are you joining as an <br/><span className="font-bold text-[#0A66C2]">employer</span> or a <span className="font-bold text-[#0A66C2]">professional?</span></h2>
          <p className="text-gray-500 font-medium text-lg mt-4">Join 2,000+ members in Cameroon's most trusted domestic network.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/register/worker" className="group">
            <Card className="h-full border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-white rounded-xl overflow-hidden group-hover:-translate-y-1">
              <CardHeader className="p-8 pb-4">
                <div className="w-14 h-14 bg-[#EDF3F8] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#0A66C2]/10 transition-colors">
                  <User className="text-[#0A66C2] w-7 h-7" />
                </div>
                <CardTitle className="text-2xl font-bold text-[#0F172A]">I'm a Professional</CardTitle>
                <CardDescription className="text-gray-500 font-medium text-base mt-2 leading-relaxed">
                  Find premium work opportunities, get CNI verified, and build your professional reputation.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <Button className="w-full h-12 bg-white hover:bg-gray-50 text-[#0A66C2] border-2 border-[#0A66C2] rounded-full font-bold text-sm transition-all flex items-center justify-between px-8">
                  Register as Worker <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/register/employer" className="group">
            <Card className="h-full border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-white rounded-xl overflow-hidden group-hover:-translate-y-1">
              <CardHeader className="p-8 pb-4">
                <div className="w-14 h-14 bg-[#EDF3F8] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#0A66C2]/10 transition-colors">
                  <Briefcase className="text-[#0A66C2] w-7 h-7" />
                </div>
                <CardTitle className="text-2xl font-bold text-[#0F172A]">I'm an Employer</CardTitle>
                <CardDescription className="text-gray-500 font-medium text-base mt-2 leading-relaxed">
                  Hire top-tier, background-checked staff for your household with confidence and security.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <Button className="w-full h-12 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full font-bold text-sm transition-all flex items-center justify-between px-8">
                  Register as Employer <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center pt-8">
          <p className="text-sm font-bold text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0A66C2] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
