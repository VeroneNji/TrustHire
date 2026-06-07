"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronLeft,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { MoMoPaymentModal } from "@/components/dashboard/momo-payment";
import { useRouter } from "next/navigation";

export default function HireWorkerPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const router = useRouter();
  const [worker, setWorker] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    async function fetchWorker() {
      const { data } = await supabase
        .from('workers')
        .select('*, profiles(*)')
        .eq('id', params.id)
        .single();
      setWorker(data);
      setLoading(false);
    }
    fetchWorker();
  }, [params.id]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#F3F2F0]"><Loader2 className="animate-spin text-[#0A66C2]" /></div>;
  if (!worker) return <div>Worker not found</div>;

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="employer" activeTab="workers" />
      
      <main className="md:pl-64 pt-16 md:pt-0">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/workers/${params.id}`}>
              <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-[#0A66C2]" />
            </Link>
            <h1 className="text-xl font-bold text-[#0F172A]">Send Professional Offer</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-8 grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-6">
            <Card className="border-gray-200 shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b border-gray-50">
                <CardTitle className="text-xl font-bold">Employment Terms</CardTitle>
                <CardDescription className="text-xs font-medium uppercase tracking-widest">Formal offer for {worker.profiles.full_name}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Monthly Salary (XAF)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input className="h-14 w-full pl-12 rounded-2xl border-2 border-gray-50 bg-gray-50/50 font-bold text-sm focus:ring-2 focus:ring-[#0A66C2] outline-none transition-all" placeholder="e.g. 85,000" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input type="date" className="h-14 w-full pl-12 pr-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 font-bold text-sm focus:ring-2 focus:ring-[#0A66C2] outline-none transition-all" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Work Schedule & Duties</label>
                  <textarea 
                    className="min-h-[150px] w-full rounded-2xl border-2 border-gray-50 bg-gray-50/50 p-6 text-sm font-medium focus:ring-2 focus:ring-[#0A66C2] outline-none transition-all" 
                    placeholder="Describe daily routines, working hours, and specific expectations..."
                  />
                </div>

                <div className="bg-[#EDF3F8] p-6 rounded-2xl border border-[#0A66C2]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5 text-[#0A66C2]" />
                    <h4 className="text-sm font-bold text-[#0F172A]">TrustHire Guarantee</h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Recruitment fees (5,000 XAF) are only charged when you send a formal offer. This ensures your candidate's commitment.
                  </p>
                </div>

                <Button 
                  onClick={() => setShowPayment(true)}
                  className="w-full h-16 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-black/10"
                >
                  Send Formal Offer (5,000 XAF)
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-4 space-y-6">
            <Card className="border-gray-200 shadow-sm bg-white overflow-hidden text-center p-8">
              <div className="w-24 h-24 rounded-full border-4 border-[#F3F2F0] bg-gray-100 mx-auto overflow-hidden mb-4">
                <img src={worker.profiles.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.profiles.full_name}`} alt="worker" />
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg">{worker.profiles.full_name}</h3>
              <p className="text-xs text-[#0A66C2] font-black uppercase tracking-widest mt-1">{worker.category}</p>
            </Card>
          </div>
        </div>

        {showPayment && (
          <MoMoPaymentModal 
            amount={5000} 
            onSuccess={() => router.push("/dashboard/employer")}
            onClose={() => setShowPayment(false)}
          />
        )}
      </main>
    </div>
  );
}
