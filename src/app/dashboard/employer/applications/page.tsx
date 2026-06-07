import { createClient } from "@/lib/supabase-server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Star, Clock, MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function EmployerApplicationsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: apps } = await supabase
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
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="employer" activeTab="applications" />
      
      <main className="pl-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-20">
          <h1 className="text-xl font-bold text-[#0F172A]">Manage Applications</h1>
        </header>

        <div className="max-w-4xl mx-auto p-8 space-y-4">
          {apps && apps.length > 0 ? (
            apps.map((app: any) => (
              <Card key={app.id} className="border-gray-200 shadow-sm bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={app.workers?.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${app.workers?.profiles?.full_name}`} alt="avatar" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#0F172A] hover:text-[#0A66C2] hover:underline cursor-pointer">
                            {app.workers?.profiles?.full_name}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">
                            {app.workers?.category} • Applied for <span className="font-bold text-[#0F172A]">{app.jobs?.title}</span>
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-500" /> {app.workers?.rating_avg || '5.0'}
                            </div>
                            <span className="text-gray-300 text-xs">|</span>
                            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {new Date(app.created_at).toLocaleDateString()}
                            </span>
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
                      <div className="mt-6 flex items-center gap-3">
                        <Button size="sm" className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full font-bold text-xs h-8 px-6">
                          Review Profile
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#0A66C2] text-[#0A66C2] rounded-full font-bold text-xs h-8 px-6 hover:bg-[#EDF3F8]">
                          <MessageSquare className="w-3.5 h-3.5 mr-2" /> Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="bg-white border border-gray-200 p-20 rounded-xl text-center">
              <div className="w-20 h-20 bg-[#F3F2F0] rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">No applications received</h2>
              <p className="text-gray-500 mb-0">Your job applications will appear here once professionals start applying.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
