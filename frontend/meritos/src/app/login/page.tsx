'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, Input, Button, Tabs, Tab } from "@heroui/react";
import { Lock, UserCircle } from "lucide-react";

const ROLES = [
  { id: 'founder_group', label: 'Founder', path: '/dash/founder' },
  { id: 'student', label: 'Student', path: '/dash/student' },
  { id: 'researcher', label: 'Researcher', path: '/dash/researcher' },
  { id: 'corporation', label: 'Corporation', path: '/dash/corp' },
  { id: 'investor', label: 'Investor', path: '/dash/investor' },
  { id: 'government', label: 'Government', path: '/dash/gov' },
  { id: 'admin', label: 'Administrator', path: '/dash/admin' },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("founder_group");

  const handleLogin = () => {
    const roleData = ROLES.find(r => r.id === selectedRole);
    
    // 1. Save "Mock" Auth Data for the demo
    document.cookie = `meritos_role=${roleData?.id}; path=/`;
    document.cookie = `meritos_token=demo_token_2026; path=/`;
    
    // 2. Redirect to the correct dash
    router.push(roleData?.path || "/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl p-4 shadow-2xl border-none">
        <CardHeader className="flex flex-col items-center gap-2 py-8">
          <div className="bg-[#408A71] w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#408A71]/20">
            <UserCircle size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mt-4">Meritos Login</h2>
          <p className="text-slate-400 text-sm">Access your ecosystem dashboard</p>
        </CardHeader>
        
        <CardBody className="space-y-8">
          {/* Persona Switcher - The "Control" for your Demo */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Identity Provider</label>
            <Tabs 
              fullWidth 
              aria-label="Roles" 
              selectedKey={selectedRole}
              onSelectionChange={(key) => setSelectedRole(key as string)}
              color="primary"
              variant="bordered"
              classNames={{
                cursor: "bg-[#408A71]",
                tabContent: "group-data-[selected=true]:text-[#408A71] text-[10px] font-bold"
              }}
            >
              {ROLES.map((role) => (
                <Tab key={role.id} title={role.label} />
              ))}
            </Tabs>
          </div>

          <div className="space-y-4">
            <Input 
              label="Ecosystem Email" 
              variant="flat" 
              placeholder="demo@meritos.ph" 
              labelPlacement="outside"
              className="font-medium"
            />
            <Input 
              label="Security Key" 
              type="password" 
              variant="flat" 
              placeholder="••••••••" 
              labelPlacement="outside"
              className="font-medium"
              endContent={<Lock size={18} className="text-slate-300" />}
            />
          </div>

          <Button 
            onPress={handleLogin}
            fullWidth 
            className="bg-[#408A71] text-white font-bold h-14 text-lg shadow-xl shadow-[#408A71]/20"
          >
            Launch Ecosystem
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}