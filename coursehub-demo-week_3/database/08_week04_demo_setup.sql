-- Thêm lớp học phần RACE-01 có sức chứa capacity = 1
INSERT INTO class_sections (id, course_code, semester_code, lecturer_id, capacity)
VALUES ('RACE-01', 'INT2204', '2026-1', 'GV01', 1)
ON CONFLICT (id) DO UPDATE
SET capacity = EXCLUDED.capacity;

-- Xóa đăng ký cũ của RACE-01 (nếu có) để đưa về 0 đăng ký
DELETE FROM enrollments
WHERE class_section_id = 'RACE-01';

-- Xóa nhật ký sự kiện demo cũ của RACE-01
DELETE FROM enrollment_events
WHERE class_section_id = 'RACE-01'
  AND dataset = 'demo';

-- Kiểm tra lại trạng thái lớp RACE-01 sau khi setup
SELECT class_id, capacity, enrolled, remaining
FROM v_section_summary
WHERE class_id = 'RACE-01';