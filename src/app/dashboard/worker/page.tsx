import { createClient } from "@/lib/supabase-server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, CheckCircle, Clock, Star, ArrowUpRight, ShieldCheck, AlertCircle, MapPin, ChevronRight, Eye, UserPlus, Bookmark, Search, MoreHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function WorkerDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch worker details
  const { data: worker } = await supabase
    .from('workers')
    .select('*')
    .eq('id', user?.id)
    .single();

  const { data: applications } = await supabase
    .from('applications')
    .select('count')
    .eq('worker_id', user?.id);

  const { data: recommendedJobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'open')
    .limit(3);

  const stats = [
    { label: "Profile views", value: "24", icon: Eye },
    { label: "Job applications", value: applications?.[0]?.count || 0, icon: Briefcase },
    { label: "Search appearances", value: "12", icon: UserPlus },
  ];

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="worker" activeTab="dashboard" />
      
      <main className="lg:pl-64 pt-16 lg:pt-0">
        {/* Header - Search focused like LinkedIn */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full ml-12 lg:ml-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                className="w-full bg-[#EDF3F8] border-none rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0A66C2] transition-all" 
                placeholder="Search jobs..." 
              />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-4 md:p-8 grid lg:grid-cols-12 gap-6">
          {/* Left Column: Profile Summary */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-gray-200 shadow-sm overflow-hidden bg-white">
              <div className="h-16 bg-gradient-to-r from-[#0A66C2] to-[#004182]" />
              <CardContent className="p-4 -mt-10 text-center">
                <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 mx-auto overflow-hidden mb-4 shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.user_metadata?.full_name}`} alt="profile" />
                </div>
                <Link href={`/workers/${user?.id}`}>
                  <h3 className="font-bold text-[#0F172A] hover:underline cursor-pointer">{user?.user_metadata?.full_name}</h3>
                </Link>
                <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                  {worker?.category || "Professional Domestic Worker"} in Cameroon
                </p>
                
                <div className="mt-6 pt-6 border-t border-gray-100 text-left space-y-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between group cursor-pointer">
                      <span className="text-xs font-bold text-gray-500 group-hover:text-[#0A66C2]">{stat.label}</span>
                      <span className="text-xs font-bold text-[#0A66C2]">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Professional Badge</p>
                  <Link href="/dashboard/worker/verify">
                    <div className="flex items-center gap-2 group cursor-pointer">
                      {worker?.is_verified ? (
                        <div className="flex items-center gap-1.5 text-[#057642] font-bold text-[10px] uppercase">
                          <ShieldCheck className="w-4 h-4" /> Verified Profile
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600 font-bold text-[10px] uppercase group-hover:underline">
                          <AlertCircle className="w-4 h-4" /> Get CNI Verified
                        </div>
                      )}
                      {!worker?.is_verified && <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-amber-600" />}
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm bg-[#EDF3F8]">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-bold text-[#0A66C2]">New Offers</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 group cursor-pointer hover:border-[#0A66C2] transition-all">
                    <p className="text-xs font-bold text-[#0F172A]">Executive Chef</p>
                    <p className="text-[10px] text-gray-500 mt-1">Bastos Household • 150k XAF</p>
                    <div className="mt-3 flex gap-2">
                      <span className="text-[8px] font-black uppercase text-[#0A66C2] bg-[#EDF3F8] px-2 py-1 rounded">View Offer</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed: Jobs & Insights */}
          <div className="lg:col-span-6 space-y-6">
            {/* Post/Status Box Style like LinkedIn */}
            <Card className="border-gray-200 shadow-sm p-4 flex gap-4 items-center bg-white">
              <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.user_metadata?.full_name}`} alt="avatar" />
              </div>
              <Button variant="outline" className="flex-1 justify-start h-12 rounded-full text-gray-500 font-bold border-gray-300 hover:bg-gray-50 text-sm">
                I'm looking for a job as a...
              </Button>
            </Card>

            {/* Recommended Jobs Feed */}
            <Card className="border-gray-200 shadow-sm bg-white">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#0F172A]">Recommended for you</h2>
                  <p className="text-[10px] text-gray-500 font-medium">Based on your profile and search history</p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
              <CardContent className="p-0">
                {recommendedJobs && recommendedJobs.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {recommendedJobs.map((job: any) => (
                      <div key={job.id} className="p-4 hover:bg-gray-50 transition-all flex gap-4">
                        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-100">
                          <Briefcase className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-[#0A66C2] hover:underline cursor-pointer">{job.title}</h4>
                          <p className="text-xs text-[#0F172A] font-medium mt-1">TrustHire Family • {job.location}</p>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>1 day ago • {job.employment_type}</span>
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            <Button size="sm" className="bg-[#0A66C2] hover:bg-[#004182] text-white text-[10px] font-bold h-7 rounded-full">
                              Apply Now
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1 h-auto hover:bg-transparent">
                              <Bookmark className="w-4 h-4 text-gray-400 hover:text-[#0A66C2]" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-gray-400 text-sm font-bold">
                    No job recommendations at the moment.
                  </div>
                )}
                <div className="p-3 border-t border-gray-100 text-center">
                  <Link href="/workers">
                    <Button variant="ghost" className="w-full text-sm font-bold text-[#0A66C2] hover:bg-[#F3F6F8]">
                      Show all jobs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn-style Insight Card */}
            <Card className="border-gray-200 shadow-sm p-6 bg-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-[#EDF3F8] rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#0A66C2] fill-[#0A66C2]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">Profile strength: {worker?.is_verified ? 'High' : 'Intermediate'}</h3>
                  <div className="w-48 h-2 bg-gray-100 rounded-full mt-2">
                    <div className={cn("h-full rounded-full bg-[#057642]", worker?.is_verified ? "w-full" : "w-[65%]")} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium mb-4">
                Workers with a verified CNI and complete work history are 5x more likely to be noticed by top employers.
              </p>
              <Button variant="outline" className="rounded-full border-[#0A66C2] text-[#0A66C2] font-bold text-xs h-9 hover:bg-[#EDF3F8]">
                {worker?.is_verified ? 'View Analytics' : 'Complete Verification'}
              </Button>
            </Card>
          </div>

          {/* Right Column: Feed Extras */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-gray-200 shadow-sm bg-white">
              <CardHeader className="p-4 border-b border-gray-100">
                <CardTitle className="text-sm font-bold text-[#0F172A]">Add to your feed</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {[
                  { name: "Executive Households", type: "Community", followers: "1.2k" },
                  { name: "Domestic Workers Group", type: "Network", followers: "4.5k" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-md bg-[#EDF3F8] flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-[#0A66C2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#0F172A] truncate group-hover:text-[#0A66C2] cursor-pointer">{item.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{item.type} • {item.followers} followers</p>
                      <Button variant="outline" size="sm" className="rounded-full h-7 px-4 text-[10px] font-bold border-gray-400 text-gray-500 hover:bg-gray-50 mt-2">
                        + Follow
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="sticky top-24">
              <Card className="border-gray-200 shadow-sm p-4 bg-white text-center">
                <img 
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=300" 
                  alt="Premium" 
                  className="w-full h-24 object-cover rounded-md mb-4 grayscale-[0.5]"
                />
                <h4 className="text-xs font-black text-[#0F172A] mb-2 uppercase tracking-wider">TrustHire Career</h4>
                <p className="text-[10px] text-gray-500 font-bold mb-4">See how you compare to other applicants for a job.</p>
                <Button className="w-full bg-[#E7A33E] hover:bg-[#C68A32] text-white rounded-full font-bold text-[10px] py-4">
                  Learn More
                </Button>
              </Card>
              
              <footer className="mt-8 text-center space-y-2">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                  {['About', 'Accessibility', 'Help Center', 'Privacy & Terms'].map(link => (
                    <span key={link} className="text-[10px] font-medium text-gray-500 hover:text-[#0A66C2] hover:underline cursor-pointer">{link}</span>
                  ))}
                </div>
                <p className="text-[10px] font-bold text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#0A66C2]" /> TrustHire Cameroon © {new Date().getFullYear()}
                </p>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
