'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F3F2F0] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center space-y-6 border border-gray-200">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#0F172A]">Something went wrong</h1>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            An unexpected error occurred. Our team has been notified and we're working to fix it.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => reset()}
            className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full font-bold h-12 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </Button>
          
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full border-gray-300 text-gray-600 rounded-full font-bold h-12">
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Error ID: {error.digest || 'Internal Server Error'}
        </p>
      </div>
    </div>
  );
}
