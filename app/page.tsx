import { Suspense } from 'react';
import EmployeeList from './employee-list';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your team, track performance, and identify top talent.
        </p>
      </section>
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[120px]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-3 w-[100px]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      }>
        <EmployeeList />
      </Suspense>
    </div>
  );
}