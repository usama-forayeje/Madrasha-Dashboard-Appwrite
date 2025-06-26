import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "@/api/dbService";
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
};

// Students Hooks
export function useStudents(limit = 25, offset = 0, search) {
  return useQuery({
    queryKey: [...databaseKeys.students(), { limit, offset, search }],
    queryFn: () => databaseService.getStudents(limit, offset, search),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useInfiniteStudents({ search = "" } = {}) {
  return useInfiniteQuery({
    queryKey: [...databaseKeys.students(), "infinite", { search }],

    queryFn: ({ pageParam = 0 }) => databaseService.getStudents(25, pageParam, search),

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.documents.length === 25) {
        const nextOffset = allPages.flatMap((page) => page.documents).length;
        return nextOffset;
      }

      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useStudent(studentId) {
  return useQuery({
    queryKey: databaseKeys.student(studentId),
    queryFn: () => databaseService.getStudent(studentId),
    enabled: !!studentId,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (student) => databaseService.createStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.students() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      toast.success("Student created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create student.");
      console.error("Create student error:", error);
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, updates }) => databaseService.updateStudent(studentId, updates),
    onSuccess: (_, { studentId }) => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.students() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.student(studentId) });
      toast.success("Student updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update student.");
      console.error("Update student error:", error);
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentId) => databaseService.deleteStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.students() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      toast.success("Student deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete student.");
      console.error("Delete student error:", error);
    },
  });
}

// Teachers Hooks
export function useTeachers(limit = 25, offset = 0) {
  return useQuery({
    queryKey: [...databaseKeys.teachers(), { limit, offset }],
    queryFn: () => databaseService.getTeachers(limit, offset),
    staleTime: 2 * 60 * 1000,
  });
}

export function useTeacher(teacherId) {
  return useQuery({
    queryKey: databaseKeys.teacher(teacherId),
    queryFn: () => databaseService.getTeacher(teacherId),
    enabled: !!teacherId,
  });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacher) => databaseService.createTeacher(teacher),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.teachers() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      toast.success("Teacher created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create teacher.");
      console.error("Create teacher error:", error);
    },
  });
}

export function useUpdateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teacherId, updates }) => databaseService.updateTeacher(teacherId, updates),
    onSuccess: (_, { teacherId }) => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.teachers() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.teacher(teacherId) });
      toast.success("Teacher updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update teacher.");
      console.error("Update teacher error:", error);
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacherId) => databaseService.deleteTeacher(teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.teachers() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      toast.success("Teacher deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete teacher.");
      console.error("Delete teacher error:", error);
    },
  });
}

// Classes Hooks
export function useClasses(limit = 25, offset = 0) {
  return useQuery({
    queryKey: [...databaseKeys.classes(), { limit, offset }],
    queryFn: () => databaseService.getClasses(limit, offset),
    staleTime: 2 * 60 * 1000,
  });
}

export function useClass(classId) {
  return useQuery({
    queryKey: databaseKeys.class(classId),
    queryFn: () => databaseService.getClass(classId),
    enabled: !!classId,
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classData) => databaseService.createClass(classData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.classes() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      toast.success("Class created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create class.");
      console.error("Create class error:", error);
    },
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, updates }) => databaseService.updateClass(classId, updates),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.classes() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.class(classId) });
      toast.success("Class updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update class.");
      console.error("Update class error:", error);
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classId) => databaseService.deleteClass(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.classes() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.dashboardStats() });
      toast.success("Class deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete class.");
      console.error("Delete class error:", error);
    },
  });
}

// Attendance Hooks
export function useAttendance(classId, studentId, date) {
  return useQuery({
    queryKey: databaseKeys.attendance(classId, studentId, date),
    queryFn: () => databaseService.getAttendance(classId, studentId, date),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useCreateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attendance) => databaseService.createAttendance(attendance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.all });
      toast.success("Attendance recorded successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to record attendance.");
      console.error("Create attendance error:", error);
    },
  });
}

export function useUpdateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ attendanceId, updates }) =>
      databaseService.updateAttendance(attendanceId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.all });
      toast.success("Attendance updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update attendance.");
      console.error("Update attendance error:", error);
    },
  });
}

// Enrollments Hooks
export function useEnrollments(studentId, classId) {
  return useQuery({
    queryKey: databaseKeys.enrollments(studentId, classId),
    queryFn: () => databaseService.getEnrollments(studentId, classId),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (enrollment) => databaseService.createEnrollment(enrollment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.enrollments() });
      queryClient.invalidateQueries({ queryKey: databaseKeys.classes() });
      toast.success("Student enrolled successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to enroll student.");
      console.error("Create enrollment error:", error);
    },
  });
}

export function useUpdateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ enrollmentId, updates }) =>
      databaseService.updateEnrollment(enrollmentId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: databaseKeys.enrollments() });
      toast.success("Enrollment updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update enrollment.");
      console.error("Update enrollment error:", error);
    },
  });
}

// Dashboard Stats Hook
export function useDashboardStats() {
  return useQuery({
    queryKey: databaseKeys.dashboardStats(),
    queryFn: () => databaseService.getDashboardStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}
