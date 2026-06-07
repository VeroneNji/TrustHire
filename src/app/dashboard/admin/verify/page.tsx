import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, FileCheck, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminVerifyPage() {
  const requests = [
    { name: "Marie Claire", doc: "CNI (National ID)", date: "2h ago", status: "Pending" },
    { name: "Samuel Eto'o", doc: "Passport", date: "5h ago", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="admin" activeTab="verifications" />
      
      <main className="pl-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-20">
          <h1 className="text-xl font-bold text-[#0F172A]">Compliance & Verifications</h1>
        </header>

        <div className="max-w-4xl mx-auto p-8 space-y-4">
          {requests.map((req, idx) => (
            <Card key={idx} className="border-gray-200 shadow-sm bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-orange-50 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A]">{req.name}</h3>
                    <p className="text-sm text-gray-500">{req.doc} submitted {req.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-[#057642] border-[#057642] font-bold rounded-full px-6">
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve
                  </Button>
                  <Button variant="outline" size="sm" className="text-[#EF4444] border-[#EF4444] font-bold rounded-full px-6">
                    <XCircle className="w-4 h-4 mr-2" /> Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
