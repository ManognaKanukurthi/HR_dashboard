"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee } from '@/lib/types';

interface BookmarkContextType {
  bookmarkedEmployees: number[];
  addBookmark: (employeeId: number) => void;
  removeBookmark: (employeeId: number) => void;
  isBookmarked: (employeeId: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarkedEmployees, setBookmarkedEmployees] = useState<number[]>([]);
  
  useEffect(() => {
    // Load bookmarks from localStorage on initial load
    const savedBookmarks = localStorage.getItem('bookmarkedEmployees');
    if (savedBookmarks) {
      setBookmarkedEmployees(JSON.parse(savedBookmarks));
    }
  }, []);
  
  useEffect(() => {
    // Save bookmarks to localStorage whenever they change
    localStorage.setItem('bookmarkedEmployees', JSON.stringify(bookmarkedEmployees));
  }, [bookmarkedEmployees]);
  
  const addBookmark = (employeeId: number) => {
    setBookmarkedEmployees(prev => {
      if (prev.includes(employeeId)) return prev;
      return [...prev, employeeId];
    });
  };
  
  const removeBookmark = (employeeId: number) => {
    setBookmarkedEmployees(prev => prev.filter(id => id !== employeeId));
  };
  
  const isBookmarked = (employeeId: number) => {
    return bookmarkedEmployees.includes(employeeId);
  };
  
  return (
    <BookmarkContext.Provider value={{ 
      bookmarkedEmployees, 
      addBookmark, 
      removeBookmark, 
      isBookmarked 
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}