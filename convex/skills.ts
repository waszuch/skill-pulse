import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSkills = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const skills = await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    return skills;
  },
});

export const getSkill = query({
  args: { id: v.id("skills") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const skill = await ctx.db.get(args.id);
    
    if (!skill || skill.userId !== identity.subject) {
      return null;
    }

    return skill;
  },
});

export const createSkill = mutation({
  args: {
    name: v.string(),
    level: v.number(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    if (args.level < 1 || args.level > 5) {
      throw new Error("Level must be between 1 and 5");
    }

    const now = Date.now();
    const skillId = await ctx.db.insert("skills", {
      userId: identity.subject,
      name: args.name,
      level: args.level,
      tags: args.tags,
      createdAt: now,
      updatedAt: now,
    });

    return skillId;
  },
});

export const updateSkill = mutation({
  args: {
    id: v.id("skills"),
    name: v.string(),
    level: v.number(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const skill = await ctx.db.get(args.id);
    if (!skill || skill.userId !== identity.subject) {
      throw new Error("Skill not found or unauthorized");
    }

    if (args.level < 1 || args.level > 5) {
      throw new Error("Level must be between 1 and 5");
    }

    await ctx.db.patch(args.id, {
      name: args.name,
      level: args.level,
      tags: args.tags,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

export const deleteSkill = mutation({
  args: { id: v.id("skills") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const skill = await ctx.db.get(args.id);
    if (!skill || skill.userId !== identity.subject) {
      throw new Error("Skill not found or unauthorized");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});

