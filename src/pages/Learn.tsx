import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { BookOpen, Clock, Video } from "lucide-react";

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
    content: `Cognitive fitness refers to the state of optimizing your brain's ability to think, learn, and remember. Just like physical fitness keeps your body strong, cognitive fitness keeps your mind sharp and agile.

Your brain works like a muscle — the more you exercise it, the stronger it becomes. This principle is rooted in neuroplasticity, the brain's remarkable ability to form new neural connections throughout life. Regular mental exercise strengthens these pathways, improving overall cognitive function.

The benefits of maintaining cognitive fitness are profound: enhanced memory retention, faster processing speed, improved focus and concentration, better problem-solving abilities, and increased mental resilience. Whether you're a student, professional, or retiree, investing in your cognitive health pays dividends in every area of life.`,
    videoUrl: "https://www.youtube.com/embed/5MuIMqhT8DM",
    readTime: "~3 min read"
  },
  {
    id: "2",
    title: "Memory Systems and Enhancement",
    content: `Memory isn't a single system but a complex network of processes working together. Understanding how memory works is the first step to improving it.

Short-term memory holds information for about 15-30 seconds, like remembering a phone number just long enough to dial it. Working memory, closely related, allows you to manipulate this information — essential for tasks like mental math or following complex instructions. Long-term memory stores information for extended periods, from hours to a lifetime.

Proven techniques to enhance memory include chunking (grouping information into meaningful units), spaced repetition (reviewing material at increasing intervals), elaborative encoding (connecting new information to existing knowledge), and visualization (creating mental images). Regular practice with memory exercises can significantly expand your working memory capacity and improve recall speed.`,
    videoUrl: "https://www.youtube.com/embed/mh5uEqPvuq0",
    readTime: "~4 min read"
  },
  {
    id: "3",
    title: "The Science of Focus and Attention",
    content: `In our hyper-connected world, the ability to focus has become both increasingly difficult and increasingly valuable. Understanding how attention works can help you reclaim control over your concentration.

Attention comes in several forms: sustained attention (maintaining focus over time), selective attention (filtering out distractions to focus on what matters), and divided attention (managing multiple tasks). The prefrontal cortex, your brain's command center, plays a crucial role in directing and maintaining attention.

Common focus killers include digital notifications, environmental noise, mental fatigue, and stress. Strategies to improve focus include eliminating distractions before starting tasks, taking regular breaks (the Pomodoro technique), practicing mindfulness meditation, prioritizing adequate sleep, and gradually building your attention stamina through focused practice sessions.`,
    videoUrl: "https://www.youtube.com/embed/4O2JK_94g3Y",
    readTime: "~3 min read"
  },
  {
    id: "4",
    title: "Processing Speed and Mental Agility",
    content: `Processing speed refers to how quickly your brain can take in information, make sense of it, and respond appropriately. It's a fundamental cognitive ability that influences nearly every mental task you perform.

Mental agility — the ability to think quickly and adapt to new situations — is closely tied to processing speed. Together, they determine how efficiently you can learn new skills, make decisions under pressure, and respond to unexpected challenges.

Several factors influence processing speed: the quality of myelin (insulation around nerve fibers), neural efficiency, neurotransmitter function, and overall brain health. While processing speed naturally peaks in your mid-20s, research shows it can be maintained and even improved through targeted training, regular physical exercise, quality sleep, and proper nutrition including omega-3 fatty acids and antioxidants.`,
    videoUrl: "https://www.youtube.com/embed/ZwEquW_Yij0",
    readTime: "~3 min read"
  },
  {
    id: "5",
    title: "Neuroplasticity and Brain Health",
    content: `Neuroplasticity is perhaps the most exciting discovery in modern neuroscience — your brain can change and adapt throughout your entire life. This means it's never too late to improve your cognitive abilities.

The brain changes through several mechanisms: synaptic plasticity strengthens existing connections, neurogenesis creates new neurons (especially in the hippocampus, the memory center), and cortical remapping reorganizes brain regions based on how they're used. Every time you learn something new, you're physically changing your brain's structure.

Lifestyle factors significantly impact brain health and neuroplasticity. Regular aerobic exercise increases BDNF (brain-derived neurotrophic factor), which promotes neuron growth. Quality sleep allows the brain to consolidate memories and clear metabolic waste. A Mediterranean-style diet rich in vegetables, healthy fats, and lean proteins provides essential nutrients. Social engagement and continued learning keep neural pathways active and growing.`,
    videoUrl: "https://www.youtube.com/embed/GF-23wDfvt0",
    readTime: "~4 min read"
  },
  {
    id: "6",
    title: "Psychology of Cognitive Training",
    content: `The psychological aspects of brain training are just as important as the exercises themselves. Understanding motivation, habit formation, and mental wellness can dramatically improve your training outcomes.

Motivation comes in two forms: extrinsic (rewards, achievements, competition) and intrinsic (personal growth, curiosity, mastery). While external rewards can kickstart a habit, lasting engagement requires developing internal motivation. Setting clear, achievable goals and tracking progress helps maintain both types of motivation.

Habit formation follows a predictable pattern: cue, routine, reward. To make cognitive training stick, link it to an existing habit (like morning coffee), keep sessions short and consistent, and celebrate small wins. The psychological benefits extend beyond cognitive improvement — regular mental exercise reduces anxiety, boosts mood, increases self-efficacy, and provides a sense of accomplishment that enhances overall well-being.`,
    videoUrl: "https://www.youtube.com/embed/v34NqCbAA1c",
    readTime: "~3 min read"
  }
];

const Learn = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="min-h-screen p-6 pb-20 ml-0 md:ml-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className={`w-8 h-8 ${isDarkMode ? "text-[#0FA3A3]" : "text-[#0FA3A3]"}`} />
            <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Knowledge Library
            </h1>
          </div>
          <p className={`${isDarkMode ? "text-white/60" : "text-gray-600"}`}>
            Explore the science behind cognitive training with articles and video lessons
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className={`overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                isDarkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/[0.07]"
                  : "bg-white border-gray-200 shadow-sm hover:shadow-lg"
              }`}
            >
              <CardContent className="p-6">
                {/* Title and Reading Time */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className={`text-xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {article.title}
                  </h2>
                  <Badge 
                    className="shrink-0 bg-[#0FA3A3]/10 text-[#0FA3A3] hover:bg-[#0FA3A3]/20 border-0"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </Badge>
                </div>

                {/* Article Content */}
                <div className={`text-sm leading-relaxed mb-4 space-y-3 ${
                  isDarkMode ? "text-white/70" : "text-gray-600"
                }`}>
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Divider */}
                <div className={`border-t my-4 ${
                  isDarkMode ? "border-white/10" : "border-gray-200"
                }`} />

                {/* Video Section */}
                <div>
                  <div className={`flex items-center gap-2 mb-3 text-sm font-medium ${
                    isDarkMode ? "text-white/80" : "text-gray-700"
                  }`}>
                    <Video className="w-4 h-4 text-[#0FA3A3]" />
                    Watch Related Video
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={article.videoUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                      title={article.title}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
