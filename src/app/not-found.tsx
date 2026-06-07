import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Home, ChevronLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F3F2F0] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center space-y-8 border border-gray-200">
        <div className="relative">
          <div className="w-24 h-24 bg-[#EDF3F8] rounded-full flex items-center justify-center mx-auto">
            <Search className="w-12 h-12 text-[#0A66C2]" />
          </div>
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-sm border border-gray-100">
            <span className="text-2xl">🔍</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl font-black text-[#0F172A]">404</h1>
          <h2 className="text-xl font-bold text-[#0F172A]">Page not found</h2>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a new location.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/" className="block">
            <Button className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full font-bold h-12 flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> Go to Homepage
            </Button>
          </Link>
          
          <Link href="/jobs" className="block">
            <Button variant="ghost" className="w-full text-[#0A66C2] font-bold h-12 hover:bg-[#EDF3F8] rounded-full">
              Browse Available Jobs
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
            TrustHire Cameroon
          </p>
        </div>
      </div>
    </div>
  );
}
