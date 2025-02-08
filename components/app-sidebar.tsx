"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  NotebookPenIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getBasicUserDetails } from "@/app/server/actions/getUserData"
import { useEffect, useState } from "react"

type UserDetails = {
  name: string;
  email: string;
  avatar?: string;
};

const defaultUserDetails: UserDetails = {
  name: 'Ghost', 
  email: 'Not available',  
  avatar: '/avatars/shadcn.jpg', 
};

const data = {
  user: defaultUserDetails,
  teams: [
    {
      name: "Moody AI",
      logo: NotebookPenIcon,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: NotebookPenIcon,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: NotebookPenIcon,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "My Daily Moods",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Mood Analytics",
      url: "/dashboard/analytics",
      icon: PieChart,
    },
    {
      name: "Recommendations",
      url: "/dashboard/recommendations",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [userDetails, setUserDetails] = useState<UserDetails>(defaultUserDetails);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userData = await getBasicUserDetails();
      if(userData.success){
        setUserDetails({
          name: userData.userDetails?.name || defaultUserDetails.name,
          email: userData.userDetails?.email || defaultUserDetails.email,
          avatar: userData.userDetails?.avatar || defaultUserDetails.avatar,
        });
      }
    }

    fetchUserDetails();
  }, [])
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userDetails} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
