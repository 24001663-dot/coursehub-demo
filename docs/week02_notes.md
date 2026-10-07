# Ghi chú thực hành Buổi 2: Thiết kế CSDL CourseHub & Truy vấn SQL

## 1. Cấu trúc CSDL (6 bảng)
- **`students`**: Lưu thông tin sinh viên (`id`, `name`, `major`, `email`).
- **`courses`**: Lưu thông tin môn học/học phần (`code`, `name`, `credits`).
- **`semesters`**: Lưu danh sách học kỳ (`code`, `name`, `start_date`, `end_date`).
- **`lecturers`**: Lưu thông tin giảng viên (`id`, `name`).
- **`class_sections`**: Lưu các lớp học phần mở theo kỳ (`id`, `course_code`, `semester_code`, `lecturer_id`, `capacity`).
- **`enrollments`**: Lưu thông tin đăng ký học (`student_id`, `class_section_id`, `registered_at`).

## 2. Các ràng buộc dữ liệu đã thiết lập
- **PRIMARY KEY**: Khóa chính cho tất cả các bảng (mã sinh viên, mã môn, mã lớp...).
- **FOREIGN KEY**: Liên kết giữa các bảng (`class_sections` $\rightarrow$ `courses`, `lecturers`, `semesters`; `enrollments` $\rightarrow$ `students`, `class_sections`).
- **UNIQUE**: Đảm bảo `email` sinh viên không bị trùng lặp (`uq_students_email`).
- **CHECK**: 
  - Độ dài mã sinh viên bằng 8 ký tự (`ck_students_id`).
  - Tên sinh viên không được để khoảng trắng/rỗng (`ck_students_name`).
  - Số tín chỉ từ 1 đến 6 (`ck_courses_credits`).
  - Sức chứa lớp lớn hơn 0 (`ck_sections_capacity`).

## 3. Kết quả thử nghiệm & View
- Đã tạo View **`view_class_section_status`** tổng hợp thông tin lớp, giảng viên, số lượng sinh viên đã đăng ký và số chỗ còn trống.
- Đã thử nghiệm các lỗi vi phạm ràng buộc DDL (trùng email, sai độ dài mã sinh viên, mã lớp không tồn tại) và xác nhận PostgreSQL chặn chính xác.
- Đã thử nghiệm giao dịch `BEGIN ... ROLLBACK;` để đảm bảo an toàn dữ liệu khi thao tác thử.