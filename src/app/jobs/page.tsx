import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ShieldCheck, Search, Filter, Briefcase, MapPin, Clock, ChevronRight, Globe, MoreHorizontal, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function JobsPage() {
  const supabase = createClient();
  const { data: { user: currentUser } } = await supabase.auth.getUser();
  
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  const userType = currentUser?.user_metadata?.user_type || "worker";

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      {currentUser && <Sidebar type={userType as any} activeTab="jobs" />}
      
      <main className={currentUser ? "md:pl-64 pt-16 md:pt-0" : ""}>
        {/* LinkedIn-style Top Nav */}
        <nav className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 sticky top-0 z-50 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            {(!currentUser || true) && (
              <div className="md:hidden ml-12"></div>
            )}
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
                placeholder="Search by job title, category, or city" 
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-8">
            {!currentUser ? (
              <Link href="/login">
                <Button variant="ghost" className="text-sm font-bold text-[#0A66C2]">Sign In</Button>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" className="text-gray-400">
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
                Job Filters <Filter className="w-4 h-4 text-gray-400" />
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Job Type</label>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Live-in'].map(type => (
                      <div key={type} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]" />
                        <span className="text-sm text-gray-600 font-medium">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content: Job Listings */}
          <div className="lg:col-span-9 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
              <p className="text-sm text-gray-500 font-medium">Showing <span className="font-bold text-[#0F172A]">{jobs?.length || 0}</span> open positions in Cameroon</p>
            </div>

            {error ? (
              <div className="bg-white border border-gray-200 p-12 rounded-lg text-center font-bold text-gray-400">
                Failed to load jobs.
              </div>
            ) : (
              <div className="space-y-3">
                {jobs?.map((job: any) => (
                  <Card key={job.id} className="border-gray-200 shadow-sm bg-white hover:shadow-md transition-all group overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-100">
                          <Briefcase className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-[#0A66C2] hover:underline cursor-pointer">{job.title}</h3>
                              <p className="text-sm text-[#0F172A] font-medium mt-0.5">TrustHire Premium Household</p>
                              <div className="mt-2 space-y-1">
                                <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5" /> {job.location}
                                </p>
                                <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" /> {job.employment_type} • {job.salary_range} XAF
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#0A66C2]">
                              <Bookmark className="w-5 h-5" />
                            </Button>
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                              Posted {new Date(job.created_at).toLocaleDateString()}
                            </div>
                            <Button className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full font-bold text-xs h-9 px-8">
                              Easy Apply
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
