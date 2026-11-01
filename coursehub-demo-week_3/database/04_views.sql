CREATE OR REPLACE VIEW view_class_section_status AS
SELECT 
    cs.id AS class_section_id,
    c.name AS course_name,
    l.name AS lecturer_name,
    cs.capacity,
    COUNT(e.student_id) AS enrolled_count,
    (cs.capacity - COUNT(e.student_id)) AS remaining_seats
FROM class_sections cs
JOIN courses c ON cs.course_code = c.code
JOIN lecturers l ON cs.lecturer_id = l.id
LEFT JOIN enrollments e ON cs.id = e.class_section_id
GROUP BY cs.id, c.name, l.name, cs.capacity;

-- Truy vấn kiểm tra View
SELECT * FROM view_class_section_status;