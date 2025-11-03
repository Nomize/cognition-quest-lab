import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Zap } from "lucide-react";
import { calculateLevel } from "@/utils/levelSystem";
import { useSound } from "@/hooks/useSound";
import { Progress } from "@/components/ui/progress";

interface Circle {
  id: number;
  color: "green" | "red" | "blue" | "yellow" | "purple";
  x: number;
  y: number;
  createdAt: number;
}

const SpeedQuest = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();
  const [gameState, setGameState] = useState<"idle" | "ready" | "playing" | "finished">("idle");
  const [circles, setCircles] = useState<Circle[]>([]);
  const [score, setScore] = useState(0);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [missedGreen, setMissedGreen] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [fastestClick, setFastestClick] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(40);
  const nextCircleId = useRef(0);

  const GAME_DURATION = 40; // 40 seconds
  const CIRCLE_LIFETIME = 1500; // 1.5 seconds before disappearing

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      finishGame();
    }
  }, [timeLeft, gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;

    // Spawn circles at random intervals
    const spawnInterval = setInterval(() => {
      spawnCircle();
    }, Math.random() * 500 + 500); // 0.5-1 second

    return () => clearInterval(spawnInterval);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;

    // Remove old circles
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setCircles((prev) => {
        const remaining = prev.filter((circle) => {
          const age = now - circle.createdAt;
          if (age > CIRCLE_LIFETIME && circle.color === "green") {
            setMissedGreen((m) => m + 1);
            setScore((s) => Math.max(0, s - 5));
            setCombo(0);
            return false;
          }
          return age < CIRCLE_LIFETIME;
        });
        return remaining;
      });
    }, 100);

    return () => clearInterval(cleanupInterval);
  }, [gameState]);

  const spawnCircle = () => {
    // 60% green, 40% other colors
    const colors: ("green" | "red" | "blue" | "yellow" | "purple")[] = [
      "green", "green", "green", "green", "green", "green",
      "red", "blue", "yellow", "purple"
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const circle: Circle = {
      id: nextCircleId.current++,
      color,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      createdAt: Date.now(),
    };

    setCircles((prev) => [...prev, circle]);
  };

  const startGame = () => {
    setGameState("ready");
    setScore(0);
    setCorrectClicks(0);
    setWrongClicks(0);
    setMissedGreen(0);
    setCombo(0);
    setMaxCombo(0);
    setReactionTimes([]);
    setFastestClick(null);
    setCircles([]);
    setTimeLeft(GAME_DURATION);
    nextCircleId.current = 0;

    setTimeout(() => {
      setGameState("playing");
    }, 2000);
  };

  const handleCircleClick = (circle: Circle) => {
    if (gameState !== "playing") return;

    const reactionTime = Date.now() - circle.createdAt;

    if (circle.color === "green") {
      playSound("correct");
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(Math.max(maxCombo, newCombo));
      
      let points = 10;
      if (newCombo >= 5) {
        points = 20; // 2x multiplier
        if (newCombo === 5) toast.success("5x Combo! 2x Points!");
      }
      
      setScore((prev) => prev + points);
      setCorrectClicks((prev) => prev + 1);
      setReactionTimes((prev) => [...prev, reactionTime]);
      setFastestClick((prev) => (prev === null ? reactionTime : Math.min(prev, reactionTime)));
    } else {
      playSound("wrong");
      setScore((prev) => Math.max(0, prev - 10));
      setWrongClicks((prev) => prev + 1);
      setCombo(0);
      toast.error(`Wrong! Avoid ${circle.color}!`);
    }

    setCircles((prev) => prev.filter((c) => c.id !== circle.id));
  };

  const finishGame = async () => {
    setGameState("finished");
    playSound("questComplete");

    const accuracy = correctClicks / (correctClicks + wrongClicks + missedGreen) * 100 || 0;
    const avgReaction = reactionTimes.length > 0
      ? reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length
      : 0;
    const xpEarned = Math.floor(score * 1.2) + (maxCombo >= 5 ? 50 : 0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("quest_results").insert({
          user_id: user.id,
          quest_type: "speed",
          accuracy: accuracy,
          score: score,
          xp_earned: xpEarned,
          items_completed: correctClicks,
        });

        const { data: profile } = await supabase
          .from("profiles")
          .select("xp_points, speed_score, current_level")
          .eq("id", user.id)
          .single();

        if (profile) {
          const newXP = profile.xp_points + xpEarned;
          const newLevel = calculateLevel(newXP);
          const leveledUp = newLevel > (profile.current_level || 1);

          if (leveledUp) {
            playSound("levelUp");
          }

          await supabase
            .from("profiles")
            .update({
              xp_points: newXP,
              current_level: newLevel,
              speed_score: Math.min(100, (profile.speed_score || 0) + 3),
            })
            .eq("id", user.id);
        }
      }
    } catch (error) {
      console.error("Error saving quest result:", error);
    }
  };

  const getColorClass = (color: Circle["color"]) => {
    switch (color) {
      case "green": return "bg-calm";
      case "red": return "bg-focus";
      case "blue": return "bg-primary";
      case "yellow": return "bg-speed";
      case "purple": return "bg-memory";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        <Button variant="ghost" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-speed flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Speed Quest
              </CardTitle>
              {gameState === "playing" && (
                <div className="text-right">
                  <div className="text-2xl font-bold">{timeLeft}s</div>
                  <div className="text-sm text-muted-foreground">Combo: {combo}x</div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {gameState === "idle" && (
              <div className="text-center space-y-6 py-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Test Your Reflexes</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Click GREEN circles as fast as you can! Avoid red, blue, yellow, and purple circles.
                  </p>
                  <div className="p-4 bg-accent rounded-lg max-w-sm mx-auto">
                    <p className="font-medium">Rules:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                      <li>✓ Green circles: +10 points</li>
                      <li>✗ Wrong color: -10 points</li>
                      <li>✗ Miss green: -5 points</li>
                      <li>⚡ 5+ combo: 2x points!</li>
                      <li>⏱ 40 seconds total</li>
                    </ul>
                  </div>
                </div>
                <Button size="lg" onClick={startGame} className="bg-speed hover:bg-speed/90">
                  Start Quest
                </Button>
              </div>
            )}

            {gameState === "ready" && (
              <div className="text-center py-20">
                <div className="text-6xl font-bold animate-pulse">Get Ready...</div>
              </div>
            )}

            {gameState === "playing" && (
              <div className="space-y-4">
                <Progress value={(timeLeft / GAME_DURATION) * 100} />
                <div className="text-sm text-center flex justify-around">
                  <span>Score: <strong>{score}</strong></span>
                  <span>Correct: <strong className="text-calm">{correctClicks}</strong></span>
                  <span>Wrong: <strong className="text-destructive">{wrongClicks}</strong></span>
                  <span>Missed: <strong className="text-warning">{missedGreen}</strong></span>
                </div>
                <div
                  className="relative bg-muted rounded-lg"
                  style={{ height: "500px" }}
                >
                  {circles.map((circle) => (
                    <button
                      key={circle.id}
                      onClick={() => handleCircleClick(circle)}
                      className={`absolute w-16 h-16 rounded-full ${getColorClass(circle.color)} hover:scale-110 transition-transform shadow-lg cursor-pointer`}
                      style={{
                        left: `${circle.x}%`,
                        top: `${circle.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {gameState === "finished" && (
              <div className="text-center space-y-6 py-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-speed">Quest Complete! ⚡</h3>
                  <div className="text-5xl font-bold text-primary my-4">
                    +{Math.floor(score * 1.2) + (maxCombo >= 5 ? 50 : 0)} XP
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">{correctClicks}</div>
                      <div className="text-sm text-muted-foreground">Correct Clicks</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {reactionTimes.length > 0
                          ? Math.round(reactionTimes.reduce((a, b) => a + b) / reactionTimes.length)
                          : 0}ms
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Reaction</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">{fastestClick || 0}ms</div>
                      <div className="text-sm text-muted-foreground">Fastest</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">{maxCombo}x</div>
                      <div className="text-sm text-muted-foreground">Best Combo</div>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-muted-foreground">Your reflexes are getting sharper!</p>

                <div className="flex gap-4 justify-center">
                  <Button onClick={startGame} className="bg-speed hover:bg-speed/90">
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
