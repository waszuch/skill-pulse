"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillLevelsChartProps {
  skills: Array<{ level: number }>;
}

export function SkillLevelsChart({ skills }: SkillLevelsChartProps) {
  const levelCounts = [1, 2, 3, 4, 5].map((level) => ({
    level: `Level ${level}`,
    count: skills.filter((skill) => skill.level === level).length,
  }));

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Levels Distribution</CardTitle>
        <CardDescription>Number of skills at each proficiency level</CardDescription>
      </CardHeader>
      <CardContent>
        {skills.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No skills data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={levelCounts}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="level"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "calc(var(--radius) - 2px)",
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {levelCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

