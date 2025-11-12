import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
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
          <Button>Add Project</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No projects yet</CardTitle>
            <CardDescription>
              Start by adding your first project to build your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Add Your First Project</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

