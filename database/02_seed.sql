-- 1. Nhập sinh viên
INSERT INTO students (id, name, major, email) VALUES
('22000001', 'Nguyen Minh Anh', 'KHDL', 'anh@example.com'),
('22000002', 'Tran Duc Long', 'KHDL', 'long@example.com'),
('22000003', 'Pham Thu Ha', 'KHDL', 'ha@example.com'),
('22000004', 'Le Hoang Nam', 'KHDL', 'nam@example.com');

-- 2. Nhập học phần
INSERT INTO courses (code, name, credits) VALUES
('INT2204', 'Co so du lieu Web va he thong thong tin', 3),
('INT2205', 'Khai pha du lieu', 3),
('INT2206', 'Lap trinh Python', 2);

-- 3. Nhập học kỳ
INSERT INTO semesters (code, name, start_date, end_date) VALUES
('2025-2026.1', 'Hoc ky 1 nam hoc 2025-2026', '2025-09-01', '2026-01-15');

-- 4. Nhập giảng viên
INSERT INTO lecturers (id, name) VALUES
('LEC01', 'Vu Tien Dung'),
('LEC02', 'Pham Duy Phuong');

-- 5. Nhập lớp học phần
INSERT INTO class_sections (id, course_code, semester_code, lecturer_id, capacity) VALUES
('WEB-01', 'INT2204', '2025-2026.1', 'LEC01', 30),
('WEB-02', 'INT2204', '2025-2026.1', 'LEC01', 25),
('DM-01', 'INT2205', '2025-2026.1', 'LEC02', 40),
('PY-01', 'INT2206', '2025-2026.1', 'LEC02', 35);

-- 6. Nhập đăng ký
INSERT INTO enrollments (student_id, class_section_id) VALUES
('22000001', 'WEB-01'),
('22000002', 'WEB-01'),
('22000003', 'WEB-02'),
('22000003', 'DM-01');