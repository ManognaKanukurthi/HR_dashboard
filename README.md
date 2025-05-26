
# HR Dashboard (Advanced)
A responsive and interactive HR Performance Dashboard built using **Next.js App Router**, **React**, 
and **Tailwind CSS**, enabling HR managers to track employee performance, manage bookmarks, and visualize analytics.

##  Tech Stack
- React with **Next.js (App Router)**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **State Management**: Context API / Zustand
- **Charting**: Chart.js
- 
## Features

### Dashboard Homepage (`/`)
- Fetches and displays user data from `https://dummyjson.com/users?limit=20`
- Renders employee cards with:
  - Full Name, Email, Age, Department (mocked)
  - Performance rating bar (1–5 stars)
  - `View`, `Bookmark`, and `Promote` buttons

###  Search & Filter
- Case-insensitive search by name, email, or department
- Multi-select filter dropdowns:
  - By department
  - By performance rating

###  Dynamic Employee Profile (`/employee/[id]`)
- Detailed profile view with:
  - Address, Phone, Bio, Performance history (mocked)
  - Performance rating stars & badges
- Tabbed interface:
  - `Overview`, `Projects`, `Feedback` (mocked content)

###  Bookmarks Page (`/bookmarks`)
- View all bookmarked employees
- Remove bookmarks
- UI actions for `Promote` and `Assign to Project`

### Analytics Page (`/analytics`)
- Chart.js used to show:
  - Department-wise average performance
  - Bookmark trends (mocked)
- Optimized with SSR or static generation *(optional)*

## Technical Highlights
-  **App Router** with dynamic routing
-  **Data Fetching**: Client-side and/or server-side
-  Custom hooks:
  - `useBookmarks`
  - `useSearch`
-  Reusable Components:
  - Card, Modal, Button, Badge, Tabs
- **Dark/Light Mode** support via Tailwind classes


## 📁 Project Structure

```
/app
  /employee/[id]         // Dynamic user profile
  /analytics             // Analytics dashboard
  /bookmarks             // Bookmarked users
/components              // Reusable UI components
/hooks                   // Custom React hooks
/lib                     // Utilities & data services
/styles                  // Tailwind and global styles
```


## 🛠️ Getting Started

### 1. Clone the repository
git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard

### 2. Install dependencies
npm install

### 3. Run the development server
npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.


## 🤝 Contributing

Pull requests are welcome! Feel free to open an issue or submit a feature request.


