import Link from "next/link";
import { 
  ShieldCheck, 
  Search, 
  Briefcase, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  ChevronRight,
  MapPin,
  Globe,
  Users,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-[#F3F2F0] text-[#0F172A]">
      {/* LinkedIn-style Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-3 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0A66C2] rounded flex items-center justify-center shadow-sm">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0A66C2]">TrustHire</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                className="bg-[#EDF3F8] border-none rounded py-1.5 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-[#0A66C2] transition-all" 
                placeholder="Search jobs, talent..." 
              />
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-8 text-gray-500 font-semibold text-xs uppercase tracking-widest">
            <Link href="/workers" className="hover:text-[#0A66C2] transition-colors">Find Staff</Link>
            <Link href="/jobs" className="hover:text-[#0A66C2] transition-colors">Find Work</Link>
          </div>
          <div className="h-6 w-px bg-gray-200"></div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-bold text-xs uppercase tracking-widest text-gray-500 hover:text-[#0A66C2] hover:bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full px-6 py-5 font-bold uppercase tracking-widest text-[10px] transition-all">
                Join Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl md:hidden animate-in slide-in-from-top duration-300 z-40">
            <div className="flex flex-col p-6 gap-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  className="w-full bg-[#EDF3F8] border-none rounded py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0A66C2]" 
                  placeholder="Search jobs, talent..." 
                />
              </div>
              <div className="flex flex-col gap-4 text-gray-600 font-bold text-sm uppercase tracking-widest border-t border-gray-50 pt-4">
                <Link href="/workers" onClick={() => setIsMenuOpen(false)}>Find Staff</Link>
                <Link href="/jobs" onClick={() => setIsMenuOpen(false)}>Find Work</Link>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              </div>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-[#0A66C2] py-6 rounded-full font-bold uppercase tracking-widest text-xs">
                  Join TrustHire Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Professional & Clean */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-light leading-tight text-[#0F172A] mb-6 md:mb-8 text-center lg:text-left">
              Welcome to your <br/>
              <span className="text-[#0A66C2] font-semibold">professional domestic network.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium max-w-lg mb-8 md:mb-10 leading-relaxed mx-auto lg:mx-0 text-center lg:text-left">
              Connect with verified staff and premium households across Cameroon. Built on trust, powered by professionals.
            </p>
            
            <div className="space-y-4 flex flex-col items-center lg:items-start">
              <Link href="/workers" className="w-full sm:w-80">
                <Button className="w-full bg-white hover:bg-gray-50 text-[#0F172A] border border-gray-300 py-7 rounded-lg font-bold text-lg flex justify-between px-6 transition-all group">
                  Search for talent <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/jobs" className="w-full sm:w-80">
                <Button className="w-full bg-white hover:bg-gray-50 text-[#0F172A] border border-gray-300 py-7 rounded-lg font-bold text-lg flex justify-between px-6 transition-all group">
                  Post a job opening <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex justify-center lg:justify-start">
              <div className="flex items-center gap-3 bg-[#F3F2F0] px-6 py-4 rounded-xl border border-gray-200">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <div>
                  <p className="text-lg font-bold text-[#0F172A]">4.9/5 Trust Rating</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Across 2,000+ Verified Hires</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800" 
              alt="Professional Service" 
              className="w-full rounded-full aspect-square object-cover border-[16px] border-[#F3F2F0] shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce-slow">
              <div className="w-12 h-12 bg-[#057642] rounded-lg flex items-center justify-center shadow-lg shadow-[#057642]/20">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F172A]">CNI Verified</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Background Checked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 md:py-20 px-6 md:px-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-10 md:gap-12">
        {[
          { icon: Users, title: "Find the right staff", desc: "Browse through a network of 1,200+ pre-vetted professionals in your city." },
          { icon: Briefcase, title: "Advance your career", desc: "Get noticed by premium households and build your professional reputation." },
          { icon: Award, title: "Verified Trust", desc: "Every worker profile is backed by CNI verification and employer endorsements." },
        ].map((item, idx) => (
          <div key={idx} className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#EDF3F8] rounded-full flex items-center justify-center mx-auto transition-transform hover:scale-110">
              <item.icon className="w-8 h-8 text-[#0A66C2]" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">{item.title}</h3>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer - Professional & Minimal */}
      <footer className="bg-white pt-16 pb-8 px-6 md:px-16 border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-12 border-b border-gray-100 pb-12">
          <div className="sm:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#0A66C2] rounded flex items-center justify-center">
                <ShieldCheck className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-[#0A66C2]">TrustHire</span>
            </div>
            <p className="text-gray-400 font-medium text-sm max-w-sm">
              Connecting professional domestic staff with premium households in Cameroon. Building a community of trust and excellence.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#0F172A] mb-6">Network</h4>
            <ul className="space-y-3 text-gray-500 font-bold text-xs uppercase tracking-tighter">
              <li><Link href="/workers" className="hover:text-[#0A66C2]">Find Talent</Link></li>
              <li><Link href="/jobs" className="hover:text-[#0A66C2]">Find Work</Link></li>
              <li><Link href="/verification" className="hover:text-[#0A66C2]">Trust & Safety</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#0F172A] mb-6">Support</h4>
            <ul className="space-y-3 text-gray-500 font-bold text-xs uppercase tracking-tighter">
              <li><Link href="/privacy" className="hover:text-[#0A66C2]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#0A66C2]">User Agreement</Link></li>
              <li><Link href="/help" className="hover:text-[#0A66C2]">Help Center</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">© {new Date().getFullYear()} TrustHire Engineering. Cameroon.</p>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <Globe className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] font-bold uppercase text-gray-500">Language: English (Cameroon)</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
