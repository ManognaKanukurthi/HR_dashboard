import { cn } from "@/lib/utils";

interface DepartmentBadgeProps {
  department: string;
  className?: string;
}

export function DepartmentBadge({ department, className }: DepartmentBadgeProps) {
  // Map departments to specific colors
  const getBadgeColor = (dept: string) => {
    const colorMap: Record<string, string> = {
      'Engineering': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Marketing': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Sales': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Human Resources': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'Finance': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      'Product': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Design': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
      'Customer Support': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
    };

    return colorMap[dept] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <span className={cn(
      "inline-block px-2.5 py-1 text-xs font-medium rounded-full",
      getBadgeColor(department),
      className
    )}>
      {department}
    </span>
  );
}