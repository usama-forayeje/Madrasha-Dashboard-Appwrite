import { databases, appwriteConfig, Query } from "@/api/appwrite";
import { ID } from "appwrite";

export class DatabaseService {
  // Students
  async createStudent(student) {
    try {
      const newStudent = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.studentsCollectionId,
        ID.unique(),
        student
      );
      return newStudent;
    } catch (error) {
      console.error("Create student error:", error);
      throw error;
    }
  }

  async getStudents(limit = 25, offset = 0, search) {
    try {
      const queries = [Query.limit(limit), Query.offset(offset), Query.orderDesc("$createdAt")];

      if (search) {
        queries.push(Query.search("name", search));
      }

      const students = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.studentsCollectionId,
        queries
      );
      return students;
    } catch (error) {
      console.error("Get students error:", error);
      throw error;
    }
  }

  async getStudent(studentId) {
    try {
      const student = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.studentsCollectionId,
        studentId
      );
      return student;
    } catch (error) {
      console.error("Get student error:", error);
      throw error;
    }
  }

  async updateStudent(studentId, updates) {
    try {
      const updatedStudent = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.studentsCollectionId,
        studentId,
        updates
      );
      return updatedStudent;
    } catch (error) {
      console.error("Update student error:", error);
      throw error;
    }
  }

  async deleteStudent(studentId) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.studentsCollectionId,
        studentId
      );
    } catch (error) {
      console.error("Delete student error:", error);
      throw error;
    }
  }

  // Teachers
  async createTeacher(teacher) {
    try {
      const newTeacher = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.teachersCollectionId,
        ID.unique(),
        teacher
      );
      return newTeacher;
    } catch (error) {
      console.error("Create teacher error:", error);
      throw error;
    }
  }

  async getTeachers(limit = 25, offset = 0) {
    try {
      const teachers = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.teachersCollectionId,
        [Query.limit(limit), Query.offset(offset), Query.orderDesc("$createdAt")]
      );
      return teachers;
    } catch (error) {
      console.error("Get teachers error:", error);
      throw error;
    }
  }

  async getTeacher(teacherId) {
    try {
      const teacher = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.teachersCollectionId,
        teacherId
      );
      return teacher;
    } catch (error) {
      console.error("Get teacher error:", error);
      throw error;
    }
  }

  async updateTeacher(teacherId, updates) {
    try {
      const updatedTeacher = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.teachersCollectionId,
        teacherId,
        updates
      );
      return updatedTeacher;
    } catch (error) {
      console.error("Update teacher error:", error);
      throw error;
    }
  }

  async deleteTeacher(teacherId) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.teachersCollectionId,
        teacherId
      );
    } catch (error) {
      console.error("Delete teacher error:", error);
      throw error;
    }
  }

  // Classes
  async createClass(classData) {
    try {
      const newClass = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.classesCollectionId,
        ID.unique(),
        classData
      );
      return newClass;
    } catch (error) {
      console.error("Create class error:", error);
      throw error;
    }
  }

  async getClasses(limit = 25, offset = 0) {
    try {
      const classes = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.classesCollectionId,
        [Query.limit(limit), Query.offset(offset), Query.orderDesc("$createdAt")]
      );
      return classes;
    } catch (error) {
      console.error("Get classes error:", error);
      throw error;
    }
  }

  async getClass(classId) {
    try {
      const classData = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.classesCollectionId,
        classId
      );
      return classData;
    } catch (error) {
      console.error("Get class error:", error);
      throw error;
    }
  }

  async updateClass(classId, updates) {
    try {
      const updatedClass = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.classesCollectionId,
        classId,
        updates
      );
      return updatedClass;
    } catch (error) {
      console.error("Update class error:", error);
      throw error;
    }
  }

  async deleteClass(classId) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.classesCollectionId,
        classId
      );
    } catch (error) {
      console.error("Delete class error:", error);
      throw error;
    }
  }

  // Attendance
  async createAttendance(attendance) {
    try {
      const newAttendance = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.attendanceCollectionId,
        ID.unique(),
        attendance
      );
      return newAttendance;
    } catch (error) {
      console.error("Create attendance error:", error);
      throw error;
    }
  }

  async getAttendance(classId, studentId, date) {
    try {
      const queries = [Query.orderDesc("$createdAt")];

      if (classId) queries.push(Query.equal("classId", classId));
      if (studentId) queries.push(Query.equal("studentId", studentId));
      if (date) queries.push(Query.equal("date", date));

      const attendance = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.attendanceCollectionId,
        queries
      );
      return attendance;
    } catch (error) {
      console.error("Get attendance error:", error);
      throw error;
    }
  }

  async updateAttendance(attendanceId, updates) {
    try {
      const updatedAttendance = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.attendanceCollectionId,
        attendanceId,
        updates
      );
      return updatedAttendance;
    } catch (error) {
      console.error("Update attendance error:", error);
      throw error;
    }
  }

  // Enrollments
  async createEnrollment(enrollment) {
    try {
      const newEnrollment = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.enrollmentsCollectionId,
        ID.unique(),
        enrollment
      );
      return newEnrollment;
    } catch (error) {
      console.error("Create enrollment error:", error);
      throw error;
    }
  }

  async getEnrollments(studentId, classId) {
    try {
      const queries = [Query.orderDesc("$createdAt")];

      if (studentId) queries.push(Query.equal("studentId", studentId));
      if (classId) queries.push(Query.equal("classId", classId));

      const enrollments = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.enrollmentsCollectionId,
        queries
      );
      return enrollments;
    } catch (error) {
      console.error("Get enrollments error:", error);
      throw error;
    }
  }

  async updateEnrollment(enrollmentId, updates) {
    try {
      const updatedEnrollment = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.enrollmentsCollectionId,
        enrollmentId,
        updates
      );
      return updatedEnrollment;
    } catch (error) {
      console.error("Update enrollment error:", error);
      throw error;
    }
  }

  // Analytics
  async getDashboardStats() {
    try {
      const [students, teachers, classes, todayAttendance] = await Promise.all([
        this.getStudents(1000),
        this.getTeachers(1000),
        this.getClasses(1000),
        this.getAttendance(undefined, undefined, new Date().toISOString().split("T")[0]),
      ]);

      const activeStudents = students.documents.filter((s) => s.status === "active").length;
      const activeTeachers = teachers.documents.filter((t) => t.status === "active").length;
      const activeClasses = classes.documents.filter((c) => c.status === "active").length;

      const presentToday = todayAttendance.documents.filter((a) => a.status === "present").length;
      const totalTodayAttendance = todayAttendance.documents.length;
      const attendanceRate =
        totalTodayAttendance > 0 ? (presentToday / totalTodayAttendance) * 100 : 0;

      return {
        totalStudents: students.total,
        activeStudents,
        totalTeachers: teachers.total,
        activeTeachers,
        totalClasses: classes.total,
        activeClasses,
        attendanceRate: Math.round(attendanceRate * 100) / 100,
      };
    } catch (error) {
      console.error("Get dashboard stats error:", error);
      throw error;
    }
  }
}

export const databaseService = new DatabaseService();
