import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle, Clock, IndianRupee, ArrowRight, Filter, Search } from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  ministry: string;
  benefit: string;
  eligibility: string;
  matchScore: number;
  status: "eligible" | "partial" | "check";
  category: string;
  deadline?: string;
}

const MOCK_SCHEMES: Scheme[] = [
  {
    id: "1", name: "PM-KISAN Samman Nidhi", ministry: "Ministry of Agriculture",
    benefit: "₹6,000/year in 3 installments", eligibility: "All landholding farmer families",
    matchScore: 98, status: "eligible", category: "Income Support",
    deadline: "Rolling admissions",
  },
  {
    id: "2", name: "Pradhan Mantri Fasal Bima Yojana", ministry: "Ministry of Agriculture",
    benefit: "Crop insurance at 2% premium (Kharif), 1.5% (Rabi)", eligibility: "All farmers growing notified crops",
    matchScore: 92, status: "eligible", category: "Insurance",
    deadline: "Before sowing season",
  },
  {
    id: "3", name: "Kisan Credit Card (KCC)", ministry: "Ministry of Finance",
    benefit: "Loan up to ₹3 lakh at 4% interest", eligibility: "All farmers, fishers, animal husbandry",
    matchScore: 88, status: "eligible", category: "Credit",
  },
  {
    id: "4", name: "Soil Health Card Scheme", ministry: "Ministry of Agriculture",
    benefit: "Free soil testing and nutrient recommendations", eligibility: "All farmers",
    matchScore: 85, status: "eligible", category: "Technical Support",
  },
  {
    id: "5", name: "Pradhan Mantri Krishi Sinchayee Yojana", ministry: "Ministry of Agriculture",
    benefit: "55% subsidy on micro-irrigation", eligibility: "Farmers with irrigable land",
    matchScore: 75, status: "partial", category: "Irrigation",
  },
  {
    id: "6", name: "National Horticulture Mission", ministry: "Ministry of Agriculture",
    benefit: "Subsidy up to 50% for horticulture activities", eligibility: "Farmers growing fruits/vegetables/spices",
    matchScore: 62, status: "check", category: "Horticulture",
  },
];

const statusConfig = {
  eligible: { icon: CheckCircle2, label: "Eligible", cls: "text-primary bg-primary/10" },
  partial: { icon: AlertCircle, label: "Likely Eligible", cls: "text-secondary bg-secondary/10" },
  check: { icon: Clock, label: "Needs Review", cls: "text-muted-foreground bg-muted" },
};

const SchemeDiscovery = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(MOCK_SCHEMES.map((s) => s.category))];

  const filtered = MOCK_SCHEMES.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || s.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-20 pb-10 bg-warm-gradient">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Your Recommended Schemes</h1>
          <p className="text-muted-foreground">Based on your profile, we found {MOCK_SCHEMES.length} matching schemes.</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none text-sm"
              placeholder="Search schemes..." />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors ${
                  filter === c ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}>
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Scheme Cards */}
        <div className="space-y-4">
          {filtered.map((scheme, i) => {
            const st = statusConfig[scheme.status];
            return (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl shadow-card border border-border p-5 hover:shadow-elevated transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${st.cls}`}>
                        <st.icon className="w-3 h-3" /> {st.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{scheme.category}</span>
                    </div>
                    <h3 className="font-display font-semibold text-card-foreground text-lg mb-1">{scheme.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{scheme.ministry}</p>
                    <p className="text-sm text-foreground/80 mb-3">{scheme.eligibility}</p>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        <IndianRupee className="w-3.5 h-3.5" /> {scheme.benefit}
                      </span>
                      {scheme.deadline && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" /> {scheme.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{scheme.matchScore}%</div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                    <Link to="/assistant"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:brightness-110 transition-all">
                      Apply <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Match bar */}
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${scheme.matchScore}%` }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SchemeDiscovery;
