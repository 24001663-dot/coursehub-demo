
import { useEffect, useState } from "react";
import {
  getCourses,
  getSections,
  getEnrollments,
  createEnrollment,
  deleteEnrollment,
} from "./services/api";

import StudentSelector from "./components/StudentSelector";
import SectionList from "./components/SectionList";
import EnrollmentList from "./components/EnrollmentList";
import StatusMessage from "./components/StatusMessage";

import "./App.css";

function App() {
  // State quản lý dữ liệu
  const [studentId, setStudentId] = useState("22000004");
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  // State quản lý trạng thái giao diện
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Lấy danh sách học phần và lớp học phần
  useEffect(() => {
    const controller = new AbortController();

    async function loadInitialData() {
      try {
        setLoading(true);
        setError("");

        const [courseData, sectionData] = await Promise.all([
          getCourses({ signal: controller.signal }),
          getSections({ signal: controller.signal }),
        ]);

        setCourses(courseData);
        setSections(sectionData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadInitialData();

    return () => controller.abort();
  }, []);

  // Lấy danh sách đăng ký khi thay đổi sinh viên
  useEffect(() => {
    const controller = new AbortController();

    async function loadEnrollments() {
      try {
        setEnrollments([]);
        const data = await getEnrollments(studentId, {
          signal: controller.signal,
        });
        setEnrollments(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    }

    loadEnrollments();

    return () => controller.abort();
  }, [studentId]);

  // Đăng ký lớp học phần
  const handleEnroll = async (classSectionId) => {
    try {
      setActionLoading(true);
      setError("");
      setMessage("");

      await createEnrollment(studentId, classSectionId);

      setMessage("Đăng ký lớp học phần thành công!");

      const [newSections, newEnrollments] = await Promise.all([
        getSections(),
        getEnrollments(studentId),
      ]);

      setSections(newSections);
      setEnrollments(newEnrollments);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Hủy đăng ký
  const handleDelete = async (classSectionId) => {
    try {
      setActionLoading(true);
      setError("");
      setMessage("");

      await deleteEnrollment(studentId, classSectionId);

      setMessage("Hủy đăng ký thành công!");

      const [newSections, newEnrollments] = await Promise.all([
        getSections(),
        getEnrollments(studentId),
      ]);

      setSections(newSections);
      setEnrollments(newEnrollments);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1>CourseHub</h1>
          <p>Hệ thống quản lý đăng ký học phần</p>
        </div>
        <span className="header-badge">Student Portal</span>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <h2>Chào mừng đến với CourseHub!</h2>
          <p>Quản lý học phần và đăng ký lớp học phần của bạn.</p>
        </section>

        <StudentSelector
          studentId={studentId}
          onStudentChange={setStudentId}
        />

        <StatusMessage
          error={error}
          message={message}
        />

        {loading ? (
          <p className="loading-text">Đang tải dữ liệu...</p>
        ) : (
          <>
            <SectionList
              courses={courses}
              sections={sections}
              enrollments={enrollments}
              onEnroll={handleEnroll}
              loading={actionLoading}
            />

            <EnrollmentList
              enrollments={enrollments}
              onDelete={handleDelete}
              loading={actionLoading}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        CourseHub – Web Database Practical Project
      </footer>
    </div>
  );
}

export default App;
