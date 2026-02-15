import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "bn", label: "বাংলা" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "as", label: "অসমীয়া" },
];

interface NavbarProps {
  currentLang?: string;
  onLangChange?: (code: string) => void;
}

const Navbar = ({ currentLang = "en", onLangChange }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Sprout className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">KisanMitra</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/schemes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Schemes</Link>
          <Link to="/assistant" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">AI Assistant</Link>
          <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">My Profile</Link>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={currentLang}
            onChange={(e) => onLangChange?.(e.target.value)}
            className="text-xs bg-muted text-foreground border border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
