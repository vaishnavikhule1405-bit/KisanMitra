import { motion } from "framer-motion";
import { ArrowRight, Mic, Search, FileCheck, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farm.jpg";

const features = [
  {
    icon: Search,
    title: "Smart Scheme Discovery",
    description: "AI analyzes your profile to find the best government schemes you're eligible for.",
  },
  {
    icon: Languages,
    title: "15+ Indian Languages",
    description: "Use the platform in your preferred language — Hindi, Tamil, Telugu, Bengali, and more.",
  },
  {
    icon: Mic,
    title: "Voice-First Interface",
    description: "Speak naturally in your language. Our AI understands agricultural terms and local dialects.",
  },
  {
    icon: FileCheck,
    title: "Document Assistance",
    description: "Smart OCR verification and auto-generation of missing paperwork for applications.",
  },
];

const stats = [
  { value: "700+", label: "Government Schemes" },
  { value: "15+", label: "Languages Supported" },
  { value: "95%+", label: "Match Accuracy" },
  { value: "10M+", label: "Farmers Helped" },
];

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0 z-0">
      <img src={heroImage} alt="Indian paddy fields at golden hour" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
    </div>

    <div className="container mx-auto px-4 relative z-10 pt-16">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6 backdrop-blur-sm">
            🌾 AI-Powered Farmer Assistance
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Every Farmer Deserves{" "}
            <span className="text-gradient-gold">Every Benefit</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 font-body leading-relaxed max-w-xl">
            Discover 700+ government schemes tailored to your farm, family, and future.
            Our AI assistant speaks your language and guides you every step of the way.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:brightness-110 transition-all shadow-elevated"
            >
              Find My Schemes <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 font-semibold hover:bg-primary-foreground/20 transition-all backdrop-blur-sm"
            >
              <Mic className="w-4 h-4" /> Talk to AI Assistant
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-20 bg-warm-gradient">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          How KisanMitra Helps You
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          From discovery to application, we simplify your journey to government benefits.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow border border-border"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-card-foreground text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="py-16 bg-hero-gradient">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-1">{s.value}</div>
            <div className="text-sm text-primary-foreground/70">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Landing = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <footer className="py-10 bg-muted text-center">
        <p className="text-sm text-muted-foreground">© 2026 KisanMitra — Empowering Indian Farmers with AI</p>
      </footer>
    </>
  );
};

export default Landing;