import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/ui/Navbar";
import Landing from "./pages/Landing";
import FarmerProfile from "./pages/FarmerProfile";
import SchemeDiscovery from "./pages/SchemeDiscovery";
import AiAssistant from "./pages/AiAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/profile" element={<FarmerProfile />} />
            <Route path="/schemes" element={<SchemeDiscovery />} />
            <Route path="/assistant" element={<AiAssistant />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
