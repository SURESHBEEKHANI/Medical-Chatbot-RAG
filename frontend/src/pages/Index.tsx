import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Brain, Stethoscope, Heart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-safe/5" />
        
        <nav className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MediChat</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Heart className="w-4 h-4" />
              Trusted by 50,000+ healthcare professionals
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
              Your Intelligent
              <span className="text-primary"> Medical </span>
              Assistant
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Get instant, reliable medical guidance powered by advanced AI and verified medical knowledge. Available 24/7 for patients and healthcare professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/signup">
                <Button variant="auth" size="xl" className="group">
                  Start Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl">
                  Sign in to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MediChat?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with medical professionals in mind, our platform combines cutting-edge AI with comprehensive medical databases.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl shadow-soft hover-lift border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">HIPAA Compliant</h3>
              <p className="text-muted-foreground">
                Your health information is protected with enterprise-grade security and full HIPAA compliance.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-soft hover-lift border border-border">
              <div className="w-14 h-14 rounded-xl bg-safe/10 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-safe" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">24/7 Availability</h3>
              <p className="text-muted-foreground">
                Access medical guidance anytime, anywhere. No appointments needed, instant responses always.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-soft hover-lift border border-border">
              <div className="w-14 h-14 rounded-xl bg-warning/10 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-warning" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Advanced RAG technology provides accurate, source-verified medical information you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <Activity className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals and patients who trust MediChat for reliable medical guidance.
          </p>
          <Link to="/signup">
            <Button variant="secondary" size="xl" className="group">
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">MediChat</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MediChat. For informational purposes only. Not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
