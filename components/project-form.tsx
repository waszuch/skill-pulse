"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { projectSchema, type ProjectFormData } from "@/lib/schemas";
import { createZodValidator } from "@/lib/form-helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProjectFormProps {
  initialData?: {
    title: string;
    description: string;
    techStack: string[];
    link?: string;
  };
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ProjectForm({ initialData, onSubmit, onCancel, isLoading = false }: ProjectFormProps) {
  const [techInput, setTechInput] = useState("");

  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      techStack: initialData?.techStack || [],
      link: initialData?.link || "",
    },
    onSubmit: async ({ value }) => {
      const projectData = {
        ...value,
        link: value.link?.trim() || undefined,
      };
      const result = projectSchema.safeParse(projectData);
      if (!result.success) {
        return;
      }
      await onSubmit(result.data);
    },
  });

  const addTech = (tech: string) => {
    const trimmed = tech.trim();
    const currentTech = form.getFieldValue("techStack");
    if (trimmed && !currentTech.includes(trimmed)) {
      form.setFieldValue("techStack", [...currentTech, trimmed]);
      setTechInput("");
    }
  };

  const removeTech = (techToRemove: string) => {
    const currentTech = form.getFieldValue("techStack");
    form.setFieldValue("techStack", currentTech.filter((tech) => tech !== techToRemove));
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
        name="title"
        validators={{
          onChange: createZodValidator(projectSchema.shape.title),
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Project Title</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="e.g., E-commerce Platform"
              disabled={isLoading}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="description"
        validators={{
          onChange: createZodValidator(projectSchema.shape.description),
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Description</Label>
            <Textarea
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Describe your project..."
              rows={5}
              disabled={isLoading}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="techStack"
        validators={{
          onChange: createZodValidator(projectSchema.shape.techStack),
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="tech-input">Tech Stack</Label>
            <div className="flex gap-2">
              <Input
                id="tech-input"
                placeholder="Add a technology and press Enter"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech(e.currentTarget.value);
                  }
                }}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (techInput) addTech(techInput);
                }}
                disabled={isLoading}
              >
                Add
              </Button>
            </div>
            {field.state.value.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {field.state.value.map((tech) => (
                  <Badge key={tech} variant="secondary" className="gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
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

      <form.Field
        name="link"
        validators={{
          onChange: ({ value }) => {
            if (!value || value.trim() === "") return undefined;
            const result = projectSchema.shape.link.safeParse(value);
            return result.success ? undefined : "Must be a valid URL";
          },
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Project Link (Optional)</Label>
            <Input
              id={field.name}
              type="url"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="https://example.com or https://github.com/user/repo"
              disabled={isLoading}
            />
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
          {isLoading ? "Saving..." : initialData ? "Update Project" : "Add Project"}
        </Button>
      </div>
    </form>
  );
}
