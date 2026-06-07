"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowLeft, Loader2, User, Phone, Mail, Lock, Briefcase, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";

export default function EmployerRegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullname = formData.get("fullname") as string;
    const phone = formData.get("phone") as string;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullname,
            phone: phone,
            user_type: "employer",
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        router.push("/dashboard/employer");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF] p-6">
      <div className="w-full max-w-[500px] space-y-10">
        <div className="text-center">
          <Link href="/register" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0F172A] mb-8 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to choices
          </Link>
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-[#0F172A] rounded-2xl flex items-center justify-center shadow-xl shadow-black/10">
              <Briefcase className="text-[#10B981] w-7 h-7" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-[#0F172A] tracking-tighter">Employer Signup.</h2>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-3">Hire the best verified staff in Cameroon</p>
        </div>

        <Card className="border-none shadow-[0_40px_100px_rgba(0,0,0,0.04)] bg-white rounded-[40px] overflow-hidden">
          <div className="h-2 bg-[#0F172A]" />
          <form onSubmit={handleRegister}>
            <CardHeader className="p-10 pb-4">
              <CardTitle className="text-2xl font-black tracking-tight">Account Info</CardTitle>
              <CardDescription className="font-medium text-gray-400">Join the network of premium households.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-4 space-y-6">
              {error && (
                <div className="p-4 text-xs font-black uppercase tracking-widest text-white bg-[#EF4444] rounded-2xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 opacity-80" />
                  {error}
                </div>
              )}
              <div className="space-y-3">
                <Label htmlFor="fullname" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#0F172A] transition-colors" />
                  <Input id="fullname" name="fullname" placeholder="Jane Doe" required className="h-14 pl-12 rounded-2xl border-2 border-gray-50 focus:border-[#0F172A] focus:ring-0 bg-gray-50/50 font-bold transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Phone Number</Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#0F172A] transition-colors" />
                  <Input id="phone" name="phone" type="tel" placeholder="+237 6XX XXX XXX" required className="h-14 pl-12 rounded-2xl border-2 border-gray-50 focus:border-[#0F172A] focus:ring-0 bg-gray-50/50 font-bold transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#0F172A] transition-colors" />
                  <Input id="email" name="email" type="email" placeholder="jane@example.com" required className="h-14 pl-12 rounded-2xl border-2 border-gray-50 focus:border-[#0F172A] focus:ring-0 bg-gray-50/50 font-bold transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#0F172A] transition-colors" />
                  <Input id="password" name="password" type="password" required className="h-14 pl-12 rounded-2xl border-2 border-gray-50 focus:border-[#0F172A] focus:ring-0 bg-gray-50/50 font-bold transition-all" />
                </div>
              </div>
              <div className="flex items-center gap-3 px-2">
                <input type="checkbox" id="terms" required className="w-5 h-5 rounded-lg border-2 border-gray-100 text-[#0F172A] focus:ring-0" />
                <Label htmlFor="terms" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                  I accept the <Link href="/terms" className="text-[#0F172A] hover:underline">Terms</Link> & <Link href="/privacy" className="text-[#0F172A] hover:underline">Privacy Policy</Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="p-10 pt-0">
              <Button type="submit" disabled={loading} className="w-full h-16 bg-[#0F172A] hover:bg-[#10B981] text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-black/10">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Complete Signup"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
