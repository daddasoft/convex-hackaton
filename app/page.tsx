"use client"

import SideLink from "@/components/SideLink";
import { Button } from "@/components/ui/button";
import {
  Bird,
  Banknote,
  LocateFixed,
  ArrowDown,
  ChevronDown,
  Speaker,
  Music,
  Image,
  Video,
  MessageSquare,
  Menu,
} from "lucide-react";
import Link from "next/link";

import { useState } from "react";
const LINKS = [
  {
    name: "Image Generation",
    path: "/image-generation",
    icon : <Image className="h-4 w-4" />,
        colorClasses:"bg-red-300 text-red-700"

  },
  {
    name: "Audio Generation",
    path: "/audio-generation",
    icon : <Music className="h-4 w-4" />,
    colorClasses:"bg-purple-300 text-purple-700"
  },

  {
    name: "Chat With GPT Model",
    path: "/coversation",
    icon : <MessageSquare className="h-4 w-4" />,
    colorClasses:"bg-green-300 text-green-700"
  },
]


export default function App() {
  return (
  <div className="py-7 px-6 space-y-3">
    <div className="text-center">
       <h3 className="text-5xl font-semibold">Unlock The Power of AI</h3>
    <p className="text-xl text-slate-600">
      Chat with the smartest AI - Experience the power of AI with us
    </p>
    </div>
    {LINKS.map((link) => (
       <Link href={link.path} key={link.name}
        className="p-4 flex items-center rounded-md hover:shadow-lg hover:border-transparent transition-all gap-4 border"
      >
        <div
          className={`p-3 ${link.colorClasses} rounded-md flex items-center justify-center`}
        >
          {link.icon}
        </div>
        <span className="text-lg font-medium">{link.name}</span>
      </Link>
    ))}
  </div>  
  );
}
