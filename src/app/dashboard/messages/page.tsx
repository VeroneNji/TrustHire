"use client";

import { useEffect, useState, useRef } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { createClient } from "@/lib/supabase";
import { Send, User, ShieldCheck, Loader2, MoreHorizontal, Info, Search, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function MessagingPage() {
  const supabase = createClient();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();

    // Mock initial messages for UI demonstration
    setMessages([
      { id: 1, sender_id: "other", text: "Hello, I saw your profile and I'm interested in your Nanny services for my home in Bastos.", time: "10:30 AM" },
      { id: 2, sender_id: "me", text: "Hi! Thank you for reaching out. I'd love to discuss the details. When are you free for a quick professional call?", time: "10:32 AM" },
      { id: 3, sender_id: "other", text: "Tomorrow afternoon works for me. Does 2 PM suit you?", time: "10:35 AM" },
    ]);
  }, []);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      sender_id: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#F3F2F0]"><Loader2 className="animate-spin text-[#0A66C2]" /></div>;

  const userType = user?.user_metadata?.user_type || "employer";

  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type={userType as any} activeTab="messages" />
      
      <main className="pl-64 h-screen flex flex-col max-w-6xl mx-auto">
        <div className="flex-1 flex overflow-hidden bg-white my-4 mx-8 rounded-xl border border-gray-200 shadow-sm">
          {/* Messages Sidebar (Conversations List) */}
          <div className="w-80 border-r border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-[#0F172A]">Messaging</h2>
              <Button variant="ghost" size="sm" className="text-gray-400"><MoreHorizontal className="w-5 h-5" /></Button>
            </div>
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input className="w-full bg-[#EDF3F8] border-none rounded py-1.5 pl-10 pr-4 text-xs" placeholder="Search messages" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 bg-[#EDF3F8] border-l-4 border-[#0A66C2] flex gap-3 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marie" alt="avatar" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-[#0F172A] truncate">Marie Claire</p>
                    <span className="text-[10px] text-gray-500 font-bold">Oct 24</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">Tomorrow afternoon works...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            <header className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-sm font-bold text-[#0F172A]">Marie Claire</h1>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <Phone className="w-4 h-4 cursor-pointer hover:text-[#0A66C2]" />
                <Video className="w-4 h-4 cursor-pointer hover:text-[#0A66C2]" />
                <Info className="w-4 h-4 cursor-pointer hover:text-[#0A66C2]" />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-3 max-w-[80%]",
                    msg.sender_id === "me" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                    <img 
                      src={msg.sender_id === "me" 
                        ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.user_metadata?.full_name}`
                        : "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
                      } 
                      alt="avatar" 
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {msg.sender_id === "me" ? "You" : "Marie Claire"}
                      </p>
                      <span className="text-[10px] text-gray-300">{msg.time}</span>
                    </div>
                    <div 
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm shadow-sm",
                        msg.sender_id === "me" 
                          ? "bg-white text-[#0F172A] border border-gray-100" 
                          : "bg-[#0A66C2] text-white"
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="space-y-4">
                <textarea 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write a message..." 
                  className="w-full bg-[#F3F2F0] border-none rounded-lg p-4 text-sm focus:ring-1 focus:ring-[#0A66C2] transition-all min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Add attachment icons here if needed */}
                  </div>
                  <Button type="submit" className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full px-6 font-bold text-xs uppercase tracking-widest">
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
