import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { Brain, Target, Zap, MemoryStick, Shuffle, Heart, BookOpen, Lightbulb, TrendingUp } from "lucide-react";

const Learn = () => {
  const navigate = useNavigate();

  const quests = [
    {
      icon: Target,
      title: "Focus Quest",
      color: "text-focus",
      bgColor: "bg-focus/10",
      trains: "Selective attention & visual processing",
      benefits: [
        "Better concentration at work and study",
        "Reduced susceptibility to distractions",
        "Improved task completion efficiency",
        "Enhanced visual search abilities"
      ],
      psychology: "Based on the visual search paradigm and sustained attention research. Trains the brain's attentional control networks.",
      tips: "Scan systematically rather than randomly. Don't rush - accuracy matters more than speed at first.",
      route: "/quest/focus"
    },
    {
      icon: MemoryStick,
      title: "Memory Quest",
      color: "text-memory",
      bgColor: "bg-memory/10",
      trains: "Working memory & sequential recall",
      benefits: [
        "Remember names and faces better",
        "Follow multi-step instructions easily",
        "Enhanced multitasking ability",
        "Improved learning capacity"
      ],
      psychology: "Utilizes chunking and memory consolidation principles. Strengthens the prefrontal cortex and hippocampal connections.",
      tips: "Group patterns into chunks. Use visualization techniques to create memorable associations.",
      route: "/quest/memory"
    },
    {
      icon: Zap,
      title: "Speed Quest",
      color: "text-speed",
      bgColor: "bg-speed/10",
      trains: "Processing speed & reaction time",
      benefits: [
        "Faster decision-making in daily life",
        "Better reflexes and coordination",
        "Enhanced mental agility",
        "Improved impulse control"
      ],
      psychology: "Based on Go/No-Go tasks used in cognitive research. Trains response inhibition and rapid processing.",
      tips: "Stay relaxed but alert. Anticipate patterns rather than just reacting.",
      route: "/quest/speed"
    },
    {
      icon: Shuffle,
      title: "Brain Switch Quest",
      color: "text-switch",
      bgColor: "bg-switch/10",
      trains: "Cognitive flexibility & executive function",
      benefits: [
        "Adapt to change more easily",
        "Switch between tasks efficiently",
        "Reduced mental rigidity",
        "Better problem-solving from multiple angles"
      ],
      psychology: "Demonstrates task-switching costs and mental set-shifting. Trains executive control in the prefrontal cortex.",
      tips: "Focus on the current rule, not the stimulus. Reset your mindset quickly when rules change.",
      route: "/quest/switch"
    },
    {
      icon: Heart,
      title: "Calm Quest",
      color: "text-calm",
      bgColor: "bg-calm/10",
      trains: "Emotional regulation & stress management",
      benefits: [
        "Reduced anxiety and stress",
        "Better sleep quality",
        "Improved mental clarity",
        "Enhanced emotional balance"
      ],
      psychology: "Activates the parasympathetic nervous system through controlled breathing. Evidence-based mindfulness practice.",
      tips: "Practice daily, ideally at the same time. Focus on smooth, natural breath rhythm.",
      route: "/quest/calm"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to see improvements?",
      answer: "Most users notice improvements in 2-4 weeks of consistent daily practice. Cognitive changes take time as your brain forms new neural pathways. The key is consistency - even 10 minutes per day is more effective than occasional longer sessions."
    },
    {
      question: "How often should I train?",
      answer: "We recommend 10-20 minutes of daily practice, mixing different quest types. Your brain needs both stimulation and rest, so avoid overtraining. Quality matters more than quantity."
    },
    {
      question: "Are the improvements permanent?",
      answer: "Like physical fitness, cognitive gains require maintenance. Regular practice maintains improvements, while extended breaks may lead to some decline. Think of it as 'use it or lose it' for your brain."
    },
    {
      question: "Which quest should I start with?",
      answer: "Begin with quests that match your goals. For focus improvement, try Focus Quest. For memory, start with Memory Quest. Calm Quest is great for everyone as a foundation for stress management."
    },
    {
      question: "Is this scientifically validated?",
      answer: "Our exercises are based on established cognitive psychology research, including visual search tasks, working memory paradigms, and mindfulness-based stress reduction techniques used in research settings."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4">
            <Brain className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">The Science Behind Cognitive Training</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how each quest trains specific cognitive abilities and the neuroscience that makes it work
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12 space-y-16">
        {/* What is Neuroplasticity */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Understanding Neuroplasticity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Your brain is constantly rewiring itself based on what you do. This is called <strong>neuroplasticity</strong> - 
              the brain's ability to form new neural connections throughout life.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When you practice cognitive exercises, you're literally strengthening neural pathways, similar to how 
              lifting weights builds muscle. The more you train specific cognitive skills, the more efficient 
              those brain networks become.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Expected Timeline:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Week 1-2: Building the habit, baseline performance</li>
                <li>• Week 3-4: Noticeable improvements in task performance</li>
                <li>• Month 2-3: Real-world cognitive benefits become apparent</li>
                <li>• Month 3+: Sustained improvements with continued practice</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Quest Deep Dives */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Quest Deep Dives</h2>
          </div>

          {quests.map((quest, index) => {
            const Icon = quest.icon;
            return (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-2 ${quest.bgColor.replace('/10', '')}`} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 ${quest.bgColor} rounded-xl`}>
                        <Icon className={`w-8 h-8 ${quest.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{quest.title}</CardTitle>
                        <p className={`text-sm font-semibold ${quest.color} mt-1`}>
                          Trains: {quest.trains}
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => navigate(quest.route)} size="sm">
                      Try Quest
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="benefits">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Real-World Benefits
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 ml-6">
                          {quest.benefits.map((benefit, i) => (
                            <li key={i} className="text-muted-foreground">• {benefit}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="psychology">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          The Psychology Behind It
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{quest.psychology}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tips">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Tips to Improve
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{quest.tips}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Best Practices */}
        <Card className="bg-gradient-to-br from-primary/5 to-background">
          <CardHeader>
            <CardTitle className="text-2xl">Daily Tips & Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="text-2xl">🌅</span> Optimal Training Times
                </h4>
                <p className="text-sm text-muted-foreground">
                  Morning: Best for focus and speed quests. Evening: Ideal for calm quest before bed.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="text-2xl">📊</span> Consistency Over Intensity
                </h4>
                <p className="text-sm text-muted-foreground">
                  10 minutes daily beats 70 minutes once a week. Build a sustainable habit.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="text-2xl">🎯</span> Mix Your Training
                </h4>
                <p className="text-sm text-muted-foreground">
                  Vary quest types to train all cognitive abilities. Don't focus on just one area.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="text-2xl">😴</span> Rest is Essential
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your brain consolidates learning during sleep. Aim for 7-8 hours per night.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-focus/10 border-2">
          <CardContent className="text-center py-12">
            <Brain className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Ready to Start Training?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Choose a quest that matches your goals and start your cognitive training journey today.
            </p>
            <Button size="lg" onClick={() => navigate("/quests")}>
              View All Quests
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Learn;
