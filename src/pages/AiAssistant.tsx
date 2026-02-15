import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, MicOff, Bot, User, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What schemes am I eligible for?",
  "How to apply for PM-KISAN?",
  "मुझे फसल बीमा के बारे में बताएं",
  "Explain KCC loan process",
];

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "🙏 Namaste! I'm your **KisanMitra AI Assistant**. I can help you:\n\n- 🔍 Find government schemes you're eligible for\n- 📝 Guide you through application processes\n- 📄 Help with document requirements\n- 💡 Answer questions about farming subsidies\n\nYou can type or use voice in any Indian language. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();
    if (lower.includes("pm-kisan") || lower.includes("pm kisan")) {
      return `## PM-KISAN Samman Nidhi\n\n**You appear eligible!** ✅\n\nHere's what you need to know:\n\n- **Benefit**: ₹6,000 per year in 3 installments of ₹2,000 each\n- **Who qualifies**: All landholding farmer families\n\n### Documents Required:\n1. Aadhaar Card\n2. Bank Account (linked to Aadhaar)\n3. Land ownership records\n\n### How to Apply:\n1. Visit your nearest CSC (Common Service Centre)\n2. Or apply online at pmkisan.gov.in\n3. Submit your Aadhaar and land records\n\n*Would you like me to help prepare your application?*`;
    }
    if (lower.includes("eligible") || lower.includes("scheme")) {
      return `Based on your profile, here are your **top 3 matches**:\n\n1. 🌾 **PM-KISAN** — ₹6,000/year (98% match)\n2. 🛡️ **Fasal Bima Yojana** — Crop insurance at 2% premium (92% match)\n3. 💳 **Kisan Credit Card** — Loan up to ₹3L at 4% (88% match)\n\nShall I explain any of these in detail or help you start an application?`;
    }
    if (lower.includes("बीमा") || lower.includes("fasal") || lower.includes("insurance")) {
      return `## प्रधानमंत्री फसल बीमा योजना\n\n**आप इस योजना के लिए पात्र हैं!** ✅\n\n- **प्रीमियम**: खरीफ के लिए 2%, रबी के लिए 1.5%\n- **कवरेज**: प्राकृतिक आपदा, कीट, रोग\n\n### आवेदन करने के लिए:\n1. नजदीकी बैंक या CSC पर जाएं\n2. बुवाई से पहले आवेदन करें\n3. आधार और भूमि रिकॉर्ड साथ लाएं\n\n*क्या आप और जानकारी चाहते हैं?*`;
    }
    return `Thank you for your question. Based on your profile, I can see several relevant options.\n\nTo give you the most accurate guidance, could you tell me:\n- Your **state** and **district**?\n- What **crops** you grow?\n- Your **land size** in acres?\n\nThis will help me find the best schemes and guide you through the application process step by step.`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 1200));
    const response = simulateResponse(userMsg.content);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="container mx-auto max-w-3xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-semibold text-card-foreground">KisanMitra AI</h1>
            <p className="text-xs text-muted-foreground">Multilingual Agricultural Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-3xl px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-card-foreground"
              }`}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none text-card-foreground prose-headings:text-card-foreground prose-strong:text-card-foreground prose-headings:font-display">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-secondary" />
                </div>
              )}
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-card border border-border rounded-xl px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="container mx-auto max-w-3xl px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <button key={s} onClick={() => { setInput(s); }}
                className="px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <button type="button" onClick={() => setIsListening(!isListening)}
              className={`p-2.5 rounded-lg border transition-colors ${
                isListening
                  ? "bg-accent text-accent-foreground border-accent animate-pulse-soft"
                  : "bg-muted text-muted-foreground border-border hover:text-foreground"
              }`}>
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about schemes, eligibility, documents..."
              className="flex-1 px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none text-sm"
            />
            <button type="submit" disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:brightness-110 transition-all disabled:opacity-40">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
