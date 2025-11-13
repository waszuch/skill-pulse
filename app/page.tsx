import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <Badge variant="secondary" className="px-4 py-1">
              🚀 Built for Developers
            </Badge>
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Manage Your Skills & Projects
                <span className="block text-primary mt-2">All in One Place</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                SkillPulse helps developers track their technical skills, manage projects, 
                and visualize their growth with beautiful dashboards.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features to help you organize and showcase your developer journey
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">📚</div>
                <CardTitle>Skill Management</CardTitle>
                <CardDescription>
                  Track your technical skills with customizable levels (1-5) and organize them with tags
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">🚀</div>
                <CardTitle>Project Portfolio</CardTitle>
                <CardDescription>
                  Showcase your projects with descriptions, tech stacks, and live links
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">📊</div>
                <CardTitle>Visual Dashboard</CardTitle>
                <CardDescription>
                  Visualize your skill distribution and project analytics with beautiful charts
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">🔐</div>
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>
                  Powered by Clerk for secure, hassle-free authentication
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">⚡</div>
                <CardTitle>Real-time Sync</CardTitle>
                <CardDescription>
                  Lightning-fast updates with Convex backend infrastructure
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">🎨</div>
                <CardTitle>Modern UI</CardTitle>
                <CardDescription>
                  Beautiful, responsive design with dark mode support
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Built with Modern Tech
            </h2>
            <p className="text-muted-foreground text-lg">
              SkillPulse is built using the latest and greatest web technologies:
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge variant="secondary">Next.js 15</Badge>
              <Badge variant="secondary">React 19</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">TailwindCSS</Badge>
              <Badge variant="secondary">shadcn/ui</Badge>
              <Badge variant="secondary">Convex</Badge>
              <Badge variant="secondary">Clerk</Badge>
              <Badge variant="secondary">TanStack Form</Badge>
              <Badge variant="secondary">Zod</Badge>
              <Badge variant="secondary">Recharts</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Level Up?
            </h2>
            <p className="max-w-2xl text-lg opacity-90">
              Join developers who are already tracking their skills and building their portfolios with SkillPulse
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/sign-up">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 SkillPulse. Built with ❤️ for developers.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
