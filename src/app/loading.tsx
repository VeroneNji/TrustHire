import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F3F2F0] flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#EDF3F8] rounded-full"></div>
        <div className="w-16 h-16 border-4 border-[#0A66C2] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-black text-[#0F172A] uppercase tracking-widest">TrustHire</p>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] animate-pulse">Loading Platform...</p>
      </div>
    </div>
  );
}
