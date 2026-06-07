"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, ArrowLeft, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        const userType = data.user.user_metadata.user_type;
        if (userType === "admin") {
          router.push("/dashboard/admin");
        } else if (userType === "worker") {
          router.push("/dashboard/worker");
        } else {
          router.push("/dashboard/employer");
        }
      }
    } catch (err: any) {
      setError(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF] p-6">
      <div className="w-full max-w-[480px] space-y-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all shadow-xl shadow-black/10">
              <ShieldCheck className="text-[#10B981] w-7 h-7" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">TrustHire</span>
          </Link>
          <h2 className="text-4xl font-black text-[#0F172A] tracking-tighter">Welcome Back.</h2>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-3">Access your professional dashboard</p>
        </div>

        <Card className="border-none shadow-[0_40px_100px_rgba(0,0,0,0.04)] bg-white rounded-[40px] overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#10B981] to-[#0F172A]" />
          <form onSubmit={handleLogin}>
            <CardHeader className="p-10 pb-4">
              <CardTitle className="text-2xl font-black tracking-tight">Login</CardTitle>
              <CardDescription className="font-medium text-gray-400">
                Enter your credentials to continue your journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-4 space-y-6">
              {error && (
                <div className="p-4 text-xs font-black uppercase tracking-widest text-white bg-[#EF4444] rounded-2xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 opacity-80" />
                  {error}
                </div>
              )}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#10B981] transition-colors" />
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    className="h-14 pl-12 rounded-2xl border-2 border-gray-50 focus:border-[#10B981] focus:ring-0 bg-gray-50/50 font-bold transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" title="Enter your password" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Password</Label>
                  <Link href="/forgot-password" className="text-[10px] font-black uppercase tracking-widest text-[#10B981] hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#10B981] transition-colors" />
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    className="h-14 pl-12 rounded-2xl border-2 border-gray-50 focus:border-[#10B981] focus:ring-0 bg-gray-50/50 font-bold transition-all"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-10 pt-0 flex flex-col gap-6">
              <Button type="submit" disabled={loading} className="w-full h-16 bg-[#0F172A] hover:bg-[#10B981] text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-black/10">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign In Now"}
              </Button>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  New to TrustHire?{" "}
                  <Link href="/register" className="text-[#10B981] hover:underline">
                    Create Account
                  </Link>
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-[#0F172A] transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
