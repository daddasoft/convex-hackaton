import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const get = query( async ({db})=>{
    return await db.query("generated_images").order("desc").collect();
})
export const getAudio = query( async ({db})=>{
    return await db.query("generated_audio").order("desc").collect();
})

export const  CreateImage = mutation({
    args:{prompt:v.string()},
    async handler(ctx, args) {
    const   doc_id = await  ctx.db.insert("generated_images",{
            prompt:args.prompt,
            isPending:true,
            preview:""
        })
       await ctx.scheduler.runAfter(0,internal.ReplicateActions.generateImage,{prompt:args.prompt,id:doc_id})
    },
})


export const  updateGeneratedImages = mutation({
    args:{url:v.string(),id:v.id("generated_images")},
    async handler(ctx, args) {
    await  ctx.db.patch( args.id,{
            isPending:false,
            preview:args.url
        })
        console.log("database updated");
        
    },
})



export const  CreateAudio = mutation({
    args:{prompt:v.string()},
    async handler(ctx, args) {
    const   doc_id = await  ctx.db.insert("generated_audio",{
            prompt:args.prompt,
            isPending:true,
            preview:""
        })
       await ctx.scheduler.runAfter(0,internal.ReplicateActions.generateAudio,{prompt:args.prompt,id:doc_id})
    },
})


export const  updateGeneratedAudio = mutation({
    args:{url:v.string(),id:v.id("generated_audio")},
    async handler(ctx, args) {
    await  ctx.db.patch( args.id,{
            isPending:false,
            preview:args.url
        })
        console.log("database updated");
        
    },
})




export const deleteImage = mutation(({db},{id}:{id:Id<"generated_images">})=>{
    return db.delete(id);
})

export const deleteAudio = mutation(({db},{id}:{id:Id<"generated_audio">})=>{
    return db.delete(id);
})
export const deleteChat = mutation(({db},{id}:{id:Id<"messages">})=>{
    return db.delete(id);
})