"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectsTechChartProps {
  projects: Array<{ techStack: string[] }>;
}

export function ProjectsTechChart({ projects }: ProjectsTechChartProps) {
  const techCounts: Record<string, number> = {};

  projects.forEach((project) => {
    project.techStack.forEach((tech) => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;
    });
  });

  const chartData = Object.entries(techCounts)
    .map(([tech, count]) => ({ name: tech, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const colors = [
    "#8b5cf6",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Technologies</CardTitle>
        <CardDescription>Most used technologies across your projects</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No projects data available
          </div>
        ) : (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      const payloadData = data.payload || {};
                      const name = payloadData.name || data.name;
                      const value = payloadData.value || data.value;
                      
                      const percent = payloadData.percent !== undefined 
                        ? payloadData.percent 
                        : (total > 0 ? value / total : 0);
                      
                      if (!name) return null;
                      
                      return (
                        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-semibold mb-1">{name}</p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{(percent * 100).toFixed(1)}%</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {chartData.map((entry, index) => {
                const percentage = total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0";
                return (
                  <div
                    key={entry.name}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-accent/50 transition-colors"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="font-medium flex-1 truncate">{entry.name}</span>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
