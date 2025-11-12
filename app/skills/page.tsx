import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SkillsPage() {
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
          <Button>Add Skill</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No skills yet</CardTitle>
            <CardDescription>
              Start by adding your first skill to track your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Add Your First Skill</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

