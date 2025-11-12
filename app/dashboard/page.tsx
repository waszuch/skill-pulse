"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();
  const skills = useQuery(api.skills.getSkills);
  const projects = useQuery(api.projects.getProjects);

  // Calculate statistics
  const totalSkills = skills?.length || 0;
  const totalProjects = projects?.length || 0;
  const averageLevel = skills && skills.length > 0
    ? (skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length).toFixed(1)
    : "-";

  return (
    <div className="container py-10">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back, {user?.firstName || "there"}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your skills and projects
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Skills</CardTitle>
              <CardDescription>Skills you're tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{totalSkills}</div>
              <Button asChild className="mt-4 w-full">
                <Link href="/skills">Manage Skills</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Projects</CardTitle>
              <CardDescription>Projects in your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{totalProjects}</div>
              <Button asChild className="mt-4 w-full">
                <Link href="/projects">Manage Projects</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Skill Level</CardTitle>
              <CardDescription>Your overall proficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{averageLevel}</div>
              <p className="text-sm text-muted-foreground mt-4">
                {totalSkills === 0 ? "Add skills to see your average" : "Out of 5.0"}
              </p>
            </CardContent>
          </Card>
        </div>

        {totalSkills === 0 && totalProjects === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>
                Get started by adding your first skill or project
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/skills">Add Your First Skill</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects">Add Your First Project</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
