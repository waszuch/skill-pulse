import { z } from "zod";

export function createZodValidator<T extends z.ZodTypeAny>(schema: T) {
  return ({ value }: { value: z.infer<T> }): string | undefined => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  };
}

