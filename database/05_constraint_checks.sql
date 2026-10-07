-- 1. Thử vi phạm UNIQUE (Email trùng)
INSERT INTO students (id, name, major, email) 
VALUES ('22000005', 'Nguoi Dung Trung Email', 'KHDL', 'anh@example.com');

-- 2. Thử vi phạm CHECK length(id) = 8 (Mã sinh viên không đủ 8 ký tự)
INSERT INTO students (id, name, major, email) 
VALUES ('12345', 'Mien Nam', 'KHDL', 'nam2@example.com');

-- 3. Thử vi phạm FOREIGN KEY (Thêm đăng ký cho lớp không tồn tại)
INSERT INTO enrollments (student_id, class_section_id) 
VALUES ('22000001', 'LOP-KHONG-TON-TAI');