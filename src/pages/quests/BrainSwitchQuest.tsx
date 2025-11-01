import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { calculateLevel } from "@/utils/levelSystem";
import { useSound } from "@/hooks/useSound";

type Rule = "number" | "color";
type Color = "blue" | "red";

interface Item {
  number: number;
  color: Color;
  shouldClick: boolean;
}

const BrainSwitchQuest = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [currentRule, setCurrentRule] = useState<Rule>("number");
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [itemIndex, setItemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [switchCount, setSwitchCount] = useState(0);
  const [appearTime, setAppearTime] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [ruleJustSwitched, setRuleJustSwitched] = useState(false);

  const totalItemCount = 20;
  const switchInterval = 4;

  const generateItem = (index: number, rule: Rule): Item => {
    const number = Math.floor(Math.random() * 9) + 1;
    const color: Color = Math.random() > 0.5 ? "blue" : "red";
    
    const shouldClick = rule === "number" 
      ? number % 2 === 0 
      : color === "blue";

    return { number, color, shouldClick };
  };

  const startGame = () => {
    setGameState("playing");
    setCurrentRule("number");
    setItemIndex(0);
    setScore(0);
    setCorrectClicks(0);
    setTotalItems(0);
    setSwitchCount(0);
    setReactionTimes([]);
    showNextItem(0, "number");
  };

  const showNextItem = (index: number, rule: Rule) => {
    if (index >= totalItemCount) {
      finishGame();
      return;
    }

    // Switch rule every 4 items
    let newRule = rule;
    if (index > 0 && index % switchInterval === 0) {
      newRule = rule === "number" ? "color" : "number";
      setCurrentRule(newRule);
      setSwitchCount((prev) => prev + 1);
      setRuleJustSwitched(true);
      toast.info(`Rule switched! Now: ${newRule === "number" ? "Click if EVEN" : "Click if BLUE"}`, {
        duration: 1500,
      });
    } else {
      setRuleJustSwitched(false);
    }

    const item = generateItem(index, newRule);
    setCurrentItem(item);
    setAppearTime(Date.now());
    setItemIndex(index);

    const autoAdvanceTimer = setTimeout(() => {
      handleNoClick();
    }, 2000);
  };

  const handleClick = () => {
    if (!currentItem || gameState !== "playing") return;

    const reactionTime = Date.now() - appearTime;
    setTotalItems((prev) => prev + 1);

    if (currentItem.shouldClick) {
      playSound('correct');
      setScore((prev) => prev + 10);
      setCorrectClicks((prev) => prev + 1);
      setReactionTimes((prev) => [...prev, reactionTime]);
    } else {
      playSound('wrong');
      setScore((prev) => Math.max(0, prev - 5));
      toast.error("Wrong! You shouldn't have clicked that one.");
    }

    setCurrentItem(null);
    setTimeout(() => showNextItem(itemIndex + 1, currentRule), 300);
  };

  const handleNoClick = () => {
    if (!currentItem || gameState !== "playing") return;

    setTotalItems((prev) => prev + 1);

    if (!currentItem.shouldClick) {
      setScore((prev) => prev + 10);
      setCorrectClicks((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(0, prev - 5));
    }

    setCurrentItem(null);
    setTimeout(() => showNextItem(itemIndex + 1, currentRule), 300);
  };

  const finishGame = async () => {
    setGameState("finished");
    playSound('questComplete');
    
    const accuracy = totalItems > 0 ? (correctClicks / totalItems) * 100 : 0;
    const avgReactionTime = reactionTimes.length > 0
      ? Math.floor(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
      : 0;
    const xpEarned = Math.floor(score * 1.5);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("quest_results").insert({
          user_id: user.id,
          quest_type: "switch",
          accuracy: accuracy,
          score: score,
          xp_earned: xpEarned,
          items_completed: correctClicks,
          reaction_time: avgReactionTime,
        });

        const { data: profile } = await supabase
          .from("profiles")
          .select("xp_points, current_level")
          .eq("id", user.id)
          .single();

        if (profile) {
          const newXP = profile.xp_points + xpEarned;
          const newLevel = calculateLevel(newXP);
          const leveledUp = newLevel > profile.current_level;

          await supabase
            .from("profiles")
            .update({
              xp_points: newXP,
              current_level: newLevel,
            })
            .eq("id", user.id);

          if (leveledUp) {
            playSound('levelUp');
            toast.success(`Level Up! You're now Level ${newLevel}!`);
          }
        }
      }
    } catch (error) {
      console.error("Error saving quest result:", error);
    }
  };

  const colorClasses = {
    blue: "text-primary",
    red: "text-focus",
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        <Button variant="ghost" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-switch">Brain Switch Quest</CardTitle>
              {gameState === "playing" && (
                <div className="text-xl font-bold">{itemIndex + 1}/{totalItemCount}</div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {gameState === "idle" && (
              <div className="text-center space-y-6 py-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Train Cognitive Flexibility</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Follow the rule at the top. The rule will switch every few items - stay sharp!
                  </p>
                  <div className="bg-muted p-4 rounded-lg max-w-sm mx-auto mt-4">
                    <p className="font-semibold mb-2">Rules:</p>
                    <p className="text-sm">📊 NUMBER: Click if the number is EVEN</p>
                    <p className="text-sm">🎨 COLOR: Click if the color is BLUE</p>
                  </div>
                </div>
                <Button size="lg" onClick={startGame} className="bg-switch hover:bg-switch/90">
                  Start Quest
                </Button>
              </div>
            )}

            {gameState === "playing" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className={`text-center p-4 rounded-lg transition-all ${
                    ruleJustSwitched ? "bg-switch/20 border-2 border-switch animate-pulse" : "bg-muted"
                  }`}>
                    <div className="flex items-center justify-center gap-2 text-xl font-bold">
                      <RefreshCw className={`w-5 h-5 ${ruleJustSwitched ? "animate-spin" : ""}`} />
                      RULE: {currentRule === "number" ? "Click if NUMBER is EVEN" : "Click if COLOR is BLUE"}
                    </div>
                  </div>
                  <Progress value={(itemIndex / totalItemCount) * 100} className="h-2" />
                </div>

                {currentItem && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <button
                      onClick={handleClick}
                      className={`text-9xl font-bold ${colorClasses[currentItem.color]} hover:scale-110 transition-transform cursor-pointer`}
                    >
                      {currentItem.number}
                    </button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Click if it matches the rule, or wait if it doesn't
                    </p>
                  </div>
                )}

                <div className="flex justify-center gap-8 text-lg">
                  <div>Score: <span className="font-bold text-switch">{score}</span></div>
                  <div>Correct: <span className="font-bold text-calm">{correctClicks}</span></div>
                </div>
              </div>
            )}

            {gameState === "finished" && (
              <div className="text-center space-y-6 py-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-switch">Quest Complete! 🧠</h3>
                  <div className="text-5xl font-bold text-primary my-4">
                    +{Math.floor(score * 1.5)} XP
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {totalItems > 0 ? ((correctClicks / totalItems) * 100).toFixed(0) : 0}%
                      </div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">{switchCount}</div>
                      <div className="text-sm text-muted-foreground">Rule Switches</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {reactionTimes.length > 0 
                          ? Math.floor(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
                          : 0}ms
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Time</div>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-muted-foreground">Your brain is becoming more flexible!</p>

                <div className="flex gap-4 justify-center">
                  <Button onClick={startGame} className="bg-switch hover:bg-switch/90">
                    Play Again
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrainSwitchQuest;
