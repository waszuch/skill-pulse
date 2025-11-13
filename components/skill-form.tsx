"use client";

import { useState } from "react";
import { skillSchema, type SkillFormData } from "@/lib/schemas";
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
  const [name, setName] = useState(initialData?.name || "");
  const [level, setLevel] = useState(initialData?.level || 3);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
      if (errors.tags) {
        setErrors({ ...errors, tags: "" });
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = skillSchema.safeParse({ name, level, tags });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    await onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Skill Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: "" });
          }}
          placeholder="e.g., TypeScript, React, Node.js"
          disabled={isLoading}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="level">Proficiency Level (1-5)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="level"
            type="number"
            min={1}
            max={5}
            value={level}
            onChange={(e) => {
              const val = Number(e.target.value);
              setLevel(val);
              if (errors.level) setErrors({ ...errors, level: "" });
            }}
            disabled={isLoading}
            className="w-20"
          />
          <div className="flex-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setLevel(lvl);
                    if (errors.level) setErrors({ ...errors, level: "" });
                  }}
                  disabled={isLoading}
                  className={`h-8 w-8 rounded border-2 transition-colors ${
                    level >= lvl
                      ? "bg-primary border-primary"
                      : "bg-muted border-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        {errors.level && <p className="text-sm text-destructive">{errors.level}</p>}
      </div>

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
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
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
        {errors.tags && <p className="text-sm text-destructive">{errors.tags}</p>}
      </div>

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
