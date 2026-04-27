'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link } from "@heroui/react";
import { Rocket, ArrowRight, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar maxWidth="xl" isBordered className="h-20">
        <NavbarBrand>
          <div className="bg-[#408A71] p-2 rounded-xl mr-3 shadow-lg shadow-[#408A71]/20">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <p className="font-black text-2xl tracking-tighter text-slate-800">MERITOS</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} href="/login" variant="flat" className="font-bold text-[#408A71] bg-[#408A71]/10 px-6 rounded-full">
              Sign In
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold tracking-widest text-[#408A71] mb-8 uppercase">
          <Rocket size={14} /> National Innovation Infrastructure
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tight mb-8">
          Bridging the <br/>
          <span className="text-[#408A71]">Philippine Startup Gap.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
          A unified ecosystem-as-a-service connecting Founders, Students, Researchers, Corporations, Investors, and Government Units.
        </p>
        <Button 
          as={Link}
          href="/login"
          size="lg"
          className="bg-[#408A71] text-white font-bold h-16 px-12 rounded-2xl shadow-2xl shadow-[#408A71]/30 text-lg group"
          endContent={<ArrowRight className="group-hover:translate-x-1 transition-transform" />}
        >
          Enter Ecosystem
        </Button>
      </section>
    </div>
  );
}