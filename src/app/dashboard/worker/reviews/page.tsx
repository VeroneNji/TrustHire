import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShieldCheck, MessageSquare } from "lucide-react";

export default function WorkerReviewsPage() {
  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <Sidebar type="worker" activeTab="reviews" />
      
      <main className="pl-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-20">
          <h1 className="text-xl font-bold text-[#0F172A]">My Ratings & Feedback</h1>
        </header>

        <div className="max-w-4xl mx-auto p-8 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-gray-200 shadow-sm bg-white p-6 text-center">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Overall Rating</h2>
              <p className="text-5xl font-black text-[#0F172A]">4.9</p>
              <div className="flex justify-center gap-1 mt-2 text-amber-500">
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
            </Card>
            <Card className="border-gray-200 shadow-sm bg-white p-6 text-center">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Reviews</h2>
              <p className="text-5xl font-black text-[#0F172A]">24</p>
            </Card>
            <Card className="border-gray-200 shadow-sm bg-white p-6 text-center">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Completion Rate</h2>
              <p className="text-5xl font-black text-[#057642]">100%</p>
            </Card>
          </div>

          <Card className="border-gray-200 shadow-sm bg-white">
            <CardContent className="p-0 divide-y divide-gray-100">
              {[
                { name: "Bastos Household", rating: 5, date: "Oct 2026", comment: "Excellent service. Very professional and reliable. Highly recommended for premium homes." },
                { name: "Akwa Executive", rating: 5, date: "Aug 2026", comment: "The best cook we've ever hired. Bilingual and very attentive to details." },
              ].map((rev, idx) => (
                <div key={idx} className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-[#0F172A]">{rev.name}</h3>
                      <div className="flex gap-0.5 mt-1 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-bold">{rev.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed">"{rev.comment}"</p>
                  <div className="flex items-center gap-2 pt-2">
                    <ShieldCheck className="w-4 h-4 text-[#0A66C2]" />
                    <span className="text-[10px] font-black text-[#0A66C2] uppercase tracking-widest">Verified Hire</span>
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
