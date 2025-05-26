"use client";

import { useEffect, useRef } from 'react';
import { DepartmentPerformance } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface PerformanceChartProps {
  data: DepartmentPerformance[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  // Sort data by average rating (descending)
  const sortedData = [...data].sort((a, b) => b.averageRating - a.averageRating);
  
  // Format data for the chart
  const chartData = sortedData.map(item => ({
    name: item.department,
    rating: item.averageRating,
    employees: item.employeeCount
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>Average performance rating by department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis 
                domain={[0, 5]} 
                ticks={[0, 1, 2, 3, 4, 5]} 
                label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "rating") return [value, "Avg. Rating"];
                  if (name === "employees") return [value, "Employees"];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar 
                dataKey="rating" 
                name="Average Rating"
                fill="hsl(var(--chart-1))" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="employees" 
                name="Employee Count" 
                fill="hsl(var(--chart-2))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}