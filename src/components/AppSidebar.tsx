import { Home, Gamepad2, BarChart3, Trophy, User, BookOpen, CreditCard, Settings as SettingsIcon, Sparkles, Menu, X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSubscription } from "@/hooks/useSubscription";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home, emoji: "🏠" },
  { title: "Quests", url: "/quests", icon: Gamepad2, emoji: "🎮" },
  { title: "Progress", url: "/progress", icon: BarChart3, emoji: "📊" },
  { title: "AI Insights", url: "/insights", icon: Sparkles, emoji: "✨" },
  { title: "Achievements", url: "/achievements", icon: Trophy, emoji: "🏆" },
  { title: "Learn", url: "/learn", icon: BookOpen, emoji: "📚" },
  { title: "Profile", url: "/profile", icon: User, emoji: "👤" },
  { title: "Settings", url: "/settings", icon: SettingsIcon, emoji: "⚙️" },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isPremium } = useSubscription();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      {/* Hamburger Icon - Top Right */}
      <button 
        className="fixed top-6 right-6 z-50 p-3 bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-primary-foreground" />
        )}
      </button>

      {/* Overlay when menu open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-background border-l border-border
        transform transition-transform duration-300 z-40 shadow-2xl
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <nav className="pt-24 px-6 h-full flex flex-col">
          <div className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? "bg-primary text-primary-foreground font-semibold shadow-md" 
                      : "hover:bg-muted"
                  }`
                }
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-base">{item.title}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="space-y-3 pb-6 border-t border-border pt-6">
            {!isPremium && (
              <Button 
                onClick={() => {
                  setIsOpen(false);
                  navigate("/upgrade");
                }}
                className="w-full bg-primary hover:bg-primary/90"
              >
                ⭐ Upgrade to Premium
              </Button>
            )}
            
            <Button 
              onClick={handleLogout}
              variant="destructive" 
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
