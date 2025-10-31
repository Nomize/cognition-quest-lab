import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Check, X } from "lucide-react";

type Color = "red" | "blue" | "green" | "yellow";

const MemoryQuest = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<"idle" | "showing" | "recall" | "feedback" | "finished">("idle");
  const [currentRound, setCurrentRound] = useState(1);
  const [sequence, setSequence] = useState<Color[]>([]);
  const [userSequence, setUserSequence] = useState<Color[]>([]);
  const [score, setScore] = useState(0);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [longestSequence, setLongestSequence] = useState(0);
  const [roundResult, setRoundResult] = useState<"correct" | "wrong" | null>(null);

  const colors: Color[] = ["red", "blue", "green", "yellow"];
  const totalRounds = 5;

  const colorMap = {
    red: "bg-focus",
    blue: "bg-primary",
    green: "bg-calm",
    yellow: "bg-speed",
  };

  const generateSequence = (length: number): Color[] => {
    return Array.from({ length }, () => colors[Math.floor(Math.random() * colors.length)]);
  };

  const startGame = () => {
    setGameState("showing");
    setCurrentRound(1);
    setScore(0);
    setCorrectRounds(0);
    setLongestSequence(0);
    startRound(1);
  };

  const startRound = (round: number) => {
    const sequenceLength = 2 + round;
    const newSequence = generateSequence(sequenceLength);
    setSequence(newSequence);
    setUserSequence([]);
    setRoundResult(null);
    setGameState("showing");

    setTimeout(() => {
      setGameState("recall");
    }, 2000 + sequenceLength * 500);
  };

  const handleColorClick = (color: Color) => {
    if (gameState !== "recall") return;

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    if (newUserSequence.length === sequence.length) {
      checkAnswer(newUserSequence);
    }
  };

  const checkAnswer = (userSeq: Color[]) => {
    const isCorrect = userSeq.every((color, index) => color === sequence[index]);
    
    setGameState("feedback");
    setRoundResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setCorrectRounds((prev) => prev + 1);
      setScore((prev) => prev + 20);
      setLongestSequence((prev) => Math.max(prev, sequence.length));
      toast.success("Perfect! +20 XP");
    } else {
      setScore((prev) => prev + 5);
      toast.error("Not quite right. +5 XP for trying!");
    }

    setTimeout(() => {
      if (currentRound < totalRounds) {
        setCurrentRound((prev) => prev + 1);
        startRound(currentRound + 1);
      } else {
        finishGame();
      }
    }, 2500);
  };

  const finishGame = async () => {
    setGameState("finished");
    
    const accuracy = (correctRounds / totalRounds) * 100;
    const xpEarned = Math.floor(score * 1.5);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("quest_results").insert({
          user_id: user.id,
          quest_type: "memory",
          accuracy: accuracy,
          score: score,
          xp_earned: xpEarned,
          items_completed: correctRounds,
        });

        const { data: profile } = await supabase
          .from("profiles")
          .select("xp_points, memory_score")
          .eq("id", user.id)
          .single();

        if (profile) {
          await supabase
            .from("profiles")
            .update({
              xp_points: profile.xp_points + xpEarned,
              memory_score: Math.min(100, (profile.memory_score || 0) + 3),
            })
            .eq("id", user.id);
        }
      }
    } catch (error) {
      console.error("Error saving quest result:", error);
    }
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
              <CardTitle className="text-memory">Memory Quest</CardTitle>
              {gameState !== "idle" && gameState !== "finished" && (
                <div className="text-xl font-bold">Round {currentRound}/{totalRounds}</div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {gameState === "idle" && (
              <div className="text-center space-y-6 py-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Train Your Memory</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Watch the sequence of colors, then repeat it back. Sequences get longer each round!
                  </p>
                </div>
                <Button size="lg" onClick={startGame} className="bg-memory hover:bg-memory/90">
                  Start Quest
                </Button>
              </div>
            )}

            {(gameState === "showing" || gameState === "recall") && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg font-medium mb-4">
                    {gameState === "showing" ? "Watch the sequence..." : "Now repeat it!"}
                  </p>
                  <div className="flex justify-center gap-3 mb-6 min-h-[80px] items-center">
                    {gameState === "showing" && sequence.map((color, index) => (
                      <div
                        key={index}
                        className={`w-16 h-16 rounded-full ${colorMap[color]} transition-all duration-300`}
                        style={{
                          animation: `pulse 0.5s ease-in-out ${index * 0.5}s`,
                        }}
                      />
                    ))}
                    {gameState === "recall" && userSequence.map((color, index) => (
                      <div
                        key={index}
                        className={`w-16 h-16 rounded-full ${colorMap[color]}`}
                      />
                    ))}
                  </div>
                </div>

                {gameState === "recall" && (
                  <div className="flex justify-center gap-4">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorClick(color)}
                        className={`w-20 h-20 rounded-full ${colorMap[color]} hover:scale-110 transition-transform shadow-lg`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {gameState === "feedback" && (
              <div className="text-center space-y-4 py-8">
                {roundResult === "correct" ? (
                  <>
                    <Check className="w-16 h-16 text-calm mx-auto" />
                    <h3 className="text-2xl font-bold text-calm">Perfect! +20 XP</h3>
                  </>
                ) : (
                  <>
                    <X className="w-16 h-16 text-destructive mx-auto" />
                    <h3 className="text-2xl font-bold text-destructive">Not quite!</h3>
                    <p className="text-muted-foreground">The sequence was:</p>
                    <div className="flex justify-center gap-2">
                      {sequence.map((color, index) => (
                        <div key={index} className={`w-12 h-12 rounded-full ${colorMap[color]}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {gameState === "finished" && (
              <div className="text-center space-y-6 py-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-memory">Quest Complete! 🎉</h3>
                  <div className="text-5xl font-bold text-primary my-4">
                    +{Math.floor(score * 1.5)} XP
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">{correctRounds}/{totalRounds}</div>
                      <div className="text-sm text-muted-foreground">Rounds Correct</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">{longestSequence}</div>
                      <div className="text-sm text-muted-foreground">Longest Sequence</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold">
                        {((correctRounds / totalRounds) * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-muted-foreground">Your memory is improving!</p>

                <div className="flex gap-4 justify-center">
                  <Button onClick={startGame} className="bg-memory hover:bg-memory/90">
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

export default MemoryQuest;
