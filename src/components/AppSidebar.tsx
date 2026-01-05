import { Menu, X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

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
  const [subscriptionTier, setSubscriptionTier] = useState<string>("free");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const fetchSubscription = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", session.user.id)
          .single();
        if (profile) {
          setSubscriptionTier(profile.subscription_tier);
        }
      }
    };
    fetchSubscription();
  }, []);

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

  const isPremium = subscriptionTier === "premium";

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <button
        className="fixed top-4 left-4 z-50 p-3 bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-primary-foreground" />
        ) : (
          <Menu className="w-5 h-5 text-primary-foreground" />
        )}
      </button>

      {/* Dark Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Sidebar - Claude-style with Glassmorphism */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 h-screen w-[260px] backdrop-blur-xl
          transform transition-all duration-300 ease-in-out z-40 shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isDarkMode 
            ? "bg-[#0F172A]/80 border-r border-white/10" 
            : "bg-white/80 border-r border-gray-200"
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 pt-16">
            <h1 className={`text-xl font-bold transition-colors duration-200 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              🧠 CogniQuest
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#0FA3A3]/10 text-[#0FA3A3]"
                        : isDarkMode
                          ? "text-white/70 hover:bg-white/5 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className={`p-4 border-t transition-colors duration-200 ${
            isDarkMode ? "border-white/10" : "border-gray-200"
          }`}>
            {/* Plan Badge */}
            <div
              className={`px-3 py-1.5 rounded-md text-xs font-medium inline-block transition-colors duration-200 ${
                isPremium
                  ? "bg-[#0FA3A3]/10 text-[#0FA3A3]"
                  : isDarkMode 
                    ? "bg-white/5 text-white/70"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {isPremium ? "✨ Premium" : "Free Plan"}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                isDarkMode 
                  ? "text-red-400 hover:bg-red-500/10"
                  : "text-red-600 hover:bg-red-50"
              }`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
