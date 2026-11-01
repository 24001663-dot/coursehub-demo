EXPLAIN (ANALYZE, BUFFERS)
SELECT id, student_id, class_section_id, event_type, occurred_at
FROM enrollment_events
WHERE dataset = &#39;performance&#39;
AND student_id = &#39;22000001&#39;
AND occurred_at &gt;= TIMESTAMP &#39;2025-12-20 00:00:00&#39;
ORDER BY occurred_at DESC
LIMIT 50;