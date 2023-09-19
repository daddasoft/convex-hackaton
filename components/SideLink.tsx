"use client"
import Link from 'next/link'
import React from 'react'
import {usePathname} from "next/navigation"
type Props = {link:{path: string,icon: React.ReactNode,name: string}}

export default function SideLink ({link}: Props) {
  const pathname = usePathname()

  

  return (
   <Link href={link.path} className={`${pathname == link.path ? "bg-zinc-600 text-white":"text-slate-200 hover:bg-slate-800"} px-3 py-2 rounded-md  flex items-center gap-2`}>{link.icon} {link.name}</Link>
  );
}

