"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Star, 
  Bell, 
  Settings, 
  LogOut,
  ShieldCheck,
  ChevronRight,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface SidebarProps {
  type: "employer" | "worker" | "admin";
  activeTab: string;
}

export function Sidebar({ type, activeTab }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const menuItems = {
    employer: [
      { id: "dashboard", label: "Home", icon: LayoutDashboard, href: "/dashboard/employer" },
      { id: "workers", label: "Talent Pool", icon: Users, href: "/workers" },
      { id: "job-posts", label: "Job Postings", icon: Briefcase, href: "/dashboard/employer/jobs" },
      { id: "applications", label: "My Applications", icon: FileText, href: "/dashboard/employer/applications" },
      { id: "messages", label: "Messaging", icon: MessageSquare, href: "/dashboard/messages" },
    ],
    worker: [
      { id: "dashboard", label: "Home", icon: LayoutDashboard, href: "/dashboard/worker" },
      { id: "jobs", label: "Jobs", icon: Briefcase, href: "/workers" },
      { id: "applications", label: "Applied", icon: FileText, href: "/dashboard/worker/applications" },
      { id: "messages", label: "Messaging", icon: MessageSquare, href: "/dashboard/messages" },
      { id: "reviews", label: "Ratings", icon: Star, href: "/dashboard/worker/reviews" },
    ],
    admin: [
      { id: "dashboard", label: "Overview", icon: LayoutDashboard, href: "/dashboard/admin" },
      { id: "verifications", label: "Compliance", icon: ShieldCheck, href: "/dashboard/admin/verify" },
      { id: "users", label: "Network", icon: Users, href: "/dashboard/admin/users" },
      { id: "reports", label: "Analytics", icon: FileText, href: "/dashboard/admin/reports" },
    ]
  }[type];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50">
      {/* LinkedIn-style Brand Header */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#0A66C2] rounded-md flex items-center justify-center shadow-sm">
            <ShieldCheck className="text-white w-5.5 h-5.5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0A66C2]">TrustHire</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link 
            key={item.id} 
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all group",
              pathname === item.href || activeTab === item.id
                ? "bg-[#F3F6F8] text-[#0A66C2] border-r-4 border-[#0A66C2] rounded-r-none" 
                : "text-gray-500 hover:bg-[#F3F6F8] hover:text-[#0A66C2]"
            )}
          >
            <item.icon className={cn("w-5 h-5 transition-colors", 
              pathname === item.href || activeTab === item.id ? "text-[#0A66C2]" : "text-gray-400 group-hover:text-[#0A66C2]"
            )} />
            {item.label}
          </Link>
        ))}

        <div className="pt-6 mt-6 border-t border-gray-100 space-y-1">
          <Link 
            href="/dashboard/notifications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-500 hover:bg-[#F3F6F8] hover:text-[#0A66C2] group transition-all"
          >
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-[#0A66C2]" />
            Notifications
          </Link>
          <Link 
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-500 hover:bg-[#F3F6F8] hover:text-[#0A66C2] group transition-all"
          >
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-[#0A66C2]" />
            Settings
          </Link>
        </div>
      </nav>

      {/* User Profile Summary at bottom (LinkedIn style) */}
      <div className="p-4 border-t border-gray-100 bg-[#F9FAFB]">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-200 hover:text-red-600 transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
