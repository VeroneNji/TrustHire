import { createClient } from "@/lib/supabase-server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { 
  ShieldCheck, 
  MapPin, 
  Star, 
  Briefcase, 
  Globe, 
  Phone, 
  Mail, 
  Award, 
  CheckCircle2, 
  Calendar,
  MessageSquare,
  UserPlus,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function WorkerProfilePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user: currentUser } } = await supabase.auth.getUser();

  // Fetch worker profile
  const { data: worker, error } = await supabase
    .from('workers')
    .select(`
      *,
      profiles (*)
    `)
    .eq('id', params.id)
    .single();

  if (!worker || error) {
    return notFound();
  }

  const userType = currentUser?.user_metadata?.user_type || "employer";

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      {currentUser && <Sidebar type={userType as any} activeTab="workers" />}
      
      <main className={currentUser ? "pl-64" : ""}>
        <header className="bg-white border-b border-gray-200 px-8 py-3 sticky top-0 z-20 flex items-center justify-between">
          <Link href="/workers" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0A66C2]">
            <ChevronLeft className="w-4 h-4" /> Back to Search
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-gray-500 font-bold text-xs uppercase tracking-widest">EN | FR</Button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-8 space-y-6">
          {/* LinkedIn-style Profile Header */}
          <Card className="border-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
            <div className="h-48 bg-gradient-to-r from-[#0A66C2] to-[#004182] relative">
              <Button variant="ghost" className="absolute top-4 right-4 text-white hover:bg-white/10">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            <CardContent className="p-8 -mt-20 relative">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
                    <img 
                      src={worker.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.profiles?.full_name}`} 
                      alt={worker.profiles?.full_name} 
                    />
                  </div>
                </div>
                <div className="flex gap-3 pb-2">
                  <Button className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full px-8 font-bold gap-2">
                    <MessageSquare className="w-4 h-4" /> Message
                  </Button>
                  <Button variant="outline" className="border-[#0A66C2] text-[#0A66C2] rounded-full px-8 font-bold gap-2 hover:bg-[#EDF3F8]">
                    Hire Professional
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-500 rounded-full p-2 hover:bg-gray-50">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">{worker.profiles?.full_name}</h1>
                  {worker.is_verified && (
                    <div className="bg-[#057642]/10 text-[#057642] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> CNI Verified
                    </div>
                  )}
                </div>
                <p className="text-lg text-gray-600 mt-1 font-medium">{worker.category} Specialist • Expert Household Management</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" /> Yaoundé, Bastos</span>
                  <span className="flex items-center gap-1.5 text-[#0A66C2] font-bold hover:underline cursor-pointer">500+ Connections</span>
                  <span className="flex items-center gap-1.5 text-[#0A66C2] font-bold hover:underline cursor-pointer">Contact info</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="border-gray-200 shadow-sm bg-white rounded-xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">
                {worker.bio || "Dedicated professional with over 5 years of experience in high-end household management. Specialized in childcare, culinary excellence, and maintaining professional standards of cleanliness. Committed to providing trustworthy and reliable service to premium families in Cameroon."}
              </p>
            </CardContent>
          </Card>

          {/* Professional Experience */}
          <Card className="border-gray-200 shadow-sm bg-white rounded-xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">Experience</h2>
              <div className="space-y-8">
                {[
                  { 
                    role: "Head Nanny & Housekeeper", 
                    employer: "Bastos Executive Residence", 
                    period: "Jan 2021 - Present • 3 yrs 5 mos",
                    location: "Yaoundé, Cameroon",
                    desc: "Managing a large household including meal preparation, childcare for 3 children, and coordinating other staff members."
                  },
                  { 
                    role: "Professional Cook", 
                    employer: "Bonapriso Family Estate", 
                    period: "Jun 2018 - Dec 2020 • 2 yrs 7 mos",
                    location: "Douala, Cameroon",
                    desc: "Specialized in local and international cuisine. Responsible for nutritional planning and kitchen management."
                  }
                ].map((exp, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1 pb-8 border-b border-gray-100 last:border-0">
                      <h3 className="font-bold text-[#0F172A] group-hover:text-[#0A66C2] transition-colors">{exp.role}</h3>
                      <p className="text-sm text-[#0F172A] mt-0.5">{exp.employer}</p>
                      <p className="text-xs text-gray-400 mt-1 font-medium">{exp.period}</p>
                      <p className="text-xs text-gray-400 mt-1 font-medium">{exp.location}</p>
                      <p className="text-sm text-gray-600 mt-4 leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills & Endorsements */}
          <Card className="border-gray-200 shadow-sm bg-white rounded-xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">Skills</h2>
              <div className="space-y-6">
                {[
                  { name: "Child Education & Care", endorsements: 12 },
                  { name: "Gourmet Local Cuisine", endorsements: 8 },
                  { name: "Bilingual (English & French)", endorsements: 24 },
                  { name: "First Aid & CPR", endorsements: 5 },
                ].map((skill, idx) => (
                  <div key={idx} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <h3 className="font-bold text-sm text-[#0F172A]">{skill.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <p className="text-xs text-gray-500 font-medium">{skill.endorsements} endorsements from verified employers</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-8 text-sm font-bold text-[#0A66C2] hover:bg-[#F3F6F8] border-t border-gray-100 rounded-none pt-4">
                Show all 12 skills
              </Button>
            </CardContent>
          </Card>

          {/* Verification Badges */}
          <Card className="border-gray-200 shadow-sm bg-white rounded-xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">Trust & Verification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Award, title: "CNI Verified", desc: "Identity confirmed via National ID Card.", status: "Verified" },
                  { icon: CheckCircle2, title: "Background Check", desc: "Clean criminal record certificate verified.", status: "Verified" },
                  { icon: Globe, title: "Bilingual Certified", desc: "Proficient in both official languages.", status: "Verified" },
                  { icon: Calendar, title: "Availability", desc: "Ready for full-time employment.", status: "Active" },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <item.icon className="w-6 h-6 text-[#0A66C2]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0F172A]">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                      <span className="inline-block mt-3 text-[10px] font-black uppercase tracking-widest text-[#057642]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Footer */}
        <footer className="max-w-4xl mx-auto p-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest space-y-4">
          <div className="flex justify-center gap-6">
            <span>About</span>
            <span>Accessibility</span>
            <span>Community Guidelines</span>
            <span>Privacy & Terms</span>
          </div>
          <p>TrustHire Engineering Cameroon © {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
}
