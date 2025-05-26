"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { RatingStars } from '@/components/ui/RatingStars';
import { UserTabs } from '@/components/UserTabs';
import { DepartmentBadge } from '@/components/ui/DepartmentBadge';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { useToast } from '@/hooks/use-toast';
import { getEmployeeById } from '@/lib/api';
import { Employee } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Bookmark, BookmarkCheck, UserRoundPlus } from 'lucide-react';

export default function EmployeeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const employeeId = Number(params.id);
  const bookmarked = employee ? isBookmarked(employee.id) : false;
  
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setIsLoading(true);
        const data = await getEmployeeById(employeeId);
        
        if (!data) {
          setError('Employee not found');
          return;
        }
        
        setEmployee(data);
        setError(null);
      } catch (err) {
        setError('Failed to load employee details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);
  
  const handleBookmarkToggle = () => {
    if (!employee) return;
    
    if (bookmarked) {
      removeBookmark(employee.id);
      toast({
        title: "Removed from bookmarks",
        description: `${employee.firstName} ${employee.lastName} has been removed from your bookmarks.`,
      });
    } else {
      addBookmark(employee.id);
      toast({
        title: "Added to bookmarks",
        description: `${employee.firstName} ${employee.lastName} has been added to your bookmarks.`,
      });
    }
  };
  
  const handlePromote = () => {
    if (!employee) return;
    
    toast({
      title: "Promotion initiated",
      description: `Promotion process started for ${employee.firstName} ${employee.lastName}.`,
      variant: "default",
    });
  };
  
  if (isLoading) {
    return <EmployeeDetailsSkeleton />;
  }
  
  if (error || !employee) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-xl text-muted-foreground mb-4">{error || 'Employee not found'}</p>
        <Button onClick={() => router.push('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center mb-2">
        <Button variant="ghost" size="icon" onClick={() => router.push('/')} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Employee Details</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/10 mb-4">
                <Image
                  src={employee.image}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h2 className="text-2xl font-bold">{employee.firstName} {employee.lastName}</h2>
              <DepartmentBadge department={employee.department} className="mt-2" />
              
              <div className="w-full flex justify-center mt-4">
                <RatingStars rating={employee.performanceRating} size={24} />
              </div>
              
              <div className="grid grid-cols-2 gap-2 w-full mt-6">
                <Button 
                  variant={bookmarked ? "default" : "outline"}
                  onClick={handleBookmarkToggle}
                >
                  {bookmarked ? (
                    <><BookmarkCheck className="h-4 w-4 mr-1" /> Saved</>
                  ) : (
                    <><Bookmark className="h-4 w-4 mr-1" /> Save</>
                  )}
                </Button>
                <Button 
                  variant="default"
                  onClick={handlePromote}
                >
                  <UserRoundPlus className="h-4 w-4 mr-1" />
                  Promote
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium">{employee.age}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium capitalize">{employee.gender}</span>
                </li>
                {employee.birthDate && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Birth Date:</span>
                    <span className="font-medium">{employee.birthDate}</span>
                  </li>
                )}
                {employee.bloodGroup && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Blood Group:</span>
                    <span className="font-medium">{employee.bloodGroup}</span>
                  </li>
                )}
                {employee.height && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Height:</span>
                    <span className="font-medium">{employee.height} cm</span>
                  </li>
                )}
                {employee.weight && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">{employee.weight} kg</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <UserTabs employee={employee} />
        </div>
      </div>
    </div>
  );
}

function EmployeeDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center mb-2">
        <Skeleton className="h-10 w-10 rounded-full mr-2" />
        <Skeleton className="h-8 w-64" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Skeleton className="h-40 w-40 rounded-full mb-4" />
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-5 w-24 mb-6" />
              <div className="grid grid-cols-2 gap-2 w-full">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Skeleton className="h-10 w-full mb-4" />
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}