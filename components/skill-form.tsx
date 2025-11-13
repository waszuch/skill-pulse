"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { skillSchema, type SkillFormData } from "@/lib/schemas";
import { createZodValidator } from "@/lib/form-helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SkillFormProps {
  initialData?: {
    name: string;
    level: number;
    tags: string[];
  };
  onSubmit: (data: SkillFormData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function SkillForm({ initialData, onSubmit, onCancel, isLoading = false }: SkillFormProps) {
  const [tagInput, setTagInput] = useState("");

  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
      level: initialData?.level || 3,
      tags: initialData?.tags || [],
    },
    onSubmit: async ({ value }) => {
      const result = skillSchema.safeParse(value);
      if (!result.success) {
        return;
      }
      await onSubmit(result.data);
    },
  });

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    const currentTags = form.getFieldValue("tags");
    if (trimmed && !currentTags.includes(trimmed)) {
      form.setFieldValue("tags", [...currentTags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getFieldValue("tags");
    form.setFieldValue("tags", currentTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <form.Field
        name="name"
        validators={{
          onChange: createZodValidator(skillSchema.shape.name),
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Skill Name</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="e.g., TypeScript, React, Node.js"
              disabled={isLoading}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="level"
        validators={{
          onChange: createZodValidator(skillSchema.shape.level),
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Proficiency Level (1-5)</Label>
            <div className="flex items-center gap-4">
              <Input
                id={field.name}
                type="number"
                min={1}
                max={5}
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
                disabled={isLoading}
                className="w-20"
              />
              <div className="flex-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => field.handleChange(lvl)}
                      disabled={isLoading}
                      className={`h-8 w-8 rounded border-2 transition-colors ${
                        field.state.value >= lvl
                          ? "bg-primary border-primary"
                          : "bg-muted border-muted-foreground/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="tags"
        validators={{
          onChange: createZodValidator(skillSchema.shape.tags),
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="tag-input">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tag-input"
                placeholder="Add a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(e.currentTarget.value);
                  }
                }}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (tagInput) addTag(tagInput);
                }}
                disabled={isLoading}
              >
                Add
              </Button>
            </div>
            {field.state.value.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {field.state.value.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      disabled={isLoading}
                      className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Update Skill" : "Add Skill"}
        </Button>
      </div>
    </form>
  );
}
