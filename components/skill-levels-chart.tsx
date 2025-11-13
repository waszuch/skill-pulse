"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillLevelsChartProps {
  skills: Array<{ name: string; level: number }>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold mb-2">{data.level}</p>
        <p className="text-sm text-muted-foreground mb-2">
          Count: <span className="font-medium text-foreground">{data.count}</span>
        </p>
        {data.skillNames && data.skillNames.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">Skills:</p>
            <ul className="list-disc list-inside space-y-1">
              {data.skillNames.map((name: string, index: number) => (
                <li key={index} className="text-sm text-foreground">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function SkillLevelsChart({ skills }: SkillLevelsChartProps) {
  const levelCounts = [1, 2, 3, 4, 5].map((level) => {
    const skillsAtLevel = skills.filter((skill) => skill.level === level);
    return {
      level: `Level ${level}`,
      count: skillsAtLevel.length,
      skillNames: skillsAtLevel.map((skill) => skill.name),
    };
  });

  const colors = [
    "#8b5cf6",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
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
              <Tooltip content={<CustomTooltip />} />
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
