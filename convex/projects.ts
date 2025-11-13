import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    return projects;
  },
});

export const getProject = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.id);
    
    if (!project || project.userId !== identity.subject) {
      return null;
    }

    return project;
  },
});

export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    link: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const now = Date.now();
    const projectId = await ctx.db.insert("projects", {
      userId: identity.subject,
      title: args.title,
      description: args.description,
      techStack: args.techStack,
      link: args.link,
      createdAt: now,
      updatedAt: now,
    });

    return projectId;
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    link: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.id);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Project not found or unauthorized");
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      techStack: args.techStack,
      link: args.link,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.id);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Project not found or unauthorized");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});

