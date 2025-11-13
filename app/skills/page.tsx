"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/skill-card";
import { SkillDialog } from "@/components/skill-dialog";
import type { SkillFormData } from "@/lib/schemas";
import type { Id } from "@/convex/_generated/dataModel";
import { Plus } from "lucide-react";

export default function SkillsPage() {
  const skills = useQuery(api.skills.getSkills);
  const createSkill = useMutation(api.skills.createSkill);
  const updateSkill = useMutation(api.skills.updateSkill);
  const deleteSkill = useMutation(api.skills.deleteSkill);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<{
    id: Id<"skills">;
    name: string;
    level: number;
    tags: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDialog = () => {
    setEditingSkill(null);
    setDialogOpen(true);
  };

  const handleEdit = (id: Id<"skills">) => {
    const skill = skills?.find((s) => s._id === id);
    if (skill) {
      setEditingSkill({
        id: skill._id,
        name: skill.name,
        level: skill.level,
        tags: skill.tags,
      });
      setDialogOpen(true);
    }
  };

  const handleDelete = async (id: Id<"skills">) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill({ id });
      } catch (error) {
        console.error("Failed to delete skill:", error);
        alert("Failed to delete skill. Please try again.");
      }
    }
  };

  const handleSubmit = async (data: SkillFormData) => {
    setIsLoading(true);
    try {
      if (editingSkill) {
        await updateSkill({
          id: editingSkill.id,
          name: data.name,
          level: data.level,
          tags: data.tags,
        });
      } else {
        await createSkill({
          name: data.name,
          level: data.level,
          tags: data.tags,
        });
      }
    } catch (error) {
      console.error("Failed to save skill:", error);
      alert("Failed to save skill. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (skills === undefined) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Skills</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your technical skills
            </p>
          </div>
          <Button onClick={handleOpenDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </div>

        {skills.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No skills yet</CardTitle>
              <CardDescription>
                Start by adding your first skill to track your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleOpenDialog}>Add Your First Skill</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <SkillCard
                key={skill._id}
                id={skill._id}
                name={skill.name}
                level={skill.level}
                tags={skill.tags}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <SkillDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          initialData={editingSkill || undefined}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
