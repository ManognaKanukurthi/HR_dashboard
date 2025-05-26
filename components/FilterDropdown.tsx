"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { departments } from "@/lib/utils";
import { RatingStars } from "@/components/ui/RatingStars";

interface FilterDropdownProps {
  selectedDepartments: string[];
  onDepartmentChange: (departments: string[]) => void;
  selectedRatings: number[];
  onRatingChange: (ratings: number[]) => void;
}

export function FilterDropdown({
  selectedDepartments,
  onDepartmentChange,
  selectedRatings,
  onRatingChange
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleDepartmentChange = (department: string) => {
    if (selectedDepartments.includes(department)) {
      onDepartmentChange(selectedDepartments.filter(d => d !== department));
    } else {
      onDepartmentChange([...selectedDepartments, department]);
    }
  };
  
  const handleRatingChange = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      onRatingChange(selectedRatings.filter(r => r !== rating));
    } else {
      onRatingChange([...selectedRatings, rating]);
    }
  };
  
  const clearFilters = () => {
    onDepartmentChange([]);
    onRatingChange([]);
  };
  
  const hasActiveFilters = selectedDepartments.length > 0 || selectedRatings.length > 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant={hasActiveFilters ? "default" : "outline"} 
          size="sm" 
          className="gap-1"
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          {hasActiveFilters && (
            <span className="ml-1 bg-primary-foreground text-primary w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {selectedDepartments.length + selectedRatings.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Filter by Department</h3>
            <div className="grid grid-cols-2 gap-2">
              {departments.map((department) => (
                <div key={department} className="flex items-start space-x-2">
                  <Checkbox
                    id={`department-${department}`}
                    checked={selectedDepartments.includes(department)}
                    onCheckedChange={() => handleDepartmentChange(department)}
                  />
                  <Label
                    htmlFor={`department-${department}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {department}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Filter by Rating</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center space-x-1"
                  >
                    <RatingStars rating={rating} max={5} />
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters} 
              className="w-full mt-2"
            >
              Clear all filters
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}