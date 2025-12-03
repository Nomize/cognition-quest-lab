import { Menu, X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", emoji: "🏠" },
  { title: "Quests", url: "/quests", emoji: "🎮" },
  { title: "Progress", url: "/progress", emoji: "📊" },
  { title: "Achievements", url: "/achievements", emoji: "🏆" },
  { title: "Learn", url: "/learn", emoji: "📚" },
  { title: "Upgrade", url: "/upgrade", emoji: "💎" },
  { title: "Profile", url: "/profile", emoji: "👤" },
  { title: "Settings", url: "/settings", emoji: "⚙️" },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
      {/* Hamburger Icon - Top Left */}
      <button 
        className="fixed top-6 left-6 z-50 p-3 bg-[#0FA3A3] rounded-lg shadow-lg hover:bg-[#0FA3A3]/90 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Overlay when menu open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Menu from Left */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-[#0F172A] border-r border-border
        transform transition-transform duration-300 z-40 shadow-2xl overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <nav className="pt-20 px-6 pb-8 h-full flex flex-col">
          <div className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? "bg-white/10 text-white font-semibold" 
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-base">{item.title}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="pt-6 border-t border-white/10">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
