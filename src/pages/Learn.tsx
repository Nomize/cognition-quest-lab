import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Target, Zap, BookOpen, RefreshCw, Heart } from "lucide-react";

const Learn = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Learn About Brain Training</h1>
          <p className="text-muted-foreground">
            Understand the science behind each quest and how it improves your cognitive abilities
          </p>
        </div>

        <Tabs defaultValue="science" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="switch">Brain Switch</TabsTrigger>
            <TabsTrigger value="calm">Calm</TabsTrigger>
          </TabsList>

          <TabsContent value="science" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  The Science Behind Brain Training
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Neuroplasticity</h3>
                  <p className="text-muted-foreground">
                    Your brain has the remarkable ability to reorganize itself by forming new neural connections throughout life. This is called neuroplasticity. Regular cognitive training exercises help strengthen these connections, much like physical exercise strengthens muscles.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Research-Backed Benefits</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Improved working memory and attention span</li>
                    <li>Faster processing speed and reaction time</li>
                    <li>Enhanced cognitive flexibility and problem-solving</li>
                    <li>Better stress management and emotional regulation</li>
                    <li>Reduced cognitive decline with age</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Expected Timeline</h3>
                  <p className="text-muted-foreground">
                    Most people notice improvements within 2-4 weeks of consistent practice (15-20 minutes daily). Significant changes typically occur after 8-12 weeks. The key is consistency over intensity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="focus" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-focus" />
                  Focus Quest
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">What It Trains</h3>
                  <p className="text-muted-foreground">
                    Selective attention, sustained attention, and visual processing. This quest strengthens your ability to filter out distractions and maintain focus on relevant information.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-World Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Better concentration during work or study</li>
                    <li>Fewer distractions when reading or listening</li>
                    <li>Improved ability to ignore irrelevant information</li>
                    <li>Enhanced performance in time-sensitive tasks</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Psychology Principle</h3>
                  <p className="text-muted-foreground">
                    Based on the Stroop effect and visual search tasks. These exercises activate your prefrontal cortex and anterior cingulate cortex - areas responsible for attention control.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Tips to Improve</h3>
                  <p className="text-muted-foreground">
                    Scan systematically (left to right, top to bottom) rather than randomly. Don't rush - accuracy is more important than speed in building foundational focus skills.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="memory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-memory" />
                  Memory Quest
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">What It Trains</h3>
                  <p className="text-muted-foreground">
                    Working memory and sequential recall. This strengthens your ability to hold and manipulate information in your mind over short periods.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-World Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Remember names, numbers, and instructions better</li>
                    <li>Follow multi-step directions without notes</li>
                    <li>Improved multitasking abilities</li>
                    <li>Better mental math and problem-solving</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Psychology Principle</h3>
                  <p className="text-muted-foreground">
                    Based on chunking and the phonological loop. Your brain can typically hold 7±2 items in working memory. Regular practice expands this capacity.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Tips to Improve</h3>
                  <p className="text-muted-foreground">
                    Group patterns into chunks (e.g., "red-blue-green" as one unit). Use visualization - imagine the colors as objects or stories. Rehearse mentally during the pause.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="speed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-speed" />
                  Speed Quest
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">What It Trains</h3>
                  <p className="text-muted-foreground">
                    Processing speed, reaction time, and impulse control. This improves how quickly your brain can interpret and respond to information.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-World Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Faster decision-making in everyday situations</li>
                    <li>Improved reflexes and coordination</li>
                    <li>Better performance in fast-paced environments</li>
                    <li>Enhanced ability to respond under pressure</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Psychology Principle</h3>
                  <p className="text-muted-foreground">
                    Based on Go/No-Go tasks and response inhibition. Trains your brain's executive function to quickly assess and respond appropriately.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Tips to Improve</h3>
                  <p className="text-muted-foreground">
                    Stay relaxed - tension slows reaction time. Anticipate the pattern but don't guess. Focus on the center of the screen to catch peripheral targets faster.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="switch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-switch" />
                  Brain Switch Quest
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">What It Trains</h3>
                  <p className="text-muted-foreground">
                    Cognitive flexibility and executive function. This strengthens your ability to switch between different mental sets and adapt to new rules.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-World Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Adapt to changing situations more easily</li>
                    <li>Switch between tasks more efficiently</li>
                    <li>Better problem-solving with multiple approaches</li>
                    <li>Improved creativity and innovation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Psychology Principle</h3>
                  <p className="text-muted-foreground">
                    Based on task-switching costs and mental set-shifting. Your prefrontal cortex must inhibit the old rule while activating the new one.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Tips to Improve</h3>
                  <p className="text-muted-foreground">
                    Focus intently on the current rule. When it switches, take a deep breath and mentally reset. Don't let the previous rule interfere with your judgment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calm" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-calm" />
                  Calm Quest
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">What It Trains</h3>
                  <p className="text-muted-foreground">
                    Emotional regulation, stress management, and mindfulness. This activates your parasympathetic nervous system, promoting relaxation and mental clarity.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-World Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Reduced anxiety and stress levels</li>
                    <li>Improved sleep quality</li>
                    <li>Better emotional control and patience</li>
                    <li>Enhanced focus after mental fatigue</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Psychology Principle</h3>
                  <p className="text-muted-foreground">
                    Controlled breathing activates the vagus nerve, triggering the "rest and digest" response. This counteracts the stress response and promotes calmness.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Tips to Improve</h3>
                  <p className="text-muted-foreground">
                    Practice daily, ideally at the same time. Focus entirely on the breath rhythm - when your mind wanders, gently bring attention back. Evening sessions improve sleep.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;
