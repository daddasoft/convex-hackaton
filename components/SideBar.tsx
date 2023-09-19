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
import { Toaster } from 'react-hot-toast';

import { ReactNode, useState } from "react";
const LINKS = [
  {
    name: "Image Generation",
    path: "/image-generation",
    icon : <Image className="h-4 w-4" />
  },
  {
    name: "audio-generation",
    path: "/audio-generation",
    icon : <Music className="h-4 w-4" />
  },

  {
    name: "Coversation",
    path: "/coversation",
    icon : <MessageSquare className="h-4 w-4" />
  },
]


export default function SideBar({children}:{children:React.ReactNode}) {
  const [open, setOpen] = useState(true);
  return (
    <>
    
    <div className="flex items-start">
      <div
        className={`${
          open ? "ml-0" : "-ml-[250px]"
        } flex h-screen p-6 transition-[margin] duration-300 bg-slate-950 gap-8 flex-col justify-stretch w-[250px] border-r `}
      >
        <Link href="/" className="text-center text-4xl font-semibold text-slate-100">
          Genify
        </Link>
        <ul className="flex flex-col gap-2">
         {LINKS.map(link =>
          <li key={link.name}>
            <SideLink link={link} />
          </li>
          )}
        </ul>
      </div>
      <div className="flex-1">

      <div className="flex sticky top-0 z-40 backdrop-blur-md items-center px-6 flex-1 py-3 justify-between shadow-sm">
        <Button
          onClick={() => setOpen((old) => !old)}
          variant="ghost"
          size="sm"
          >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="h-9 w-9 bg-slate-200 rounded-full"></div>
      </div>
      {children}
            </div>
    </div>
    <Toaster />
    </>
  );
}
