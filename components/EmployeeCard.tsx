"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, BookmarkCheck, UserRoundPlus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Employee } from '@/lib/types';
import { RatingStars } from '@/components/ui/RatingStars';
import { DepartmentBadge } from '@/components/ui/DepartmentBadge';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { useToast } from "@/hooks/use-toast";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const { toast } = useToast();
  
  const bookmarked = isBookmarked(employee.id);
  
  const handleBookmarkToggle = () => {
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
    toast({
      title: "Promotion initiated",
      description: `Promotion process started for ${employee.firstName} ${employee.lastName}.`,
      variant: "success",
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-border">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden mr-3 border-2 border-primary/10">
            <Image
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg text-card-foreground truncate">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{employee.email}</p>
          </div>
        </div>
        
        <div className="mb-3 flex flex-wrap gap-2 items-center">
          <DepartmentBadge department={employee.department} />
          <span className="text-sm text-muted-foreground">Age: {employee.age}</span>
        </div>
        
        <div className="mb-4 flex items-center">
          <span className="text-sm font-medium mr-2">Performance:</span>
          <RatingStars rating={employee.performanceRating} />
        </div>
        
        <div className="mt-auto pt-3 flex gap-2 border-t border-border">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/employee/${employee.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBookmarkToggle}
          >
            {bookmarked ? (
              <><BookmarkCheck className="h-4 w-4 mr-1 text-green-500" /> Saved</>
            ) : (
              <><Bookmark className="h-4 w-4 mr-1" /> Save</>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePromote}
          >
            <UserRoundPlus className="h-4 w-4 mr-1" />
            Promote
          </Button>
        </div>
      </div>
    </div>
  );
}