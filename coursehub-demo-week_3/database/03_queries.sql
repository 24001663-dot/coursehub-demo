-- 1. Xem danh sách tất cả sinh viên
SELECT * FROM students;

-- 2. Xem danh sách học phần và số tín chỉ
SELECT code, name, credits 
FROM courses 
ORDER BY credits DESC;

-- 3. Xem danh sách lớp học phần kèm tên môn học và tên giảng viên
SELECT cs.id AS ma_lop, 
       c.name AS ten_mon, 
       l.name AS giang_vien, 
       cs.capacity AS suc_chua
FROM class_sections cs
JOIN courses c ON cs.course_code = c.code
JOIN lecturers l ON cs.lecturer_id = l.id;

-- 4. Thống kê số lượng sinh viên đã đăng ký theo từng lớp
SELECT cs.id AS ma_lop, 
       c.name AS ten_mon, 
       COUNT(e.student_id) AS so_luong_dang_ky,
       cs.capacity AS suc_chua
FROM class_sections cs
JOIN courses c ON cs.course_code = c.code
LEFT JOIN enrollments e ON cs.id = e.class_section_id
GROUP BY cs.id, c.name, cs.capacity;

-- 5. Tìm sinh viên chưa đăng ký bất kỳ lớp học phần nào
SELECT s.id, s.name, s.email
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
WHERE e.student_id IS NULL;