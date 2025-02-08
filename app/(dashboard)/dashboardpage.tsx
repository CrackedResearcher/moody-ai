"use client";
import React from "react";
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
import { TypingBox } from "@/components/ui/typing-box";
import { Smile, Calendar, Clock } from "lucide-react";
import Analytics from "./analytics";
import Recommendations from "./recommendations";
import { usePathname } from "next/navigation";



const Dashboard = () => {

  const pathname = usePathname();

  const renderContent = () => {
    switch (pathname) {
      case "/dashboard/analytics":
        return <Analytics />;
      case "/dashboard/recommendations":
        return <Recommendations />;
      default:
        return (
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-300 to-blue-300 dark:from-purple-800 dark:to-blue-900 p-4 relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-25 transition-opacity">
                <Smile className="w-32 h-32 text-white" />
              </div>
              <div className="relative h-full flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white">Today's Mood</h3>
                <div className="text-4xl font-bold my-2 text-white">😊</div>
                <p className="text-sm text-white/90">
                  Feeling positive
                </p>
              </div>
            </div>

            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-800 dark:to-purple-900 p-4 relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-25 transition-opacity">
                <Calendar className="w-32 h-32 text-blue-500" />
              </div>
              <div className="relative h-full flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Streak</h3>
                <div className="text-4xl font-bold my-2">7</div>
                <p className="text-sm text-blue-700 dark:text-blue-200">Keep it up!</p>
              </div>
            </div>

            <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 dark:from-purple-800 dark:to-blue-900 p-4 relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-25 transition-opacity">
                <Clock className="w-32 h-32 text-green-500" />
              </div>
              <div className="relative h-full flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Last Entry</h3>
                <div className="text-2xl font-bold my-2">2 hours ago</div>
                <p className="text-sm text-green-700 dark:text-green-200">Regular tracking</p>
              </div>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center">
            <h2 className="mb-2 sm:mb-10 text-xl text-center sm:text-5xl dark:text-white text-black font-sans">
              How was your day today?
            </h2>
            <TypingBox
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
          </>
        );
    }
  };

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
        {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
