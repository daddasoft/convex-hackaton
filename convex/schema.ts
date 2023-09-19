import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  generated_images: defineTable({
    isPending: v.boolean(),
    preview: v.string(),
    prompt: v.string(),
  }),
   generated_audio: defineTable({
    isPending: v.boolean(),
    preview: v.string(),
    prompt: v.string(),
  }),
   messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
});