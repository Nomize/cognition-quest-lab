import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Zap } from "lucide-react";

interface CircleTarget {
  id: number;
  color: "green" | "red";
  x: number;
  y: number;
  clickTime?: number;
}

const SpeedQuest = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<"idle" | "ready" | "playing" | "finished">("idle");
  const [currentTarget, setCurrentTarget] = useState<CircleTarget | null>(null);
  const [targetIndex, setTargetIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [appearTime, setAppearTime] = useState(0);
  const [fastestClick, setFastestClick] = useState<number | null>(null);

  const totalTargets = 20;
  const greenCount = 15;

  const generateTarget = (index: number): CircleTarget => {
    return {
      id: index,
      color: index < greenCount ? "green" : "red",
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 20,
    };
  };

  const startGame = () => {
    setGameState("ready");
    setScore(0);
    setCorrectClicks(0);
    setReactionTimes([]);
    setFastestClick(null);
    setTargetIndex(0);

    setTimeout(() => {
      setGameState("playing");
      showNextTarget(0);
    }, 2000);
  };

  const showNextTarget = (index: number) => {
    if (index >= totalTargets) {
      finishGame();
      return;
    }

    const delay = Math.random() * 1000 + 500;
    
    setTimeout(() => {
      const target = generateTarget(index);
      setCurrentTarget(target);
      setAppearTime(Date.now());
    }, delay);
  };

  const handleTargetClick = () => {
    if (!currentTarget || gameState !== "playing") return;

    const reactionTime = Date.now() - appearTime;
    
    if (currentTarget.color === "green") {
      setScore((prev) => prev + 10);
      setCorrectClicks((prev) => prev + 1);
      setReactionTimes((prev) => [...prev, reactionTime]);
      setFastestClick((prev) => prev === null ? reactionTime : Math.min(prev, reactionTime));
    } else {
      setScore((prev) => Math.max(0, prev - 15));
      toast.error("Wrong! That was a red circle!");
    }

    setCurrentTarget(null);
    setTargetIndex((prev) => prev + 1);
    showNextTarget(targetIndex + 1);
  };

  const handleMissClick = () => {
    if (gameState === "playing" && currentTarget?.color === "red") {
      setScore((prev) => prev + 5);
      setCurrentTarget(null);
      setTargetIndex((prev) => prev + 1);
      showNextTarget(targetIndex + 1);
    }
  };

  const finishGame = async () => {
    setGameState("finished");
    
    const avgReactionTime = reactionTimes.length > 0 
      ? Math.floor(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
      : 0;
    
    const bonusXP = avgReactionTime < 300 ? 50 : 0;
    const accuracy = (correctClicks / greenCount) * 100;
    const xpEarned = Math.floor((score + bonusXP) * 1.5);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("quest_results").insert({
          user_id: user.id,
          quest_type: "speed",
          accuracy: accuracy,
          score: score + bonusXP,
          xp_earned: xpEarned,
          items_completed: correctClicks,
          reaction_time: avgReactionTime,
        });

        const { data: profile } = await supabase
          .from("profiles")
          .select("xp_points, speed_score")
          .eq("id", user.id)
          .single();

        if (profile) {
          await supabase
            .from("profiles")
            .update({
              xp_points: profile.xp_points + xpEarned,
              speed_score: Math.min(100, (profile.speed_score || 0) + 3),
            })
            .eq("id", user.id);
        }
      }
    } catch (error) {
      console.error("Error saving quest result:", error);
    }
  };

  const avgReactionTime = reactionTimes.length > 0 
    ? Math.floor(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
    : 0;

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
              <CardTitle className="text-speed">Speed Quest</CardTitle>
              {gameState === "playing" && (
                <div className="text-xl font-bold">{targetIndex}/{totalTargets}</div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {gameState === "idle" && (
              <div className="text-center space-y-6 py-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Test Your Reflexes</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Click the <span className="font-bold text-calm">GREEN</span> circles as fast as you can. 
                    Avoid the <span className="font-bold text-focus">RED</span> ones!
                  </p>
                </div>
                <Button size="lg" onClick={startGame} className="bg-speed hover:bg-speed/90 text-foreground">
                  Start Quest
                </Button>
              </div>
            )}

            {gameState === "ready" && (
              <div className="text-center py-20">
                <h3 className="text-3xl font-bold animate-pulse">Get Ready...</h3>
              </div>
            )}

            {gameState === "playing" && (
              <div 
                className="relative bg-muted rounded-lg h-96 cursor-pointer"
                onClick={handleMissClick}
              >
                {currentTarget && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTargetClick();
                    }}
                    className={`absolute w-16 h-16 rounded-full transition-transform hover:scale-110 shadow-lg ${
                      currentTarget.color === "green" ? "bg-calm" : "bg-focus"
                    }`}
                    style={{
                      left: `${currentTarget.x}%`,
                      top: `${currentTarget.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </div>
            )}

            {gameState === "finished" && (
              <div className="text-center space-y-6 py-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-speed">Quest Complete! ⚡</h3>
                  <div className="text-5xl font-bold text-primary my-4">
                    +{Math.floor((score + (avgReactionTime < 300 ? 50 : 0)) * 1.5)} XP
                  </div>
                  {avgReactionTime < 300 && (
                    <p className="text-lg text-speed font-semibold">
                      🎉 Speed Bonus: +50 XP for sub-300ms average!
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">{avgReactionTime}ms</div>
                      <div className="text-sm text-muted-foreground">Avg Reaction</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">{correctClicks}/{greenCount}</div>
                      <div className="text-sm text-muted-foreground">Correct</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold flex items-center justify-center gap-1">
                        {fastestClick}ms <Zap className="w-4 h-4 text-speed" />
                      </div>
                      <div className="text-sm text-muted-foreground">Fastest</div>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-muted-foreground">Lightning reflexes!</p>

                <div className="flex gap-4 justify-center">
                  <Button onClick={startGame} className="bg-speed hover:bg-speed/90 text-foreground">
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

export default SpeedQuest;
