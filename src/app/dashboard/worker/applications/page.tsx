import { createClient } from "@/lib/supabase-server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Clock, MapPin, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function WorkerApplicationsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: apps } = await supabase
    .from('applications')
    .select(`
      *,
      jobs (*)
    `)
    .eq('worker_id', user?.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="worker" activeTab="applications" />
      
      <main className="pl-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-20 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#0F172A]">My Applications</h1>
          <Link href="/jobs">
            <Button className="bg-[#0A66C2] text-white rounded-full font-bold text-sm px-6">
              Browse More Jobs
            </Button>
          </Link>
        </header>

        <div className="max-w-4xl mx-auto p-8 space-y-4">
          {apps && apps.length > 0 ? (
            apps.map((app: any) => (
              <Card key={app.id} className="border-gray-200 shadow-sm bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded bg-[#EDF3F8] flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <Briefcase className="w-6 h-6 text-[#0A66C2]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#0A66C2] hover:underline cursor-pointer">
                            {app.jobs?.title}
                          </h3>
                          <p className="text-sm text-[#0F172A] font-medium mt-0.5">TrustHire Household</p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" /> {app.jobs?.location}
                            </p>
                            <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" /> Applied on {new Date(app.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                            app.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                            app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {app.status}
                          </span>
                          <Button variant="ghost" size="sm" className="text-gray-400">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="bg-white border border-gray-200 p-20 rounded-xl text-center">
              <div className="w-20 h-20 bg-[#F3F2F0] rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">You haven't applied for any jobs</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start your professional career by applying for verified job openings in Cameroon.</p>
              <Link href="/jobs">
                <Button className="bg-[#0A66C2] text-white rounded-full font-bold px-8">Find Jobs</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
