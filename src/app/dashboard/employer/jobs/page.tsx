import { createClient } from "@/lib/supabase-server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EmployerJobsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*, applications(count)')
    .eq('employer_id', user?.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="employer" activeTab="job-posts" />
      
      <main className="pl-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-xl font-bold text-[#0F172A]">My Job Listings</h1>
          <Link href="/dashboard/employer/jobs/new">
            <Button className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full font-bold text-sm px-6">
              <Plus className="w-4 h-4 mr-2" /> Post New Job
            </Button>
          </Link>
        </header>

        <div className="max-w-4xl mx-auto p-8 space-y-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job: any) => (
              <Card key={job.id} className="border-gray-200 shadow-sm bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded bg-[#EDF3F8] flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-[#0A66C2]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0F172A] hover:text-[#0A66C2] hover:underline cursor-pointer">{job.title}</h3>
                        <p className="text-sm text-gray-500 font-medium mt-1 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" /> {job.location} • {job.employment_type}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">
                          {job.applications?.[0]?.count || 0} Applicants
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        {job.status}
                      </span>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
                    <Button variant="outline" size="sm" className="text-[#0A66C2] border-[#0A66C2] font-bold rounded-full px-6 hover:bg-[#EDF3F8]">
                      View Applicants
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 font-bold hover:text-[#0A66C2]">
                      Edit Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="bg-white border border-gray-200 p-20 rounded-xl text-center">
              <div className="w-20 h-20 bg-[#F3F2F0] rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">No jobs posted yet</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">Get started by posting your first job opening to find verified staff.</p>
              <Link href="/dashboard/employer/jobs/new">
                <Button className="bg-[#0A66C2] text-white rounded-full font-bold px-8">Post a Job</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
