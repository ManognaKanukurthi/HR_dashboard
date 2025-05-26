"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Search by name, email, or department...",
  value,
  onChange,
  className
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        className="pl-10 py-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}