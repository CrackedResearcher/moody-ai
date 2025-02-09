"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Area_Chart } from "@/components/ui/area-chart";
import { Bar_Chart } from "@/components/ui/bar-chart";
import { Pie_Chart } from "@/components/ui/pie-chart";

export default function Analytics() {
  // Dummy data for monthly mood trends
  const monthlyMoodData = [
    { name: "Jan", mood: 7.5 },
    { name: "Feb", mood: 6.8 },
    { name: "Mar", mood: 8.2 },
    { name: "Apr", mood: 7.9 },
    { name: "May", mood: 8.5 },
    { name: "Jun", mood: 7.2 },
  ];

  // Dummy data for emotion distribution
  const emotionData = [
    { name: "Happy", value: 35 },
    { name: "Calm", value: 25 },
    { name: "Excited", value: 20 },
    { name: "Stressed", value: 15 },
    { name: "Anxious", value: 5 },
  ];

  // Dummy data for activity impact
  const activityData = [
    { name: "Exercise", impact: 8.5 },
    { name: "Reading", impact: 7.8 },
    { name: "Meditation", impact: 8.2 },
    { name: "Social", impact: 7.9 },
    { name: "Work", impact: 6.5 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE"];

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Area_Chart />
        <Bar_Chart />
        <Pie_Chart />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Insights</CardTitle>
          <CardDescription>Your mood analysis for this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <h4 className="text-sm font-semibold mb-2">Mood Patterns</h4>
              <p className="text-sm text-muted-foreground">
                Your mood tends to be highest in the mornings and after exercise
                sessions.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h4 className="text-sm font-semibold mb-2">Recommendations</h4>
              <p className="text-sm text-muted-foreground">
                Consider incorporating more morning exercises to maintain positive
                energy throughout the day.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
