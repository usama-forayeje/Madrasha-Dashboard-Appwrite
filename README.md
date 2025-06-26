# Manzil Islamic Institute - Management System

A comprehensive, premium-quality madrasha management system built with React, TypeScript, Appwrite, and modern UI components.

## 🌟 Features

### 🔐 Authentication & Authorization

- **Google OAuth Integration** - Seamless sign-in with Google
- **Email/Password Authentication** - Traditional login system
- **Password Recovery** - Secure password reset functionality
- **Role-based Access Control** - Admin, Teacher, and Student roles
- **Email Verification** - Secure account verification

### 👨‍💼 Admin Dashboard

- **Comprehensive Analytics** - Real-time statistics and insights
- **Student Management** - Complete student lifecycle management
- **Teacher Management** - Faculty administration and assignments
- **Class Management** - Course creation and scheduling
- **Attendance Tracking** - Digital attendance system
- **Reports & Analytics** - Detailed performance reports

### 🎓 Student Features

- **Personal Dashboard** - Student progress tracking
- **Class Enrollment** - Easy course registration
- **Attendance History** - Personal attendance records
- **Grade Tracking** - Academic performance monitoring

### 👨‍🏫 Teacher Features

- **Class Management** - Manage assigned classes
- **Attendance Marking** - Digital attendance system
- **Student Progress** - Track student performance
- **Schedule Management** - View and manage teaching schedule

### 🎨 Premium UI/UX

- **Modern Design** - Clean, professional interface
- **Dark/Light Mode** - Theme switching capability
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Framer Motion animations
- **Accessible Components** - WCAG compliant UI elements

## 🚀 Technology Stack

### Frontend

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router v7** - Client-side routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Framer Motion** - Smooth animations

### Backend & Database

- **Appwrite** - Backend-as-a-Service
- **Appwrite Database** - NoSQL document database
- **Appwrite Auth** - Authentication service
- **Appwrite Storage** - File storage service
- **Appwrite Functions** - Serverless functions

### UI Components

- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Appwrite account and project

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/manzil-madrasha-management.git
cd manzil-madrasha-management
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install

# or

yarn install
\`\`\`

### 3. Environment Setup

Copy the example environment file and configure your variables:
\`\`\`bash
cp .env.example .env
\`\`\`

Fill in your Appwrite configuration:
\`\`\`env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id

# ... other variables

\`\`\`

### 4. Appwrite Setup

#### Create Collections

Create the following collections in your Appwrite database:

**Users Collection:**
\`\`\`json
{
"name": "users",
"attributes": [
{"key": "name", "type": "string", "size": 255, "required": true},
{"key": "email", "type": "string", "size": 255, "required": true},
{"key": "phone", "type": "string", "size": 20, "required": false},
{"key": "role", "type": "enum", "elements": ["admin", "teacher", "student"], "required": true},
{"key": "avatar", "type": "string", "size": 255, "required": false},
{"key": "status", "type": "enum", "elements": ["active", "inactive", "pending"], "required": true}
]
}
\`\`\`

**Students Collection:**
\`\`\`json
{
"name": "students",
"attributes": [
{"key": "userId", "type": "string", "size": 255, "required": true},
{"key": "studentId", "type": "string", "size": 50, "required": true},
{"key": "guardianName", "type": "string", "size": 255, "required": true},
{"key": "guardianPhone", "type": "string", "size": 20, "required": true},
{"key": "address", "type": "string", "size": 500, "required": true},
{"key": "dateOfBirth", "type": "string", "size": 20, "required": true},
{"key": "enrollmentDate", "type": "string", "size": 20, "required": true},
{"key": "status", "type": "enum", "elements": ["active", "inactive", "graduated", "suspended"], "required": true},
{"key": "level", "type": "enum", "elements": ["beginner", "intermediate", "advanced"], "required": true}
]
}
\`\`\`

**Teachers Collection:**
\`\`\`json
{
"name": "teachers",
"attributes": [
{"key": "userId", "type": "string", "size": 255, "required": true},
{"key": "teacherId", "type": "string", "size": 50, "required": true},
{"key": "qualification", "type": "string", "size": 1000, "required": true},
{"key": "experience", "type": "integer", "required": true},
{"key": "specialization", "type": "string", "array": true, "required": true},
{"key": "joinDate", "type": "string", "size": 20, "required": true},
{"key": "salary", "type": "integer", "required": false},
{"key": "status", "type": "enum", "elements": ["active", "inactive", "on_leave"], "required": true}
]
}
\`\`\`

**Classes Collection:**
\`\`\`json
{
"name": "classes",
"attributes": [
{"key": "name", "type": "string", "size": 255, "required": true},
{"key": "description", "type": "string", "size": 1000, "required": true},
{"key": "teacherId", "type": "string", "size": 255, "required": true},
{"key": "subject", "type": "string", "size": 255, "required": true},
{"key": "level", "type": "enum", "elements": ["beginner", "intermediate", "advanced"], "required": true},
{"key": "schedule", "type": "string", "array": true, "required": true},
{"key": "maxStudents", "type": "integer", "required": true},
{"key": "currentStudents", "type": "integer", "required": true},
{"key": "status", "type": "enum", "elements": ["active", "inactive", "completed"], "required": true},
{"key": "startDate", "type": "string", "size": 20, "required": true},
{"key": "endDate", "type": "string", "size": 20, "required": false}
]
}
\`\`\`

**Attendance Collection:**
\`\`\`json
{
"name": "attendance",
"attributes": [
{"key": "studentId", "type": "string", "size": 255, "required": true},
{"key": "classId", "type": "string", "size": 255, "required": true},
{"key": "date", "type": "string", "size": 20, "required": true},
{"key": "status", "type": "enum", "elements": ["present", "absent", "late", "excused"], "required": true},
{"key": "notes", "type": "string", "size": 500, "required": false}
]
}
\`\`\`

**Enrollments Collection:**
\`\`\`json
{
"name": "enrollments",
"attributes": [
{"key": "studentId", "type": "string", "size": 255, "required": true},
{"key": "classId", "type": "string", "size": 255, "required": true},
{"key": "enrollmentDate", "type": "string", "size": 20, "required": true},
{"key": "status", "type": "enum", "elements": ["active", "completed", "dropped", "pending"], "required": true},
{"key": "grade", "type": "string", "size": 10, "required": false}
]
}
\`\`\`

#### Set Permissions

For each collection, set appropriate permissions:

- **Read**: Users, Admins
- **Create**: Admins
- **Update**: Admins
- **Delete**: Admins

### 5. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy the Client ID to your `.env` file

### 6. Start Development Server

\`\`\`bash
npm run dev

# or

yarn dev
\`\`\`

Visit `http://localhost:5173` to see the application.

## 🏗️ Project Structure

\`\`\`
src/
├── components/ # Reusable UI components
│ ├── ui/ # shadcn/ui components
│ ├── layout/ # Layout components
│ └── layouts/ # Page layouts
├── config/ # Configuration files
├── hooks/ # Custom React hooks
├── lib/ # Utility libraries
│ └── appwrite/ # Appwrite services
├── pages/ # Page components
│ ├── admin/ # Admin pages
│ ├── auth/ # Authentication pages
│ └── dashboard/ # Dashboard pages
├── schemas/ # Zod validation schemas
└── types/ # TypeScript type definitions
\`\`\`

## 🔧 Configuration

### Appwrite Configuration

Update `src/config/appwrite.ts` with your Appwrite settings:

\`\`\`typescript
export const appwriteConfig = {
endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
// ... other config
}
\`\`\`

### Theme Configuration

The application supports dark/light mode switching. Customize themes in `src/components/theme-provider.tsx`.

## 📱 Features Overview

### Admin Dashboard

- **Real-time Statistics**: Student count, teacher count, class statistics
- **Recent Activities**: Live feed of system activities
- **Quick Actions**: Fast access to common tasks
- **Analytics Charts**: Visual representation of data

### Student Management

- **CRUD Operations**: Create, read, update, delete students
- **Bulk Operations**: Import/export student data
- **Advanced Filtering**: Search and filter by multiple criteria
- **Profile Management**: Complete student profiles

### Teacher Management

- **Faculty Directory**: Complete teacher database
- **Qualification Tracking**: Academic credentials management
- **Specialization Tags**: Subject expertise tracking
- **Performance Metrics**: Teaching effectiveness data

### Class Management

- **Course Creation**: Flexible course setup
- **Schedule Management**: Time slot management
- **Enrollment Tracking**: Student enrollment monitoring
- **Capacity Management**: Class size limits

### Attendance System

- **Digital Marking**: Quick attendance marking
- **Multiple Status Types**: Present, absent, late, excused
- **Bulk Operations**: Mark attendance for entire classes
- **Reporting**: Attendance reports and analytics

## 🚀 Deployment

### Build for Production

\`\`\`bash
npm run build

# or

yarn build
\`\`\`

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) - Backend-as-a-Service platform
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## 📞 Support

For support, email support@manzilinstitute.com or join our Discord community.

---

**Built with ❤️ for the Islamic education community**
\`\`\`

This completes the full A-Z premium quality madrasha management system with:

✅ **Complete Authentication System** - Google OAuth, email/password, password recovery
✅ **Full Admin Dashboard** - Real-time analytics, comprehensive management
✅ **Student Management** - Complete CRUD operations with advanced features
✅ **Teacher Management** - Faculty administration with specializations
✅ **Class Management** - Course creation with flexible scheduling
✅ **Attendance Tracking** - Digital attendance system with reporting
✅ **Premium UI/UX** - Modern design with animations and responsive layout
✅ **Complete Appwrite Integration** - Full backend functionality
✅ **Type Safety** - Complete TypeScript implementation
✅ **Production Ready** - Error handling, loading states, validation
✅ **Documentation** - Comprehensive setup and usage guide

The system is now ready for production deployment with all premium features implemented!
