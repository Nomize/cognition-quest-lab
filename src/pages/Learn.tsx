import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Article {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Understanding Cognitive Fitness",
    content: `Cognitive fitness refers to the brain's ability to perform essential mental tasks such as remembering, learning, focusing, and problem-solving. Just like physical fitness, your brain requires regular exercise to stay sharp and resilient.

The brain operates much like a muscle — the more you challenge it, the stronger it becomes. This process, known as neuroplasticity, allows your brain to form new neural connections throughout your life. Regular mental exercise can enhance memory, improve concentration, and even slow age-related cognitive decline.

The benefits of cognitive training extend beyond just mental performance. Research shows that people who engage in regular brain exercises experience better mood regulation, increased creativity, and improved ability to handle stress. By dedicating just 10-15 minutes daily to cognitive exercises, you're investing in your long-term brain health and mental clarity.`,
    videoUrl: "https://www.youtube.com/embed/5MuIMqhT8DM",
    readTime: "3 min read",
  },
  {
    id: "2",
    title: "Memory Systems and Enhancement",
    content: `Your brain uses two primary memory systems: short-term (or working) memory and long-term memory. Working memory acts as your mental workspace, holding information temporarily while you process it. It typically handles 5-9 items at once and lasts about 15-30 seconds without rehearsal.

Long-term memory, on the other hand, stores information for extended periods — sometimes for a lifetime. Information moves from short-term to long-term storage through repetition, emotional connection, and meaningful association. Understanding this process is key to improving your overall memory performance.

Proven techniques to enhance memory include chunking (grouping information into smaller units), spaced repetition (reviewing material at increasing intervals), and elaborative encoding (connecting new information to existing knowledge). Sleep also plays a crucial role, as memory consolidation primarily occurs during deep sleep phases.`,
    videoUrl: "https://www.youtube.com/embed/TUoJc0NPajQ",
    readTime: "4 min read",
  },
  {
    id: "3",
    title: "The Science of Focus and Attention",
    content: `Attention is not a single skill but a complex system with multiple components. Selective attention allows you to focus on one thing while filtering out distractions. Sustained attention helps you maintain focus over extended periods. Understanding these distinctions can help you train more effectively.

The average human attention span has been impacted by our increasingly digital world. Common attention disruptors include notifications, multitasking, stress, and lack of sleep. However, research shows that attention can be strengthened through deliberate practice and environmental design.

Strategies to improve focus include time-blocking (dedicating specific periods to single tasks), the Pomodoro Technique (25-minute focused work sessions), minimizing environmental distractions, and regular mindfulness practice. Even brief meditation sessions have been shown to significantly improve attention control and reduce mind-wandering.`,
    videoUrl: "https://www.youtube.com/embed/Hu4Yvq-g7_Y",
    readTime: "3 min read",
  },
  {
    id: "4",
    title: "Processing Speed and Mental Agility",
    content: `Processing speed refers to how quickly your brain can take in information, make sense of it, and respond. It's a fundamental cognitive ability that influences almost every mental task, from reading comprehension to decision-making in fast-paced situations.

Several factors influence processing speed, including the amount of myelin (insulation around nerve fibers), neural efficiency, and neurotransmitter function. While processing speed naturally peaks in our mid-20s and gradually declines, regular training can maintain or even improve this ability at any age.

Reaction time training has been shown to improve simple reaction time by 10-15%, enhance response inhibition (the ability to stop inappropriate responses), and translate to real-world benefits like better driving reflexes and sports performance. Physical exercise, adequate sleep, proper hydration, and nutrition (especially omega-3 fatty acids) all support optimal processing speed.`,
    videoUrl: "https://www.youtube.com/embed/UBVV8pch1dM",
    readTime: "3 min read",
  },
  {
    id: "5",
    title: "Neuroplasticity and Brain Health",
    content: `Neuroplasticity is your brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This means your brain can adapt, change, and even heal itself based on your experiences, learning, and habits. It's the scientific foundation for all cognitive training.

Several lifestyle factors significantly impact brain health and neuroplasticity. Quality sleep is essential for memory consolidation and clearing metabolic waste from the brain. Regular physical exercise increases blood flow to the brain and promotes the release of growth factors that support neuron health.

Nutrition also plays a vital role — omega-3 fatty acids, antioxidants, and B vitamins are particularly important for brain function. Social connection, stress management, and continuous learning all contribute to maintaining cognitive reserve. By understanding these factors, you can create a comprehensive approach to brain health that goes beyond simple exercises.`,
    videoUrl: "https://www.youtube.com/embed/ELpfYCZa87g",
    readTime: "4 min read",
  },
  {
    id: "6",
    title: "Psychology of Cognitive Training",
    content: `The psychological benefits of cognitive training extend far beyond improved test scores. Regular brain exercise has been linked to enhanced self-confidence, better emotional regulation, and increased resilience to stress. Understanding the psychology behind training can help you stay motivated and achieve better results.

Habit formation is crucial for long-term success. Research shows it takes an average of 66 days to form a new habit. The key is starting small — even 5-10 minutes of daily practice can establish a sustainable routine. Tracking your progress and celebrating small wins activates reward pathways that reinforce the habit.

Maintaining cognitive wellness requires a balanced approach. Variety in training prevents boredom and ensures you're exercising different cognitive domains. Setting realistic goals, finding intrinsic motivation (such as enjoying the challenge itself), and understanding that progress isn't always linear will help you maintain a healthy relationship with your cognitive training practice.`,
    videoUrl: "https://www.youtube.com/embed/75d_29QWELk",
    readTime: "3 min read",
  },
];

const Learn = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Knowledge Library</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Explore articles and videos to deepen your understanding of cognitive science and brain training.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className={`overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                isDarkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <CardContent className="p-6">
                {/* Title and Reading Time */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-xl font-bold text-foreground">
                    {article.title}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-primary/10 text-primary border-0"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </Badge>
                </div>

                {/* Article Content */}
                <div className={`text-sm leading-relaxed mb-6 whitespace-pre-line ${
                  isDarkMode ? "text-white/70" : "text-gray-600"
                }`}>
                  {article.content}
                </div>

                {/* Divider */}
                <div className={`border-t my-4 ${
                  isDarkMode ? "border-white/10" : "border-gray-200"
                }`} />

                {/* Video Section */}
                <div>
                  <p className={`text-sm font-medium mb-3 flex items-center gap-2 ${
                    isDarkMode ? "text-white/80" : "text-gray-700"
                  }`}>
                    📹 Watch Related Video
                  </p>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={article.videoUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      title={article.title}
                    />
                  </div>
                </div>
              </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;
