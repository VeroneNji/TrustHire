import { createClient } from "@/lib/supabase-server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Clock, CheckCircle, Search, ArrowUpRight, Plus, Star, MapPin, MoreHorizontal, Share2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EmployerDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch real data
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*, applications(count)')
    .eq('employer_id', user?.id);

  const { data: recentApps } = await supabase
    .from('applications')
    .select(`
      *,
      jobs (title),
      workers:worker_id (
        id,
        profiles (full_name, avatar_url),
        category,
        rating_avg
      )
    `)
    .eq('jobs.employer_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const stats = [
    { label: "Active Jobs", value: jobs?.length || 0, icon: Briefcase },
    { label: "Applications", value: jobs?.reduce((acc, job) => acc + (job.applications?.[0]?.count || 0), 0) || 0, icon: Users },
    { label: "Hired", value: "0", icon: CheckCircle },
    { label: "Messages", value: "0", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="employer" activeTab="dashboard" />
      
      <main className="lg:pl-64 pt-16 lg:pt-0">
        {/* Professional Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full ml-12 lg:ml-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                className="w-full bg-[#EDF3F8] border-none rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0A66C2] transition-all" 
                placeholder="Search..." 
              />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <Link href="/dashboard/employer/jobs/new">
              <Button className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full px-4 md:px-6 font-bold text-[10px] md:text-sm h-9 md:h-10">
                Post Job
              </Button>
            </Link>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-4 md:p-8 grid lg:grid-cols-12 gap-6">
          {/* Left Column: Stats & Quick Actions */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-gray-200 shadow-sm overflow-hidden">
              <div className="h-14 bg-gradient-to-r from-[#0A66C2] to-[#004182]" />
              <CardContent className="p-4 -mt-8 text-center">
                <div className="w-16 h-16 rounded-full border-4 border-white bg-gray-200 mx-auto overflow-hidden mb-3">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.user_metadata?.full_name}`} alt="profile" />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <h3 className="font-bold text-[#0F172A]">{user?.user_metadata?.full_name}</h3>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0A66C2] fill-[#0A66C2] text-white" />
                </div>
                <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-wider">Verified Employer</p>
                
                <div className="mt-6 pt-6 border-t border-gray-100 text-left space-y-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between group cursor-pointer">
                      <span className="text-xs font-bold text-gray-500 group-hover:text-[#0A66C2]">{stat.label}</span>
                      <span className="text-xs font-bold text-[#0A66C2]">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm bg-[#EDF3F8]">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-bold text-[#0A66C2]">Safety Compliance</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-[10px] text-gray-600 leading-relaxed font-medium">
                  Your household is currently **Compliant** with TrustHire safety standards. 
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#057642]">
                  <CheckCircle className="w-3 h-3" /> Address Verified
                </div>
                <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-[#057642]">
                  <CheckCircle className="w-3 h-3" /> Phone Confirmed
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="p-4 border-b border-gray-100">
                <CardTitle className="text-sm font-bold">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <Button variant="ghost" className="w-full justify-start text-xs font-bold text-gray-500 hover:text-[#0A66C2] hover:bg-[#F3F6F8] py-2">
                  <Plus className="w-4 h-4 mr-2" /> Invite Workers
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs font-bold text-gray-500 hover:text-[#0A66C2] hover:bg-[#F3F6F8] py-2">
                  <Share2 className="w-4 h-4 mr-2" /> Share Job Board
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed: Applications & Activity */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-[#0F172A]">Recent Applications</h2>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
              <CardContent className="p-0">
                {recentApps && recentApps.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {recentApps.map((app: any) => (
                      <div key={app.id} className="p-4 hover:bg-gray-50 transition-all flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                          <img src={app.workers?.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${app.workers?.profiles?.full_name}`} alt="avatar" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-[#0F172A] hover:text-[#0A66C2] hover:underline cursor-pointer">
                              {app.workers?.profiles?.full_name}
                            </h4>
                            <span className="text-[10px] text-gray-400 font-medium">2h ago</span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">
                            {app.workers?.category} • Applied for <span className="font-bold">{app.jobs?.title}</span>
                          </p>
                          <div className="flex items-center gap-1 text-amber-500 mt-2">
                            <Star className="w-3 h-3 fill-amber-500" />
                            <span className="text-[10px] font-bold">{app.workers?.rating_avg || '5.0'} rating</span>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" className="bg-[#0A66C2] hover:bg-[#004182] text-white text-[10px] font-bold h-7 rounded-full">
                              View Application
                            </Button>
                            <Button variant="outline" size="sm" className="text-[10px] font-bold h-7 rounded-full border-gray-300">
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-sm font-bold text-gray-400">No recent applications found</p>
                  </div>
                )}
                <div className="p-3 border-t border-gray-100 text-center">
                  <Button variant="ghost" className="w-full text-sm font-bold text-[#0A66C2] hover:bg-[#F3F6F8]">
                    Show all applications
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Job Postings Feed Style */}
            <Card className="border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-[#0F172A]">Your Job Postings</h2>
              </div>
              <CardContent className="p-0">
                {jobs && jobs.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {jobs.map((job: any) => (
                      <div key={job.id} className="p-4 hover:bg-gray-50 transition-all">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-sm text-[#0A66C2] hover:underline cursor-pointer">{job.title}</h4>
                            <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-2">
                              <MapPin className="w-3 h-3" /> {job.location} • {job.employment_type}
                            </p>
                          </div>
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            {job.status}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-xs font-bold text-gray-500">
                          <span>{job.applications?.[0]?.count || 0} applicants</span>
                          <span className="text-gray-300">|</span>
                          <span className="hover:text-[#0A66C2] cursor-pointer">Edit post</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 text-sm font-bold">
                    You haven't posted any jobs yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Recommendations & Network */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="p-4 border-b border-gray-100">
                <CardTitle className="text-sm font-bold text-[#0F172A]">Top Talent for You</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {[
                  { name: "Marie Claire", role: "Elite Nanny", rating: "5.0" },
                  { name: "Samuel Eto'o", role: "Driver", rating: "4.9" },
                  { name: "Pascal Siakam", role: "Gardener", rating: "4.8" },
                ].map((worker, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.name}`} alt="avatar" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#0F172A] truncate group-hover:text-[#0A66C2] cursor-pointer">{worker.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium truncate">{worker.role}</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full h-7 px-3 text-[10px] font-bold border-[#0A66C2] text-[#0A66C2] hover:bg-[#EDF3F8]">
                      Connect
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs font-bold text-gray-500 hover:text-[#0A66C2] mt-2">
                  View more recommendations
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm p-4 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">TrustHire Premium</p>
              <h4 className="text-sm font-black text-[#0F172A] leading-tight mb-4">
                Get unlimited access to verified candidate backgrounds.
              </h4>
              <Button className="w-full bg-[#E7A33E] hover:bg-[#C68A32] text-white rounded-full font-bold text-xs py-5">
                Try Premium for Free
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
