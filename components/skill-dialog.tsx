"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SkillForm } from "@/components/skill-form";
import type { SkillFormData } from "@/lib/schemas";
import type { Id } from "@/convex/_generated/dataModel";

interface SkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    id: Id<"skills">;
    name: string;
    level: number;
    tags: string[];
  };
  onSubmit: (data: SkillFormData) => Promise<void>;
  isLoading?: boolean;
}

export function SkillDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isLoading = false,
}: SkillDialogProps) {
  const handleSubmit = async (data: SkillFormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Skill" : "Add New Skill"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update your skill information below."
              : "Add a new skill to track your progress."}
          </DialogDescription>
        </DialogHeader>
        <SkillForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}

