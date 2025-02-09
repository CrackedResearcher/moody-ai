"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Brain,
  Sparkles,
  Book,
  Coffee,
  Music,
  FootprintsIcon,
  MessageSquare,
} from "lucide-react";
import { TypingBox } from "@/components/ui/typing-box";

export default function Recommendations() {
  const placeholders = [
    "Tell me about your day...",
    "What made you smile today?",
    "Feeling stressed? Let's talk about it...",
    "Share a highlight from your day!",
    "How are you feeling right now?",
    "What's on your mind?",
    "Did something exciting happen today?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const moodBoosters = [
    { icon: Music, text: "Listen to your favorite upbeat playlist" },
    { icon: Coffee, text: "Take a mindful coffee break" },
    { icon: FootprintsIcon, text: "Go for a quick 15-minute walk" },
  ];

  const activities = [
    { icon: Book, text: "Read a chapter of your current book" },
    { icon: Brain, text: "Try a 5-minute meditation session" },
    { icon: Sparkles, text: "Practice gratitude journaling" },
  ];

  const wellnessResources = [
    {
      title: "Meditation Guide",
      description: "Basic meditation techniques for beginners",
      tag: "Mindfulness",
    },
    {
      title: "Sleep Hygiene",
      description: "Tips for better sleep quality",
      tag: "Wellness",
    },
    {
      title: "Exercise Routines",
      description: "Quick mood-boosting workouts",
      tag: "Physical",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
     <Card className="text-center text-sans">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl">Ask AI Assistant</CardTitle>
          <CardDescription className="text-md">Get personalized advice and support. Ask anything you have in your mind!</CardDescription>
          <TypingBox
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
          <div className="mt-5"></div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Today's Recommendations</CardTitle>
          <CardDescription>
            Personalized suggestions to boost your mood
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-medium mb-4">Mood Boosters</h3>
              <ul className="space-y-4">
                {moodBoosters.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-purple-500" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-medium mb-4">Activities</h3>
              <ul className="space-y-4">
                {activities.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-blue-500" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wellness Resources</CardTitle>
          <CardDescription>
            Curated content to support your well-being
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {wellnessResources.map((resource, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-4 hover:shadow-md transition-all"
              >
                <div className="text-xs font-semibold text-purple-500 mb-2">
                  {resource.tag}
                </div>
                <h4 className="font-medium mb-1">{resource.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
