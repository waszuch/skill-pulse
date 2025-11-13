import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required").max(50, "Name must be less than 50 characters"),
  level: z.number().min(1, "Level must be at least 1").max(5, "Level must be at most 5"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
});

export type SkillFormData = z.infer<typeof skillSchema>;

export const projectSchema = z.object({
  title: z.string().min(1, "Project title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
  techStack: z.array(z.string().min(1)).min(1, "At least one technology is required"),
  link: z.union([z.string().url("Must be a valid URL"), z.literal("")]).optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

