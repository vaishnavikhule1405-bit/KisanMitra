import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Wheat, IndianRupee, Users, ChevronRight, ChevronLeft } from "lucide-react";

const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const CROPS = [
  "Rice", "Wheat", "Maize", "Sugarcane", "Cotton", "Soybean", "Pulses",
  "Groundnut", "Mustard", "Vegetables", "Fruits", "Spices", "Tea", "Coffee", "Jute",
];

const LAND_TYPES = ["Irrigated", "Rain-fed", "Dryland", "Wetland", "Hilly/Terraced"];

interface ProfileData {
  name: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  landType: string;
  acreage: string;
  crops: string[];
  annualIncome: string;
  familySize: string;
  category: string;
}

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<ProfileData>({
    name: "", age: "", gender: "", state: "", district: "",
    landType: "", acreage: "", crops: [], annualIncome: "", familySize: "", category: "",
  });

  const update = (field: keyof ProfileData, value: string | string[]) =>
    setProfile((p) => ({ ...p, [field]: value }));

  const toggleCrop = (crop: string) => {
    setProfile((p) => ({
      ...p,
      crops: p.crops.includes(crop) ? p.crops.filter((c) => c !== crop) : [...p.crops, crop],
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem("farmerProfile", JSON.stringify(profile));
    navigate("/schemes");
  };

  const steps = [
    {
      title: "Personal Details",
      icon: User,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <input value={profile.name} onChange={(e) => update("name", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="Enter your name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Age</label>
              <input type="number" value={profile.age} onChange={(e) => update("age", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="Age" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Gender</label>
              <select value={profile.gender} onChange={(e) => update("gender", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none">
                <option value="">Select</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Category</label>
            <select value={profile.category} onChange={(e) => update("category", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none">
              <option value="">Select</option>
              <option>General</option><option>OBC</option><option>SC</option><option>ST</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Location & Land",
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">State</label>
            <select value={profile.state} onChange={(e) => update("state", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none">
              <option value="">Select State</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">District</label>
            <input value={profile.district} onChange={(e) => update("district", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="Enter district" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Land Type</label>
              <select value={profile.landType} onChange={(e) => update("landType", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none">
                <option value="">Select</option>
                {LAND_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Acreage</label>
              <input type="number" value={profile.acreage} onChange={(e) => update("acreage", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="In acres" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Crops & Income",
      icon: Wheat,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Crops Grown (select all)</label>
            <div className="flex flex-wrap gap-2">
              {CROPS.map((crop) => (
                <button key={crop} onClick={() => toggleCrop(crop)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    profile.crops.includes(crop)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/40"
                  }`}>
                  {crop}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Annual Income (₹)</label>
              <input type="number" value={profile.annualIncome} onChange={(e) => update("annualIncome", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="In Rupees" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Family Size</label>
              <input type="number" value={profile.familySize} onChange={(e) => update("familySize", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="Members" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];

  return (
    <div className="min-h-screen pt-20 pb-10 bg-warm-gradient">
      <div className="container mx-auto px-4 max-w-xl">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>{i + 1}</div>
              {i < steps.length - 1 && <div className={`w-10 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card rounded-xl shadow-card border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <currentStep.icon className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-semibold text-card-foreground">{currentStep.title}</h2>
          </div>

          {currentStep.content}

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep((s) => s - 1)} disabled={step === 0}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-1 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:brightness-110 transition-all">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit}
                className="flex items-center gap-1 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold hover:brightness-110 transition-all">
                Find Schemes <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerProfile;
