import { internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const list = query({
  handler: async ({ db }): Promise<Doc<"messages">[]> => {
    // Grab the most recent messages.
    const messages = await db.query("messages").order("desc").take(100);
    // Reverse the list so that it's in chronological order.
    return messages.reverse();
  },
});

export const send = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async ({ db, scheduler }, { body, author }) => {
    // Send our message.
    await db.insert("messages", { body, author });

    
      // Fetch the latest n messages to send as context.
      // The default order is by creation time.
      const messages = await db.query("messages").order("desc").take(10);
      // Reverse the list so that it's in chronological order.
      messages.reverse();
      // Insert a message with a placeholder body.
      const messageId = await db.insert("messages", {
        author: "ChatGPT",
        body: "...",
      });
      // Schedule an action that calls ChatGPT and updates the message.
      scheduler.runAfter(0, internal.openai.chat, { messages, messageId });
    
  },
});

// Updates a message with a new body.
export const update = internalMutation({
  args: { messageId: v.id("messages"), body: v.string() },
  handler: async ({ db }, { messageId, body }) => {
    await db.patch(messageId, { body });
  },
});