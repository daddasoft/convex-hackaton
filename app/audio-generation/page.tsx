"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

export default function Page(){
    const [loading,setLoading] =useState(false)
    const [prompt,setPrompt] = useState('')
    const genAudio = useMutation(api.imageGen.CreateAudio);
    const audios = useQuery(api.imageGen.getAudio);
      const [deleting, setDeleting] = useState("");
  const deleteAudio = useMutation(api.imageGen.deleteAudio);

    return (
        <div className="px-10 py-4">
            <div className="max-w-xl mx-auto space-y-2">

             <Input
        disabled={loading}
        onChange={(t) => {
            setPrompt(t.target.value);
        }}
      />
      <Button
        className="relative w-full"
        disabled={loading}
        onClick={async () => {
            setLoading(true);
            await genAudio({prompt})
            setLoading(false);
        }}
        >
        {loading ? (
            <div className="inset-0 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
            "Gen Audio"
            )}
      </Button>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                {audios?.map(audio=>
                    <Card key={audio._id} className="relative">
                           <button
                    onClick={async () => {
                      setDeleting(audio._id);
                      await deleteAudio({ id: audio._id });
                      setDeleting("");
                    }}
                    className="absolute h-9 w-9 flex text-slate-200 z-40 items-center shrink-0 bg-slate-900 -left-1 -top-2 justify-center rounded-full"
                  >
                    {deleting == audio._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </button>
                    <CardHeader className="text-sm text-slate-800">{audio.prompt}</CardHeader>
                    <CardContent className="p-2">
                        {audio.isPending ?
                       <div className="h-10 w-full bg-slate-400 animate-pulse"></div>
                    : <audio  controls src={audio.preview}></audio>
                    }
                    </CardContent>
                </Card>
                    )}
                
            </div>
        </div>
    )
}