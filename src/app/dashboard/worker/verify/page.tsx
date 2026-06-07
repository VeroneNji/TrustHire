"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { 
  ShieldCheck, 
  Upload, 
  FileText, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function WorkerVerifyPage() {
  const supabase = createClient();
  const router = useRouter();
  const [uploading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulation of upload to Supabase Storage
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="worker" activeTab="dashboard" />
      
      <main className="pl-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-20">
          <h1 className="text-xl font-bold text-[#0F172A]">Trust & Compliance Center</h1>
        </header>

        <div className="max-w-4xl mx-auto p-8 space-y-8">
          <div className="bg-[#EDF3F8] border border-[#0A66C2]/20 p-6 rounded-xl flex gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-[#0A66C2]" />
            </div>
            <div>
              <h3 className="font-bold text-[#0A66C2] text-sm">Why get verified?</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Verified workers in Cameroon are **5 times more likely** to be hired. Employers look for the CNI Verified badge to ensure safety for their families.
              </p>
            </div>
          </div>

          {!success ? (
            <form onSubmit={handleUpload} className="space-y-6">
              <Card className="border-gray-200 shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-[#0A66C2]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">Identity Verification (CNI)</CardTitle>
                      <CardDescription className="text-xs font-medium">Upload a clear photo of your National ID Card.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#0A66C2] transition-all cursor-pointer group">
                      <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#EDF3F8]">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#0A66C2]" />
                      </div>
                      <p className="text-sm font-bold text-[#0F172A]">Front Side</p>
                      <p className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#0A66C2] transition-all cursor-pointer group">
                      <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#EDF3F8]">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#0A66C2]" />
                      </div>
                      <p className="text-sm font-bold text-[#0F172A]">Back Side</p>
                      <p className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#0A66C2]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">Plan de Localisation</CardTitle>
                      <CardDescription className="text-xs font-medium">Upload a sketch or screenshot of your home location.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-[#0A66C2] transition-all cursor-pointer group">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#EDF3F8]">
                      <FileText className="w-6 h-6 text-gray-400 group-hover:text-[#0A66C2]" />
                    </div>
                    <p className="text-sm font-bold text-[#0F172A]">Upload Document</p>
                    <p className="text-[10px] text-gray-400 mt-1">PDF or Image accepted</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end pt-4">
                <Button 
                  disabled={uploading}
                  className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full px-12 h-14 font-bold text-sm uppercase tracking-widest transition-all"
                >
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  Submit for Verification
                </Button>
              </div>
            </form>
          ) : (
            <Card className="border-none shadow-xl bg-white overflow-hidden p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-[#057642]" />
              </div>
              <h2 className="text-3xl font-black text-[#0F172A]">Documents Submitted!</h2>
              <p className="text-gray-500 max-w-md mx-auto font-medium">
                Our compliance team will review your CNI and location plan within **24-48 hours**. You will receive a notification once your badge is active.
              </p>
              <Button 
                onClick={() => router.push("/dashboard/worker")}
                variant="outline" 
                className="rounded-full border-[#0A66C2] text-[#0A66C2] px-8 font-bold"
              >
                Return to Dashboard
              </Button>
            </Card>
          )}

          <div className="pt-8 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Frequently Asked Questions</h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-sm font-bold text-[#0F172A]">Is my data safe?</p>
                <p className="text-xs text-gray-500 leading-relaxed">Yes, all identity documents are encrypted and only accessible by authorized TrustHire compliance officers.</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-bold text-[#0F172A]">What if my CNI is expired?</p>
                <p className="text-xs text-gray-500 leading-relaxed">We only accept valid, non-expired National ID Cards or Passports for professional verification.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
