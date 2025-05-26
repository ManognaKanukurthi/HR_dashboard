"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Employee, Project, Feedback, Tab } from "@/lib/types";
import { RatingStars } from "@/components/ui/RatingStars";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRatingBgColor } from "@/lib/utils";

interface UserTabsProps {
  employee: Employee;
  defaultTab?: Tab;
}

export function UserTabs({ employee, defaultTab = "overview" }: UserTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  
  return (
    <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as Tab)} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4 mt-4 animate-in fade-in-50">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{employee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{employee.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{employee.address.address}, {employee.address.city}</p>
                  <p className="font-medium">{employee.address.state}, {employee.address.postalCode}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Performance Summary</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-2">
                Current performance rating
              </p>
              <div className="flex items-center gap-3">
                <RatingStars rating={employee.performanceRating} size={20} />
                <Badge className={getRatingBgColor(employee.performanceRating)}>
                  {employee.performanceRating.toFixed(1)}
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Department Information</h3>
              <p className="mt-1">{employee.department}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {getEmployeeBio(employee)}
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="projects" className="space-y-4 mt-4 animate-in fade-in-50">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Project History</h3>
            
            {employee.projects && employee.projects.length > 0 ? (
              <div className="space-y-6">
                {employee.projects.map((project: Project) => (
                  <div key={project.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-base font-medium">{project.name}</h4>
                      <ProjectStatusBadge status={project.status} />
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                      <div>
                        <span className="font-medium">Started: </span>
                        {project.startDate}
                      </div>
                      
                      {project.endDate && (
                        <div>
                          <span className="font-medium">Completed: </span>
                          {project.endDate}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No projects found for this employee.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="feedback" className="space-y-4 mt-4 animate-in fade-in-50">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Performance Feedback</h3>
            
            {employee.feedbacks && employee.feedbacks.length > 0 ? (
              <div className="space-y-6">
                {employee.feedbacks.map((feedback: Feedback) => (
                  <div key={feedback.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-base font-medium">{feedback.reviewer}</h4>
                        <p className="text-xs text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex items-center">
                        <RatingStars rating={feedback.rating} size={16} />
                      </div>
                    </div>
                    
                    <p className="text-sm mt-2">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No feedback records found for this employee.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// Helper components
function ProjectStatusBadge({ status }: { status: Project['status'] }) {
  const statusClasses = {
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'planned': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  };
  
  const statusLabels = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'planned': 'Planned',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

// Helper function to generate a mock bio
function getEmployeeBio(employee: Employee): string {
  const departments = {
    'Engineering': `${employee.firstName} is a talented engineer with ${Math.floor(employee.age / 5)} years of experience building scalable applications.`,
    'Marketing': `${employee.firstName} has been driving our marketing efforts with creative campaigns for ${Math.floor(employee.age / 8)} years.`,
    'Sales': `${employee.firstName} is a top performer in sales, consistently exceeding targets for ${Math.floor(employee.age / 7)} quarters in a row.`,
    'Human Resources': `${employee.firstName} manages our talent acquisition and employee relations with ${Math.floor(employee.age / 6)} years of HR experience.`,
    'Finance': `${employee.firstName} has ${Math.floor(employee.age / 5)} years of experience in financial analysis and budgeting.`,
    'Product': `${employee.firstName} has been instrumental in our product strategy for ${Math.floor(employee.age / 6)} years.`,
    'Design': `${employee.firstName} brings ${Math.floor(employee.age / 5)} years of design experience, creating beautiful and intuitive interfaces.`,
    'Customer Support': `${employee.firstName} has been helping our customers solve problems for ${Math.floor(employee.age / 7)} years.`,
  };
  
  return departments[employee.department as keyof typeof departments] || 
    `${employee.firstName} has been a valuable member of our team for several years.`;
}