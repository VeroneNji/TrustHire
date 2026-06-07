import { Sidebar } from "@/components/dashboard/sidebar";
import { 
  Users, 
  ShieldCheck, 
  FileCheck, 
  AlertCircle, 
  Search, 
  CheckCircle, 
  XCircle,
  BarChart3,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,750", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pending Verifications", value: "42", icon: ShieldCheck, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Active Jobs", value: "128", icon: BarChart3, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "New Signups (Today)", value: "+15", icon: UserPlus, color: "text-green-600", bg: "bg-green-100" },
  ];

  const pendingRequests = [
    { name: "Marie Claire", role: "Nanny", type: "ID Card", submitted: "1 hour ago", id: "V-1024" },
    { name: "Samuel Eto'o", role: "Driver", type: "Passport", submitted: "3 hours ago", id: "V-1025" },
    { name: "Theresa May", role: "Housekeeper", type: "Voter Card", submitted: "5 hours ago", id: "V-1026" },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar type="admin" activeTab="dashboard" />
      
      <main className="md:pl-64">
        <header className="bg-white border-b px-4 md:px-8 py-4 md:py-6 flex items-center justify-between sticky top-0 z-10">
          <div className="ml-14 md:ml-0">
            <h1 className="text-xl md:text-2xl font-bold text-primary">Admin Overview</h1>
            <p className="text-[10px] md:text-sm text-gray-500">Platform Management System</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input className="pl-10 pr-4 py-2 bg-surface rounded-lg text-sm border-none focus:ring-2 focus:ring-primary w-48 lg:w-64" placeholder="Search..." />
            </div>
            <Button size="sm" className="bg-secondary hover:bg-opacity-90 text-[10px] md:text-sm h-8 md:h-10">Export</Button>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pending Verifications */}
            <Card className="lg:col-span-2 border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Pending Verification Requests</CardTitle>
                <Button variant="link" className="text-secondary">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b text-sm text-gray-400">
                        <th className="pb-4 font-medium">Worker</th>
                        <th className="pb-4 font-medium">Document Type</th>
                        <th className="pb-4 font-medium">Submitted</th>
                        <th className="pb-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {pendingRequests.map((request, idx) => (
                        <tr key={idx} className="group hover:bg-surface/50 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary font-bold">
                                {request.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-primary text-sm">{request.name}</p>
                                <p className="text-xs text-gray-500">{request.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-gray-600">{request.type}</td>
                          <td className="py-4 text-sm text-gray-500">{request.submitted}</td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50 border-green-200 h-8 px-2">
                                <CheckCircle className="w-4 h-4 mr-1" /> Approve
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 border-red-200 h-8 px-2">
                                <XCircle className="w-4 h-4 mr-1" /> Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Platform Health */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    <span className="text-sm font-medium text-green-800">Supabase Auth</span>
                  </div>
                  <span className="text-xs font-bold text-green-600">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    <span className="text-sm font-medium text-green-800">Storage Bucket</span>
                  </div>
                  <span className="text-xs font-bold text-green-600">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-orange-600 w-5 h-5" />
                    <span className="text-sm font-medium text-orange-800">Real-time DB</span>
                  </div>
                  <span className="text-xs font-bold text-orange-600">DELAY</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
