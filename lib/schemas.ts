import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required").max(50, "Name must be less than 50 characters"),
  level: z.number().min(1, "Level must be at least 1").max(5, "Level must be at most 5"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
});

export type SkillFormData = z.infer<typeof skillSchema>;

