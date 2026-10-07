BEGIN;

-- Thêm sinh viên 22000004 vào lớp WEB-01
INSERT INTO enrollments (student_id, class_section_id)
VALUES ('22000004', 'WEB-01');

-- Kiểm tra lại View xem số lượng enrolled_count của WEB-01 có tăng không
SELECT * FROM view_class_section_status WHERE class_section_id = 'WEB-01';

-- Hoàn tác giao dịch (chưa lưu vào DB thật)
ROLLBACK;