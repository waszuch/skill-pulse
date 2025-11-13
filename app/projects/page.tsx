"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { ProjectDialog } from "@/components/project-dialog";
import type { ProjectFormData } from "@/lib/schemas";
import type { Id } from "@/convex/_generated/dataModel";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  const projects = useQuery(api.projects.getProjects);
  const createProject = useMutation(api.projects.createProject);
  const updateProject = useMutation(api.projects.updateProject);
  const deleteProject = useMutation(api.projects.deleteProject);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<{
    id: Id<"projects">;
    title: string;
    description: string;
    techStack: string[];
    link?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDialog = () => {
    setEditingProject(null);
    setDialogOpen(true);
  };

  const handleEdit = (id: Id<"projects">) => {
    const project = projects?.find((p) => p._id === id);
    if (project) {
      setEditingProject({
        id: project._id,
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        link: project.link,
      });
      setDialogOpen(true);
    }
  };

  const handleDelete = async (id: Id<"projects">) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject({ id });
      } catch (error) {
        console.error("Failed to delete project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  const handleSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);
    try {
      if (editingProject) {
        await updateProject({
          id: editingProject.id,
          title: data.title,
          description: data.description,
          techStack: data.techStack,
          link: data.link,
        });
      } else {
        await createProject({
          title: data.title,
          description: data.description,
          techStack: data.techStack,
          link: data.link,
        });
      }
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Failed to save project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (projects === undefined) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-2">
              Showcase your portfolio and achievements
            </p>
          </div>
          <Button onClick={handleOpenDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No projects yet</CardTitle>
              <CardDescription>
                Start by adding your first project to build your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleOpenDialog}>Add Your First Project</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                id={project._id}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                link={project.link}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <ProjectDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          initialData={editingProject || undefined}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
