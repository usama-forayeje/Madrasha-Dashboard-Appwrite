import { Client, Account, Databases, Storage, Functions, Teams, Query } from "appwrite";

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || "",
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "",
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || "",
  // Collections
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || "",
  studentsCollectionId: import.meta.env.VITE_APPWRITE_STUDENTS_COLLECTION_ID || "",
  teachersCollectionId: import.meta.env.VITE_APPWRITE_TEACHERS_COLLECTION_ID || "",
  classesCollectionId: import.meta.env.VITE_APPWRITE_CLASSES_COLLECTION_ID || "",
  attendanceCollectionId: import.meta.env.VITE_APPWRITE_ATTENDANCE_COLLECTION_ID || "",
  enrollmentsCollectionId: import.meta.env.VITE_APPWRITE_ENROLLMENTS_COLLECTION_ID || "",
  // Storage
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID || "",
  // OAuth
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
};

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export const teams = new Teams(client);

export { client, Query };
