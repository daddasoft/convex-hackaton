import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { internalAction } from "./_generated/server";
import Replicate from "replicate";



export const  generateImage =internalAction(async ({runMutation},{prompt,id}:{prompt:string,id:Id<"generated_images">})=>{
    console.log("Generating image",prompt,id)
    const replicate = new Replicate({
  auth: process.env.REPLICATE!,
});

const output:string = await replicate.run(
  "stability-ai/sdxl:8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
  {
    input: {
      prompt: prompt,

    }
  }


);
await runMutation(api.imageGen.updateGeneratedImages,{id,url:output[0] ?? ""})


})



export const generateAudio = internalAction(async ({runMutation},{prompt,id}:{prompt:string,id:Id<"generated_audio">})=>{
  const replicate = new Replicate({
  auth: process.env.REPLICATE!,
});

const output = await replicate.run(
  "meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
  {
    input: {
      model_version: "melody",
      prompt
    }
  }
);

await runMutation(api.imageGen.updateGeneratedAudio,{id,url:output ?? ""})

})