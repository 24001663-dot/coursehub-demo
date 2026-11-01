DELETE FROM enrollment_events
WHERE dataset = &#39;performance&#39;;
INSERT INTO enrollment_events
(student_id, class_section_id, event_type,
source, dataset, occurred_at)
SELECT
(ARRAY[&#39;22000001&#39;,&#39;22000002&#39;,&#39;22000003&#39;,&#39;22000004&#39;])
[1 + (g % 4)::INTEGER],
(ARRAY[&#39;WEB-01&#39;,&#39;WEB-02&#39;,&#39;DM-01&#39;,&#39;PY-01&#39;])
[1 + (g % 4)::INTEGER],
CASE WHEN g % 5 = 0 THEN &#39;CANCELLED&#39; ELSE &#39;CREATED&#39; END,
&#39;generator&#39;,
&#39;performance&#39;,
TIMESTAMP &#39;2025-01-01 00:00:00&#39;
+ (g % 365) * INTERVAL &#39;1 day&#39;
+ (g % 86400) * INTERVAL &#39;1 second&#39;
FROM generate_series(1, 100000) AS g;
ANALYZE enrollment_events;
SELECT dataset, COUNT(*) AS row_count
FROM enrollment_events
GROUP BY dataset
ORDER BY dataset;