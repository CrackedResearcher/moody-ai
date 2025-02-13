"use client";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Smile, Calendar, Clock } from "lucide-react";
import { MoodInput } from "@/components/mood-input";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { getMoodData } from "../server/actions/moodLogger";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const emotions = [
    { emoji: "😁", label: "Happy" },
    { emoji: "😌", label: "Calm" },
    { emoji: "🤗", label: "Excited" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "😤", label: "Stressed" },
    { emoji: "😐", label: "Neutral" },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [emotion, setEmotion] = useState<string>("N/A");
  const [streak, setStreak] = useState<string>("0");
  const [lastEntry, setLastEntry] = useState<string>("N/A");
  const [emotionDesc, setEmotionDesc] = useState<string>("N/A");

  const LoadingUI = () => (
    <div>
      <div className="text-4xl h-10 w-16 bg-white/20 rounded-lg animate-pulse my-2" />
      <p className="text-sm h-5 w-36 bg-white/20 rounded-lg animate-pulse" />
    </div>
  );


  useEffect(() => {
    async function getDailyMoodData() {
      try {
        setIsLoading(true);
        const res = await getMoodData();
        if (res.success && res.data) {
          const emotionLabel = res.data.latestMood?.emotion || "Neutral";
          const emotionEmoji =
            emotions.find((e) => e.label === emotionLabel)?.emoji || "😐";
          setEmotionDesc(emotionLabel);
          setEmotion(emotionEmoji);
          setStreak(res.data.currentStreak.toString());
          const lastEntryDate = res.data.lastEntry
            ? new Date(res.data.lastEntry)
            : null;
          setLastEntry(
            lastEntryDate
              ? formatDistanceToNow(lastEntryDate, { addSuffix: true })
              : "Not available"
          );
        } else {
          toast.error(res.message || "Failed to fetch mood data");
        }
      } catch (error) {
        toast.error("Failed to fetch mood data");
      } finally {
        setIsLoading(false);
      }
    }
    getDailyMoodData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    How's your mood today?
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Add it below</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 text-sans">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-300 to-blue-300 dark:from-purple-800 dark:to-blue-900 p-4 relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-25 transition-opacity">
                <Smile className="w-32 h-32 text-white" />
              </div>
              <div className="relative h-full flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white">
                  Today's Mood
                </h3>
                {isLoading ? (
                  <LoadingUI />
                ) : (
                  <>
                    <div className="text-4xl font-bold my-2 text-white">
                      {emotion}
                    </div>
                    <p className="text-sm text-white/90">
                      Feeling {emotionDesc}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-800 dark:to-purple-900 p-4 relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-25 transition-opacity">
                <Calendar className="w-32 h-32 text-blue-500" />
              </div>
              <div className="relative h-full flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Streak
                </h3>
                {isLoading ? (
                  <LoadingUI />
                ) : (
                  <>
                    <div className="text-4xl font-bold my-2">{streak}</div>
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      Keep it up!
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 dark:from-purple-800 dark:to-blue-900 p-4 relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-25 transition-opacity">
                <Clock className="w-32 h-32 text-green-500" />
              </div>
              <div className="relative h-full flex flex-col justify-end text-sans">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  Last Entry
                </h3>
                {isLoading ? (
                  <LoadingUI />
                ) : (
                  <>
                    <div className="text-2xl font-bold my-2">{lastEntry}</div>
                    <p className="text-sm text-green-700 dark:text-green-200">
                      Regular tracking
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <BackgroundGradient>
            <div className="h-[430px] flex-1 bg-muted/50 flex flex-col justify-center items-center backdrop-blur-sm rounded-xl">
              <MoodInput />
            </div>
          </BackgroundGradient>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
