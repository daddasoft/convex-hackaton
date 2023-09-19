"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const download = (filename: string, content: string) => {
  var element = document.createElement("a");
  element.setAttribute("href", content);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const handleDownload = async (path: string, name: string) => {
  try {
    const result = await fetch(path, {
      method: "GET",
      headers: {},
    });
    const blob = await result.blob();
    const url = URL.createObjectURL(blob);
    download(`${name}.png`, url);
    URL.revokeObjectURL(url);
    toast.success("Image Downloaded Successfully");
  } catch (error) {
    console.error(error);
  }
};
async function handleCopyPrompt(prompt: string) {
  try {
    // use navigator api to copy prompt
    await navigator.clipboard.writeText(prompt);
    toast.success("Copied to Clipboard");
  } catch (error) {
    toast.error("Failed to Copy to Clipboard");
  }
}

import { Button } from "@/components/ui/button";
import { Copy, Download, Loader2, Trash } from "lucide-react";
import toast from "react-hot-toast";
export default function Page() {
  const genImage = useMutation(api.imageGen.CreateImage);
  const deleteImage = useMutation(api.imageGen.deleteImage);
  const images = useQuery(api.imageGen.get);

  const [propmt, setPrompt] = useState("");
  const [deleting, setDeleting] = useState("");

  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center justify-center gap-3 px-10 py-6 flex-col">
      <Input
        disabled={loading}
        value={prompt}
        onChange={(t) => {
          setPrompt(t.target.value);
        }}
      />
      <Button
        className="relative"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await genImage({
            prompt: propmt,
          });
          setPrompt("")
          setLoading(false);
        }}
      >
        {loading ? (
          <div className="inset-0 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          "Gen Image"
        )}
      </Button>
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 ">
          {images?.map((image) => (
            <div key={image._id}>
              {image.isPending ? (
                <div className="h-[300px] bg-slate-400 animate-pulse"></div>
              ) : (
                <div className=" h-[300px] rounded-lg  group  relative flex items-center flex-col justify-end  ">
                  <button
                    onClick={async () => {
                      setDeleting(image._id);
                      await deleteImage({ id: image._id });
                      setDeleting("");
                    }}
                    className="absolute h-9 w-9 flex text-slate-200 z-40 items-center shrink-0 bg-slate-900 -left-1 -top-2 justify-center rounded-full"
                  >
                    {deleting == image._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </button>
                  <div className="space-y-3 absolute mb-3 opacity-0 transition-all duration-300  pointer-events-none translate-y-32 z-10 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                    <button
                      onClick={() =>
                        handleDownload(
                          image.preview,
                          image.prompt.replaceAll(" ", "_")
                        )
                      }
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-white bg-slate-900"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                    <button
                      onClick={() => handleCopyPrompt(image.prompt)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-white bg-slate-900"
                    >
                      <Copy className="h-4 w-4" />
                      prompt
                    </button>
                  </div>
                  <img
                    className="h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 max-w-full rounded-lg"
                    src={image.preview}
                    alt=""
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
