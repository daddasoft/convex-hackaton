"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Loader2, Send, Trash, User } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown"
export default function Page() {
  const messages = useQuery(api.messages.list);
    const deleteMessage = useMutation(api.imageGen.deleteChat);
  const [deleting, setDeleting] = useState("");

  const sendMessage = useMutation(api.messages.send);
  const [newMessageText, setNewMessageText] = useState("");
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [messages]);
  return (
    <div className="h-[calc(100vh-60px)] relative">

    <div className="px-10 pt-4 relative h-[calc(100vh-60px)] overflow-y-scroll pb-28">
      <div className="px-2 flex flex-col gap-2 divide-y">
        {messages?.map((message) => (
          <article className="px-3 py-2 " key={message._id}>
            <div className="flex gap-2 relative">
                 <button
                    onClick={async () => {
                      setDeleting(message._id);
                      await deleteMessage({ id: message._id });
                      setDeleting("");
                    }}
                    className="absolute h-9 w-9 flex text-slate-200 z-40 items-center shrink-0 bg-slate-900 -right-8 -top-2 justify-center rounded-full"
                  >
                    {deleting == message._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </button>
              <div
                className={`h-12 w-12 shrink-0 rounded-full text-xs flex items-center justify-center font-medium ${
                  message.author == "ChatGPT"
                    ? "bg-slate-800 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {message.author == "ChatGPT" ? <OpenAi/> : <User className="h-5 w-5" />}
              </div>
              <div className="flex flex-col">

              <Markdown>
              {message.body}
              </Markdown>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
      <div className="absolute bottom-0 w-full">

            <form
            className="w-full px-5 py-2 bg-slate-300/40 backdrop-blur-md rounded-t-md"
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ body: newMessageText, author: "daddasoft" });
          setNewMessageText("");
        }}
        >
          <div className="relative flex items-center">

        <Input
          value={newMessageText}
          className="pr-20"
          onChange={(e) => setNewMessageText(e.target.value)}
          />
          <Button className="absolute  right-0 rounded-none" type="submit"><Send className="h-4 w-4" /></Button>
          </div>
      </form>
          </div>
    </div>
  );
}

function OpenAi() {
  return (
    <svg className="h-5 w-5" viewBox="140 140 520 520">
      <path
        d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z"
        fill="#fff"
      ></path>
    </svg>
  );
}
