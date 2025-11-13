"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkillLevelsChart } from "@/components/skill-levels-chart";
import { ProjectsTechChart } from "@/components/projects-tech-chart";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();
  const skills = useQuery(api.skills.getSkills);
  const projects = useQuery(api.projects.getProjects);

  if (skills === undefined || projects === undefined) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalSkills = skills.length;
  const totalProjects = projects.length;
  const averageLevel =
    totalSkills > 0
      ? (skills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills).toFixed(1)
      : "-";

  const allTags = skills.flatMap((skill) => skill.tags);
  const uniqueTags = new Set(allTags).size;

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSkills}</div>
              <p className="text-xs text-muted-foreground">Skills tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">In your portfolio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageLevel}</div>
              <p className="text-xs text-muted-foreground">
                {totalSkills === 0 ? "No skills yet" : "Out of 5.0"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueTags}</div>
              <p className="text-xs text-muted-foreground">Different skill tags</p>
            </CardContent>
          </Card>
        </div>

        {totalSkills === 0 && totalProjects === 0 ? (
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
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {totalSkills > 0 && <SkillLevelsChart skills={skills} />}
            {totalProjects > 0 && <ProjectsTechChart projects={projects} />}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your skills and projects</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/skills">Manage Skills</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects">Manage Projects</Link>
              </Button>
            </CardContent>
          </Card>

          {totalSkills > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Skill Summary</CardTitle>
                <CardDescription>Breakdown of your skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Highest Level:</span>
                  <span className="font-medium">
                    {Math.max(...skills.map((s) => s.level))} / 5
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lowest Level:</span>
                  <span className="font-medium">
                    {Math.min(...skills.map((s) => s.level))} / 5
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Tags:</span>
                  <span className="font-medium">{allTags.length}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
