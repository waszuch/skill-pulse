"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

interface ProjectCardProps {
  id: Id<"projects">;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  onEdit: (id: Id<"projects">) => void;
  onDelete: (id: Id<"projects">) => void;
}

export function ProjectCard({ id, title, description, techStack, link, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary mt-1 inline-flex items-center gap-1"
              >
                View Project <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(id)}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="mb-4 line-clamp-3">{description}</CardDescription>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

