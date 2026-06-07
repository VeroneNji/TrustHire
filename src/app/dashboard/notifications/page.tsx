import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Briefcase, ShieldCheck, UserPlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const notifications = [
    { icon: UserPlus, title: "New Connection Request", desc: "Marie Claire wants to connect with you.", time: "2h ago", unread: true },
    { icon: Briefcase, title: "Job Update", desc: "Your application for 'Executive Chef' has been viewed.", time: "5h ago", unread: true },
    { icon: ShieldCheck, title: "Verification Success", desc: "Your CNI has been successfully verified by TrustHire Admin.", time: "1d ago", unread: false },
    { icon: Star, title: "New Review", desc: "You received a 5-star review from the Bastos Estate.", time: "3d ago", unread: false },
  ];

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="employer" activeTab="notifications" />
      
      <main className="md:pl-64 pt-16 md:pt-0">
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-20">
          <h1 className="text-lg md:text-xl font-bold text-[#0F172A] ml-12 md:ml-0">Notifications</h1>
        </header>

        <div className="max-w-3xl mx-auto p-4 md:p-8">
          <Card className="border-gray-200 shadow-sm bg-white overflow-hidden">
            <CardContent className="p-0 divide-y divide-gray-100">
              {notifications.map((n, idx) => (
                <div key={idx} className={`p-6 flex gap-4 hover:bg-gray-50 transition-all cursor-pointer ${n.unread ? 'bg-blue-50/30 border-l-4 border-[#0A66C2]' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${n.unread ? 'bg-[#EDF3F8]' : 'bg-gray-50'}`}>
                    <n.icon className={`w-6 h-6 ${n.unread ? 'text-[#0A66C2]' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className={`text-sm font-bold ${n.unread ? 'text-[#0F172A]' : 'text-gray-500'}`}>{n.title}</h3>
                      <span className="text-[10px] text-gray-400 font-bold">{n.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{n.desc}</p>
                    {n.unread && (
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="bg-[#0A66C2] text-white text-[10px] h-7 px-4 rounded-full font-bold">Accept</Button>
                        <Button variant="ghost" size="sm" className="text-[10px] h-7 px-4 rounded-full font-bold text-gray-400">Ignore</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
