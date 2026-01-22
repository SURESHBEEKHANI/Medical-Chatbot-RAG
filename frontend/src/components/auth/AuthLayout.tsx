import { ReactNode } from "react";
import { Heart, Shield, Stethoscope } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-primary-foreground">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
              <Stethoscope className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold">MediChat</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
            Your Trusted<br />Medical Assistant
          </h1>
          
          <p className="text-lg xl:text-xl text-primary-foreground/80 mb-12 max-w-md">
            Get instant, reliable medical guidance powered by advanced AI and verified medical knowledge.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-primary-foreground/90">HIPAA Compliant & Secure</span>
            </div>
            
            <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-primary-foreground/90">24/7 Medical Guidance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MediChat</span>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
