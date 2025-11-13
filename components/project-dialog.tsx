"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectForm } from "@/components/project-form";
import type { ProjectFormData } from "@/lib/schemas";
import type { Id } from "@/convex/_generated/dataModel";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    id: Id<"projects">;
    title: string;
    description: string;
    techStack: string[];
    link?: string;
  };
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ProjectDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isLoading = false,
}: ProjectDialogProps) {
  const handleSubmit = async (data: ProjectFormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update your project information below."
              : "Add a new project to showcase in your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}

