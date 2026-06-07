import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ShieldCheck, Search, Filter, Star, MapPin, Briefcase, ChevronRight, Globe, MoreHorizontal, MessageSquare, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default async function WorkerSearchPage() {
  const supabase = createClient();
  const { data: { user: currentUser } } = await supabase.auth.getUser();
  
  const { data: workers, error } = await supabase
    .from('workers')
    .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .eq('availability_status', 'available');

  const userType = currentUser?.user_metadata?.user_type || "employer";

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      {currentUser && <Sidebar type={userType as any} activeTab="workers" />}
      
      <main className={currentUser ? "pl-64" : ""}>
        {/* LinkedIn-style Top Nav */}
        <nav className="bg-white border-b border-gray-200 px-8 py-3 sticky top-0 z-50 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            {!currentUser && (
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0A66C2] rounded flex items-center justify-center">
                  <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-[#0A66C2]">TrustHire</span>
              </Link>
            )}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                className="w-full bg-[#EDF3F8] border-none rounded py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0A66C2] transition-all" 
                placeholder="Search by role, name, or quarter (e.g. Nanny in Bastos)" 
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-8">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition-all">
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[10px] font-bold uppercase text-gray-600">EN | FR</span>
            </div>
            {!currentUser ? (
              <Link href="/login">
                <Button variant="ghost" className="text-sm font-bold text-[#0A66C2]">Sign In</Button>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" className="text-gray-500">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            )}
          </div>
        </nav>

        <div className="max-w-6xl mx-auto p-8 grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-gray-200 shadow-sm bg-white p-4">
              <h2 className="font-bold text-[#0F172A] mb-4 flex items-center justify-between">
                Filters <Filter className="w-4 h-4 text-gray-400" />
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Professional Category</label>
                  <div className="space-y-2">
                    {['Nanny', 'Housekeeper', 'Driver', 'Cook', 'Security'].map(cat => (
                      <div key={cat} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]" />
                        <span className="text-sm text-gray-600 font-medium">{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Experience</label>
                  <div className="space-y-2">
                    {['Entry Level (0-2 yrs)', 'Mid-Level (3-5 yrs)', 'Senior (5+ yrs)'].map(exp => (
                      <div key={exp} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]" />
                        <span className="text-sm text-gray-600 font-medium">{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Language</label>
                  <div className="space-y-2">
                    {['English Only', 'French Only', 'Bilingual (EN/FR)'].map(lang => (
                      <div key={lang} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]" />
                        <span className="text-sm text-gray-600 font-medium">{lang}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Verification</label>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]" />
                    <span className="text-sm text-gray-600 font-medium font-bold text-[#057642]">CNI Verified Only</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content: Talent Directory */}
          <div className="lg:col-span-9 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
              <p className="text-sm text-gray-500 font-medium">Showing <span className="font-bold text-[#0F172A]">{workers?.length || 0}</span> professional candidates in Cameroon</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-bold">Sort by:</span>
                <select className="text-xs font-bold text-[#0F172A] bg-transparent border-none focus:ring-0 cursor-pointer">
                  <option>Top Rated</option>
                  <option>Most Experience</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {error ? (
              <div className="bg-white border border-gray-200 p-12 rounded-lg text-center font-bold text-gray-400">
                Failed to load candidates.
              </div>
            ) : (
              <div className="space-y-3">
                {workers?.map((worker: any) => (
                  <Card key={worker.id} className="border-gray-200 shadow-sm bg-white hover:shadow-md transition-all group overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-shrink-0">
                          <div className="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                            <img 
                              src={worker.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.profiles?.full_name}`} 
                              alt={worker.profiles?.full_name}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <Link href={`/workers/${worker.id}`}>
                                <h3 className="text-xl font-bold text-[#0A66C2] hover:underline cursor-pointer">{worker.profiles?.full_name}</h3>
                              </Link>
                              <p className="text-sm text-[#0F172A] font-medium mt-0.5">{worker.category} Specialist • Expert Care</p>
                              <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" /> Yaoundé (Bastos / Mendong)
                              </p>
                            </div>
                            {worker.is_verified && (
                              <div className="bg-[#057642]/10 text-[#057642] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> CNI Verified
                              </div>
                            )}
                          </div>

                          <div className="mt-4 flex items-center gap-6">
                            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs">
                              <Star className="w-4 h-4 fill-amber-500" /> {worker.rating_avg || '5.0'}
                            </div>
                            <div className="h-4 w-px bg-gray-200" />
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                              {worker.experience_years} Years Experience
                            </div>
                            <div className="h-4 w-px bg-gray-200" />
                            <div className="text-xs text-[#0F172A] font-black">
                              Starting at {worker.hourly_rate?.toLocaleString() || '---'} XAF
                            </div>
                          </div>

                          <div className="mt-6 flex flex-wrap gap-3">
                            <Link href={`/workers/${worker.id}`} className="flex-1 md:flex-none">
                              <Button className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full font-bold text-xs h-9 px-8">
                                View Profile
                              </Button>
                            </Link>
                            <Button variant="outline" className="border-[#0A66C2] text-[#0A66C2] rounded-full font-bold text-xs h-9 px-8 hover:bg-[#EDF3F8]">
                              <MessageSquare className="w-3.5 h-3.5 mr-2" /> Message
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-gray-50 text-gray-400">
                              <UserPlus className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
