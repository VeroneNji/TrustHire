"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, FileText, Loader2, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";

export default function NewJobPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const quarter = formData.get("quarter") as string;
    const salary = formData.get("salary") as string;
    const type = formData.get("type") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error: jobError } = await supabase
        .from('jobs')
        .insert({
          employer_id: user.id,
          title,
          location: `${location} (${quarter})`,
          salary_range: salary,
          employment_type: type,
          category,
          description,
          status: 'open'
        });

      if (jobError) throw jobError;

      router.push("/dashboard/employer");
    } catch (err: any) {
      setError(err.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      <Sidebar type="employer" activeTab="job-posts" />
      
      <main className="md:pl-64 pt-16 md:pt-0">
        <header className="bg-white/80 backdrop-blur-md border-b px-10 py-8 sticky top-0 z-20">
          <Link href="/dashboard/employer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0F172A] mb-4 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Post a Listing.</h1>
        </header>

        <div className="p-10 max-w-4xl mx-auto">
          <Card className="border-none shadow-[0_40px_100px_rgba(0,0,0,0.04)] bg-white rounded-[40px] overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-[#10B981] to-[#0F172A]" />
            <form onSubmit={handleSubmit}>
              <CardHeader className="p-10 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-[#10B981]" />
                  <CardTitle className="text-2xl font-black tracking-tight">Job Intelligence</CardTitle>
                </div>
                <CardDescription className="font-medium text-gray-400">Describe the ideal professional for your household in Cameroon.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 pt-4 space-y-8">
                {error && (
                  <div className="p-4 text-xs font-black uppercase tracking-widest text-white bg-[#EF4444] rounded-2xl flex items-center gap-3">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Job Headline</Label>
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#10B981] transition-colors" />
                    <Input id="title" name="title" required className="h-14 pl-12 rounded-2xl border-2 border-gray-50 focus:border-[#10B981] focus:ring-0 bg-gray-50/50 font-bold transition-all" placeholder="e.g. Nanny for 2 children in Bastos" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">City</Label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#10B981] transition-colors" />
                      <select id="location" name="location" className="flex h-14 w-full rounded-2xl border-2 border-gray-50 bg-gray-50/50 pl-12 pr-6 py-2 text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] transition-all appearance-none cursor-pointer">
                        <option>Yaoundé</option>
                        <option>Douala</option>
                        <option>Bamenda</option>
                        <option>Bafoussam</option>
                        <option>Garoua</option>
                        <option>Limbe</option>
                        <option>Buea</option>
                        <option>Kribi</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="quarter" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Quarter / Neighborhood</Label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#10B981] transition-colors" />
                      <Input id="quarter" name="quarter" required className="h-14 pl-12 rounded-2xl border-2 border-gray-50 focus:border-[#10B981] focus:ring-0 bg-gray-50/50 font-bold transition-all" placeholder="e.g. Bastos, Akwa, Molyko" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="salary" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Monthly Salary (XAF)</Label>
                    <div className="relative group">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-[#10B981] transition-colors" />
                      <Input id="salary" name="salary" required className="h-14 pl-12 rounded-2xl border-2 border-gray-50 focus:border-[#10B981] focus:ring-0 bg-gray-50/50 font-bold transition-all" placeholder="e.g. 80,000" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="type" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Employment Type</Label>
                    <select id="type" name="type" className="flex h-14 w-full rounded-2xl border-2 border-gray-50 bg-gray-50/50 px-6 py-2 text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] transition-all appearance-none cursor-pointer">
                      <option>Full-time (Plein temps)</option>
                      <option>Part-time (Temps partiel)</option>
                      <option>Live-in (Logé)</option>
                      <option>Contract (Contrat)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Category</Label>
                  <select id="category" name="category" className="flex h-14 w-full rounded-2xl border-2 border-gray-50 bg-gray-50/50 px-6 py-2 text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] transition-all appearance-none cursor-pointer">
                    <option>Housekeeper (Ménagère)</option>
                    <option>Nanny (Nounou)</option>
                    <option>Driver (Chauffeur)</option>
                    <option>Cook (Cuisinier)</option>
                    <option>Security Guard (Vigile)</option>
                    <option>Gardener (Jardinier)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Job Scope & Requirements</Label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-5 text-gray-300 w-5 h-5 group-focus-within:text-[#10B981] transition-colors" />
                    <textarea 
                      id="description" 
                      name="description"
                      required
                      className="flex min-h-[200px] w-full rounded-[32px] border-2 border-gray-50 bg-gray-50/50 pl-12 pr-6 py-5 text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] transition-all"
                      placeholder="Detail the responsibilities, required experience (e.g. bilingual), and any special requests..."
                    />
                  </div>
                </div>

                <div className="pt-6 flex gap-6">
                  <Button type="submit" disabled={loading} className="flex-1 h-16 bg-[#0F172A] hover:bg-[#10B981] text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-black/10">
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Publish Listing"}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
