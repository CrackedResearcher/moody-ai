"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { logMood } from "@/app/server/actions/moodLogger";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

const emotions = [
  { emoji: "😁", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "🤗", label: "Excited" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😤", label: "Stressed" },
  { emoji: "😐", label: "Neutral" },
];

const activities = [
  "Exercise",
  "Work",
  "Social",
  "Family",
  "Sleep",
  "Reading",
  "Meditation",
  "Entertainment",
  "Outdoors",
  "Creative",
];

export function MoodInput() {
  const [step, setStep] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [moodScore, setMoodScore] = useState(5);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [logSuccess, setLogSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLog = async () => {
    try {
      setIsSubmitting(true);
      const res = await logMood({
        emotion: selectedEmotion,
        moodScore: moodScore,
        activities: selectedActivities,
      });
      if (res.success) {
        setLogSuccess(true);
      } else {
        toast.error(res.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (logSuccess) {
      const timer = setTimeout(() => {
        setLogSuccess(false);
        setStep(1);
        setSelectedEmotion("");
        setMoodScore(5);
        setSelectedActivities([]);
      }, 5500);

      return () => clearTimeout(timer);
    }
  }, [logSuccess]);

  return (
    <Card className="w-full max-w-2xl text-sans">
      <CardContent className="p-6">
        {!logSuccess ? (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">How are you feeling?</h3>
                <div className="grid grid-cols-4 gap-4">
                  {emotions.map((emotion) => (
                    <Button
                      key={emotion.label}
                      variant={
                        selectedEmotion === emotion.label
                          ? "default"
                          : "outline"
                      }
                      className={`h-20 flex flex-col gap-2 transition-all duration-200 ${
                        selectedEmotion === emotion.label
                          ? "bg-white/20 backdrop-blur-md border-purple-500/50 shadow-lg hover:bg-white/20"
                          : "hover:bg-white/10"
                      }`}
                      onClick={() => setSelectedEmotion(emotion.label)}
                    >
                      <span className="text-2xl">{emotion.emoji}</span>
                      <span
                        className={`text-sm ${
                          selectedEmotion === emotion.label
                            ? "text-white/90"
                            : ""
                        }`}
                      >
                        {emotion.label}
                      </span>
                    </Button>
                  ))}
                </div>
                <Button
                  className={`px-8 py-2 w-full rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 ${
                    !selectedEmotion ? "!opacity-90" : "hover:bg-slate-600"
                  }`}
                  onClick={() => setStep(2)}
                  disabled={!selectedEmotion}
                >
                  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                  <span className="relative z-20">Next</span>
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rate your mood (1-10)</h3>
                <Slider
                  value={[moodScore]}
                  onValueChange={(value) => setMoodScore(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="my-6"
                />
                <div className="text-center text-2xl font-bold">
                  {moodScore}
                </div>
                <Button
                  className={`px-8 py-2 w-full rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 ${
                    !moodScore ? "!opacity-90" : "hover:bg-slate-600"
                  }`}
                  disabled={!moodScore}
                  onClick={() => setStep(3)}
                >
                  Next
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  What have you been up to?
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activities.map((activity) => (
                    <Badge
                      key={activity}
                      variant={
                        selectedActivities.includes(activity)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedActivities((prev) =>
                          prev.includes(activity)
                            ? prev.filter((a) => a !== activity)
                            : [...prev, activity]
                        );
                      }}
                    >
                      {activity}
                    </Badge>
                  ))}
                </div>
                <Textarea
                  placeholder="Tell me more about your day..."
                  className="mt-4"
                />
                <Button
                  className={`px-8 py-2 w-full rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 ${
                    selectedActivities.length === 0
                      ? "!opacity-90"
                      : "hover:bg-slate-600"
                  }`}
                  disabled={selectedActivities.length === 0 || isSubmitting}
                  onClick={handleLog}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save Entry"
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
                <CheckCircle className="h-16 w-16 text-green-500 relative z-10" />
              </div>
              <h3 className="text-xl font-medium text-green-500">
                Mood Logged Successfully!
              </h3>
              <p className="text-sm text-muted-foreground">
                Thank you for sharing how you're feeling today
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
