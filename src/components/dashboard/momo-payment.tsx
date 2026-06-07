"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  X, 
  Smartphone, 
  Loader2, 
  CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MoMoPaymentProps {
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

export function MoMoPaymentModal({ amount, onSuccess, onClose }: MoMoPaymentProps) {
  const [step, setStep] = useState<"method" | "processing" | "success">("method");
  const [method, setStepMethod] = useState<"MTN" | "Orange" | null>(null);

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => setStep("success"), 3000);
  };

  return (
    <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white border-none shadow-2xl rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-[#0F172A]">Secure Payment</h2>
          <Button variant="ghost" size="sm" onClick={onClose}><X className="w-5 h-5 text-gray-400" /></Button>
        </div>

        <CardContent className="p-8">
          {step === "method" && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recruitment Fee</p>
                <p className="text-4xl font-black text-[#0F172A] mt-2">{amount.toLocaleString()} XAF</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setStepMethod("MTN")}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center ${method === "MTN" ? "border-[#FFCC00] bg-[#FFCC00]/5" : "border-gray-50 bg-gray-50 hover:border-gray-200"}`}
                >
                  <div className="w-12 h-12 bg-[#FFCC00] rounded-xl mx-auto mb-3 flex items-center justify-center font-black text-[#0F172A]">MTN</div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]">Mobile Money</p>
                </div>
                <div 
                  onClick={() => setStepMethod("Orange")}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center ${method === "Orange" ? "border-[#FF6600] bg-[#FF6600]/5" : "border-gray-50 bg-gray-50 hover:border-gray-200"}`}
                >
                  <div className="w-12 h-12 bg-[#FF6600] rounded-xl mx-auto mb-3 flex items-center justify-center font-black text-white">O</div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]">Orange Money</p>
                </div>
              </div>

              {method && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Phone Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                      <input className="h-14 w-full pl-12 rounded-2xl border-2 border-gray-100 bg-white font-bold text-sm focus:ring-2 focus:ring-[#0A66C2] outline-none" placeholder="6XX XXX XXX" />
                    </div>
                  </div>
                  <Button 
                    onClick={handlePay}
                    className="w-full h-16 bg-[#0F172A] hover:bg-[#0A66C2] text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
                  >
                    Pay {amount.toLocaleString()} XAF
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === "processing" && (
            <div className="py-12 text-center space-y-6">
              <Loader2 className="w-16 h-16 text-[#0A66C2] animate-spin mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-[#0F172A]">Processing Payment...</h3>
                <p className="text-sm text-gray-500 mt-2">Check your phone to confirm the transaction.</p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-[#057642]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0F172A]">Payment Successful!</h3>
                <p className="text-sm text-gray-500 mt-2">Your offer has been sent to the worker.</p>
              </div>
              <Button 
                onClick={onSuccess}
                className="w-full h-14 bg-[#0A66C2] text-white rounded-2xl font-bold text-xs uppercase tracking-widest"
              >
                Close & Return
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
