"use client";

import { useEffect, useState } from 'react';
import { PerformanceChart } from '@/components/PerformanceChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getEmployees } from '@/lib/api';
import { getDepartmentAnalytics } from '@/lib/utils';
import { Employee, DepartmentPerformance } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { RatingStars } from '@/components/ui/RatingStars';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AnalyticsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [analytics, setAnalytics] = useState<DepartmentPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const employeesData = await getEmployees();
        setEmployees(employeesData);
        
        // Generate analytics data
        const analyticsData = getDepartmentAnalytics(employeesData);
        setAnalytics(analyticsData);
        
        setError(null);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate overall stats
  const overallStats = {
    totalEmployees: employees.length,
    averageRating: employees.length > 0 
      ? parseFloat((employees.reduce((sum, emp) => sum + emp.performanceRating, 0) / employees.length).toFixed(1))
      : 0,
    topPerformers: employees
      .filter(emp => emp.performanceRating >= 4)
      .length,
    needsImprovement: employees
      .filter(emp => emp.performanceRating <= 2)
      .length
  };
  
  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Performance Analytics</h1>
        <p className="text-muted-foreground">
          Insights into employee performance across departments.
        </p>
      </section>
      
      {isLoading ? (
        <AnalyticsSkeleton />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard 
              title="Total Employees" 
              value={overallStats.totalEmployees.toString()} 
              description="Active employees" 
            />
            <SummaryCard 
              title="Average Rating" 
              value={overallStats.averageRating.toString()} 
              description="Overall performance" 
              icon={<RatingStars rating={overallStats.averageRating} size={16} className="ml-2" />}
            />
            <SummaryCard 
              title="Top Performers" 
              value={overallStats.topPerformers.toString()} 
              description="Rating 4 or higher" 
              trendValue="+12%" 
              trendDirection="up" 
            />
            <SummaryCard 
              title="Needs Improvement" 
              value={overallStats.needsImprovement.toString()} 
              description="Rating 2 or lower" 
              trendValue="-5%" 
              trendDirection="down" 
            />
          </div>
          
          {/* Main Chart */}
          <PerformanceChart data={analytics} />
          
          {/* Department Table */}
          <Card>
            <CardHeader>
              <CardTitle>Department Breakdown</CardTitle>
              <CardDescription>Detailed view of all departments and their ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Department performance data as of today</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Avg. Rating</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.map((dept) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell>{dept.employeeCount}</TableCell>
                      <TableCell>{dept.averageRating.toFixed(1)}</TableCell>
                      <TableCell>
                        <RatingStars rating={dept.averageRating} size={16} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// Helper component for summary cards
function SummaryCard({ 
  title, 
  value, 
  description, 
  trendValue, 
  trendDirection, 
  icon 
}: { 
  title: string;
  value: string;
  description: string;
  trendValue?: string;
  trendDirection?: 'up' | 'down';
  icon?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline mt-1">
              <h3 className="text-2xl font-bold">{value}</h3>
              {icon}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          
          {trendValue && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              trendDirection === 'up' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
              {trendValue}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Loading skeleton
function AnalyticsSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-1" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full rounded-md" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-1" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}