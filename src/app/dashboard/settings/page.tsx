import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Settings as SettingsIcon, Bell, ShieldCheck, CreditCard, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="employer" activeTab="settings" />
      
      <main className="pl-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-20">
          <h1 className="text-xl font-bold text-[#0F172A]">Settings</h1>
        </header>

        <div className="max-w-4xl mx-auto p-8 grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <Card className="border-gray-200 shadow-sm bg-white overflow-hidden">
              <CardContent className="p-0">
                {[
                  { icon: SettingsIcon, label: "Account Preferences", active: true },
                  { icon: Lock, label: "Sign-in & Security" },
                  { icon: Globe, label: "Visibility" },
                  { icon: Bell, label: "Notifications" },
                  { icon: CreditCard, label: "Payment Methods" },
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 border-l-4 transition-all ${item.active ? 'bg-[#F3F6F8] border-[#0A66C2] text-[#0A66C2]' : 'border-transparent text-gray-500'}`}>
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-8">
            <Card className="border-gray-200 shadow-sm bg-white">
              <CardContent className="p-8">
                <h2 className="text-lg font-bold text-[#0F172A] mb-6">Account Preferences</h2>
                <div className="space-y-8">
                  <div className="pb-6 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-[#0F172A]">Profile Information</h3>
                    <p className="text-xs text-gray-500 mt-1">Manage how your professional profile appears to others.</p>
                    <Button variant="outline" size="sm" className="mt-4 text-[#0A66C2] border-[#0A66C2] rounded-full font-bold">Edit Profile</Button>
                  </div>
                  <div className="pb-6 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-[#0F172A]">Language</h3>
                    <p className="text-xs text-gray-500 mt-1">Select the language you use on TrustHire.</p>
                    <p className="text-sm font-bold text-[#0F172A] mt-2">English (Cameroon)</p>
                  </div>
                  <div className="pb-6">
                    <h3 className="text-sm font-bold text-[#EF4444]">Deactivate Account</h3>
                    <p className="text-xs text-gray-500 mt-1">Temporarily hide your profile or permanently delete your account.</p>
                    <Button variant="ghost" size="sm" className="mt-4 text-[#EF4444] hover:bg-red-50 font-bold">Deactivate</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
