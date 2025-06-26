import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "@/api/dbService";
import { useDeferredValue } from 'react';
import { toast } from "sonner";

// Query Keys
export const databaseKeys = {
  all: ["database"],
  students: () => [...databaseKeys.all, "students"],
  student: (id) => [...databaseKeys.students(), id],
  teachers: () => [...databaseKeys.all, "teachers"],
  teacher: (id) => [...databaseKeys.teachers(), id],
  classes: () => [...databaseKeys.all, "classes"],
  class: (id) => [...databaseKeys.classes(), id],
  attendance: (classId, studentId, date) => [
    ...databaseKeys.all,
    "attendance",
    { classId, studentId, date },
  ],
  enrollments: (studentId, classId) => [...databaseKeys.all, "enrollments", { studentId, classId }],
  dashboardStats: () => [...databaseKeys.all, "dashboard-stats"],
  analytics: () => [...databaseKeys.all, "analytics"],
};

// Helper function for error handling
function getDatabaseErrorMessage(error) {
  if (error?.message) {
    return error.message;
  }
  if (error?.code === 401) {
    return "Unauthorized access. Please log in again.";
  }
  if (error?.code === 404) {
    return "No data found.";
  }
  if (error?.code === 409) {
    return "Already exists.";
  }
  return "Something went wrong. Please try again later.";
}

// Students Hooks
export function useStudents(limit = 25, offset = 0, search) {
  const deferredSearch = useDeferredValue(search);
  
  return useQuery({
    queryKey: [...databaseKeys.students(), { limit, offset, search: deferredSearch }],
    queryFn: () => databaseService.getStudents(limit, offset, deferredSearch),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    meta: {
      requiresAuth: true
    }
  });
}

export function useInfiniteStudents({ search = "" } = {}) {
  const deferredSearch = useDeferredValue(search);
  
  return useInfiniteQuery({
    queryKey: [...databaseKeys.students(), "infinite", { search: deferredSearch }],
    queryFn: ({ pageParam = 0 }) => databaseService.getStudents(25, pageParam, deferredSearch),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.documents.length === 25) {
        return allPages.flatMap(page => page.documents).length;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: deferredSearch.length >= 0,
    meta: {
      requiresAuth: true
    }
  });
}

export function useStudent(studentId) {
  return useQuery({
    queryKey: databaseKeys.student(studentId),
    queryFn: () => databaseService.getStudent(studentId),
    enabled: !!studentId,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    meta: {
      requiresAuth: true
    }
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (student) => databaseService.createStudent(student),
    onMutate: () => {
      toast.loading("Student is being created...", { id: "create-student" });
    },
    onSuccess: (newStudent) => {
      toast.dismiss("create-student");
      
      queryClient.setQueryData(databaseKeys.student(newStudent.$id), newStudent);
      queryClient.invalidateQueries({ queryKey: databaseKeys.students() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      
      toast.success("Student created successfully!");
    },
    onError: (error) => {
      toast.dismiss("create-student");
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, updates }) => databaseService.updateStudent(studentId, updates),
    onMutate: async ({ studentId, updates }) => {
      toast.loading("Student is being updated...", { id: "update-student" });
      
      await queryClient.cancelQueries({ queryKey: databaseKeys.student(studentId) });
      
      const previousStudent = queryClient.getQueryData(databaseKeys.student(studentId));
      
      queryClient.setQueryData(databaseKeys.student(studentId), (old) => ({
        ...old,
        ...updates,
        $updatedAt: new Date().toISOString()
      }));
      
      return { previousStudent };
    },
    onSuccess: (updatedStudent, { studentId }) => {
      toast.dismiss("update-student");
      
      queryClient.setQueryData(databaseKeys.student(studentId), updatedStudent);
      queryClient.invalidateQueries({ queryKey: databaseKeys.students() });
      
      toast.success("Student updated successfully!");
    },
    onError: (error, { studentId }, context) => {
      toast.dismiss("update-student");
      
      if (context?.previousStudent) {
        queryClient.setQueryData(databaseKeys.student(studentId), context.previousStudent);
      }
      
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentId) => databaseService.deleteStudent(studentId),
    onMutate: async (studentId) => {
      toast.loading("Student is being deleted...", { id: "delete-student" });
      
      await queryClient.cancelQueries({ queryKey: databaseKeys.student(studentId) });
      
      const previousStudent = queryClient.getQueryData(databaseKeys.student(studentId));
      
      queryClient.removeQueries({ queryKey: databaseKeys.student(studentId) });
      
      return { previousStudent };
    },
    onSuccess: () => {
      toast.dismiss("delete-student");
      
      queryClient.invalidateQueries({ queryKey: databaseKeys.students() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.enrollments() });
      
      toast.success("Student deleted successfully!");
    },
    onError: (error, studentId, context) => {
      toast.dismiss("delete-student");
      
      if (context?.previousStudent) {
        queryClient.setQueryData(databaseKeys.student(studentId), context.previousStudent);
      }
      
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}


// Teachers Hooks
export function useTeachers(limit = 25, offset = 0) {
  return useQuery({
    queryKey: [...databaseKeys.teachers(), { limit, offset }],
    queryFn: () => databaseService.getTeachers(limit, offset),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    meta: {
      requiresAuth: true
    }
  });
}

export function useTeacher(teacherId) {
  return useQuery({
    queryKey: databaseKeys.teacher(teacherId),
    queryFn: () => databaseService.getTeacher(teacherId),
    enabled: !!teacherId,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    meta: {
      requiresAuth: true
    }
  });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacher) => databaseService.createTeacher(teacher),
    onMutate: () => {
      toast.loading("Teacher is being created...", { id: "create-teacher" });
    },
    onSuccess: (newTeacher) => {
      toast.dismiss("create-teacher");
      
      queryClient.setQueryData(databaseKeys.teacher(newTeacher.$id), newTeacher);
      queryClient.invalidateQueries({ queryKey: databaseKeys.teachers() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      
      toast.success("Teacher created successfully!");
    },
    onError: (error) => {
      toast.dismiss("create-teacher");
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useUpdateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teacherId, updates }) => databaseService.updateTeacher(teacherId, updates),
    onMutate: async ({ teacherId, updates }) => {
      toast.loading("Teacher is being updated...", { id: "update-teacher" });
      
      await queryClient.cancelQueries({ queryKey: databaseKeys.teacher(teacherId) });
      
      const previousTeacher = queryClient.getQueryData(databaseKeys.teacher(teacherId));
      
      queryClient.setQueryData(databaseKeys.teacher(teacherId), (old) => ({
        ...old,
        ...updates,
        $updatedAt: new Date().toISOString()
      }));
      
      return { previousTeacher };
    },
    onSuccess: (updatedTeacher, { teacherId }) => {
      toast.dismiss("update-teacher");
      
      queryClient.setQueryData(databaseKeys.teacher(teacherId), updatedTeacher);
      queryClient.invalidateQueries({ queryKey: databaseKeys.teachers() });
      
      toast.success("Teacher updated successfully!");
    },
    onError: (error, { teacherId }, context) => {
      toast.dismiss("update-teacher");
      
      if (context?.previousTeacher) {
        queryClient.setQueryData(databaseKeys.teacher(teacherId), context.previousTeacher);
      }
      
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacherId) => databaseService.deleteTeacher(teacherId),
    onMutate: async (teacherId) => {
      toast.loading("Teacher is being deleted...", { id: "delete-teacher" });
      
      await queryClient.cancelQueries({ queryKey: databaseKeys.teacher(teacherId) });
      
      const previousTeacher = queryClient.getQueryData(databaseKeys.teacher(teacherId));
      
      queryClient.removeQueries({ queryKey: databaseKeys.teacher(teacherId) });
      
      return { previousTeacher };
    },
    onSuccess: () => {
      toast.dismiss("delete-teacher");
      
      queryClient.invalidateQueries({ queryKey: databaseKeys.teachers() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      
      toast.success("Teacher deleted successfully!");
    },
    onError: (error, teacherId, context) => {
      toast.dismiss("delete-teacher");
      
      if (context?.previousTeacher) {
        queryClient.setQueryData(databaseKeys.teacher(teacherId), context.previousTeacher);
      }
      
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Classes Hooks
export function useClasses(limit = 25, offset = 0) {
  return useQuery({
    queryKey: [...databaseKeys.classes(), { limit, offset }],
    queryFn: () => databaseService.getClasses(limit, offset),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    meta: {
      requiresAuth: true
    }
  });
}

export function useClass(classId) {
  return useQuery({
    queryKey: databaseKeys.class(classId),
    queryFn: () => databaseService.getClass(classId),
    enabled: !!classId,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    meta: {
      requiresAuth: true
    }
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classData) => databaseService.createClass(classData),
    onMutate: () => {
      toast.loading("Class is being created...", { id: "create-class" });
    },
    onSuccess: (newClass) => {
      toast.dismiss("create-class");
      
      queryClient.setQueryData(databaseKeys.class(newClass.$id), newClass);
      queryClient.invalidateQueries({ queryKey: databaseKeys.classes() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      
      toast.success("Class created successfully!");
    },
    onError: (error) => {
      toast.dismiss("create-class");
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, updates }) => databaseService.updateClass(classId, updates),
    onMutate: async ({ classId, updates }) => {
      toast.loading("ক্লাস আপডেট হচ্ছে...", { id: "update-class" });
      
      await queryClient.cancelQueries({ queryKey: databaseKeys.class(classId) });
      
      const previousClass = queryClient.getQueryData(databaseKeys.class(classId));
      
      queryClient.setQueryData(databaseKeys.class(classId), (old) => ({
        ...old,
        ...updates,
        $updatedAt: new Date().toISOString()
      }));
      
      return { previousClass };
    },
    onSuccess: (updatedClass, { classId }) => {
      toast.dismiss("update-class");
      
      queryClient.setQueryData(databaseKeys.  
      queryClient.invalidateQueries({ queryKey: databaseKeys.classes() })
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() })
      
      toast.success("Class updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update class.");
      console.error("Update class error:", error);
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacherId) => databaseService.deleteTeacher(teacherId),
    onMutate: async (teacherId) => {
      toast.loading("Teacher is being deleted...", { id: "delete-teacher" });
      
      await queryClient.cancelQueries({ queryKey: databaseKeys.teacher(teacherId) });
      
      const previousTeacher = queryClient.getQueryData(databaseKeys.teacher(teacherId));
      
      queryClient.removeQueries({ queryKey: databaseKeys.teacher(teacherId) });
      
      return { previousTeacher };
    },
    onSuccess: () => {
      toast.dismiss("delete-teacher");
      
      queryClient.invalidateQueries({ queryKey: databaseKeys.teachers() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      
      toast.success("Teacher deleted successfully!");
    },
    onError: (error, teacherId, context) => {
      toast.dismiss("delete-teacher");
      
      if (context?.previousTeacher) {
        queryClient.setQueryData(databaseKeys.teacher(teacherId), context.previousTeacher);
      }
      
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Attendance Hooks
export function useAttendance(classId, date) {
  return useQuery({
    queryKey: databaseKeys.attendance(classId, null, date),
    queryFn: () => databaseService.getAttendance(classId, date),
    enabled: !!classId && !!date,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    meta: {
      requiresAuth: true
    }
  });
}

export function useMarkAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, studentId, date, status, notes }) => 
      databaseService.markAttendance(classId, studentId, date, status, notes),
    onMutate: () => {
      toast.loading("Attendance is being recorded...", { id: "mark-attendance" });
    },
    onSuccess: (_, { classId, date }) => {
      toast.dismiss("mark-attendance");
      
      queryClient.invalidateQueries({ 
        queryKey: databaseKeys.attendance(classId, null, date) 
      });
      queryClient.invalidateQueries({ queryKey: databaseKeys.analytics() });
      
      toast.success("Attendance recorded successfully!");
    },
    onError: (error) => {
      toast.dismiss("mark-attendance");
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useBulkMarkAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, date, attendanceRecords }) => 
      databaseService.bulkMarkAttendance(classId, date, attendanceRecords),
    onMutate: () => {
      toast.loading("All attendance is being recorded...", { id: "bulk-attendance" });
    },
    onSuccess: (_, { classId, date }) => {
      toast.dismiss("bulk-attendance");
      
      queryClient.invalidateQueries({ 
        queryKey: databaseKeys.attendance(classId, null, date) 
      });
      queryClient.invalidateQueries({ queryKey: databaseKeys.analytics() });
      
      toast.success("All attendance recorded successfully!");
    },
    onError: (error) => {
      toast.dismiss("bulk-attendance");
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Enrollments Hooks
export function useEnrollments(studentId, classId) {
  return useQuery({
    queryKey: databaseKeys.enrollments(studentId, classId),
    queryFn: () => databaseService.getEnrollments(studentId, classId),
    enabled: !!studentId || !!classId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    meta: {
      requiresAuth: true
    }
  });
}

export function useCreateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, classId, enrollmentDate }) => 
      databaseService.createEnrollment(studentId, classId, enrollmentDate),
    onMutate: () => {
      toast.loading("Enrollment is being created...", { id: "create-enrollment" });
    },
    onSuccess: () => {
      toast.dismiss("create-enrollment");
      
      queryClient.invalidateQueries({ queryKey: databaseKeys.enrollments() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.students() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.classes() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      
      toast.success("Enrollment created successfully!");
    },
    onError: (error) => {
      toast.dismiss("create-enrollment");
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useDeleteEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (enrollmentId) => databaseService.deleteEnrollment(enrollmentId),
    onMutate: () => {
      toast.loading("Enrollments are being deleted...", { id: "delete-enrollment" });
    },
    onSuccess: () => {
      toast.dismiss("delete-enrollment");
      
      queryClient.invalidateQueries({ queryKey: databaseKeys.enrollments() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.students() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.classes() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      
      toast.success("Enrollments deleted successfully!");
    },
    onError: (error) => {
      toast.dismiss("delete-enrollment");
      const errorMessage = getDatabaseErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Dashboard and Analytics Hooks
export function useDashboardStats() {
  return useQuery({
    queryKey: databaseKeys.dashboardStats(),
    queryFn: () => databaseService.getDashboardStats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    meta: {
      requiresAuth: true
    }
  });
}

export function useAnalytics(dateRange) {
  return useQuery({
    queryKey: [...databaseKeys.analytics(), { dateRange }],
    queryFn: () => databaseService.getAnalytics(dateRange),
    enabled: !!dateRange,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    meta: {
      requiresAuth: true
    }
  });
}