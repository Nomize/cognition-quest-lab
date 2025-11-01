import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Learn from "./pages/Learn";
import Upgrade from "./pages/Upgrade";
import FocusQuest from "./pages/quests/FocusQuest";
import CalmQuest from "./pages/quests/CalmQuest";
import MemoryQuest from "./pages/quests/MemoryQuest";
import SpeedQuest from "./pages/quests/SpeedQuest";
import BrainSwitchQuest from "./pages/quests/BrainSwitchQuest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/*"
            element={
              <SidebarProvider>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <div className="flex-1 flex flex-col">
                    <header className="h-14 border-b flex items-center px-4">
                      <SidebarTrigger />
                    </header>
                    <main className="flex-1">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/learn" element={<Learn />} />
                        <Route path="/upgrade" element={<Upgrade />} />
                        <Route path="/quest/focus" element={<FocusQuest />} />
                        <Route path="/quest/calm" element={<CalmQuest />} />
                        <Route path="/quest/memory" element={<MemoryQuest />} />
                        <Route path="/quest/speed" element={<SpeedQuest />} />
                        <Route path="/quest/switch" element={<BrainSwitchQuest />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
