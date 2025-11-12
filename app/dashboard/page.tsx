import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

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
              <div className="text-4xl font-bold">0</div>
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
              <div className="text-4xl font-bold">0</div>
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
              <div className="text-4xl font-bold">-</div>
              <p className="text-sm text-muted-foreground mt-4">
                Add skills to see your average
              </p>
            </CardContent>
          </Card>
        </div>

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
      </div>
    </div>
  );
}

