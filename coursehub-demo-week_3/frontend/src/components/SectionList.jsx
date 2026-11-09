
function SectionList({
  courses,
  sections,
  enrollments,
  onEnroll,
  loading,
}) {
  const registeredSectionIds = enrollments.map(
    (item) => item.class_section_id
  );

  if (sections.length === 0) {
    return (
      <section className="content-section">
        <h2>Danh sách lớp học phần</h2>
        <p>Hiện chưa có lớp học phần nào.</p>
      </section>
    );
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <h2>Danh sách lớp học phần</h2>
          <p>Chọn lớp học phần phù hợp để đăng ký.</p>
        </div>
        <span>{sections.length} lớp học phần</span>
      </div>

      <div className="section-grid">
        {sections.map((section) => {
          const isRegistered = registeredSectionIds.includes(
            section.class_id
          );

          const course = courses.find(
            (item) => item.code === section.course_code
          );

          return (
            <article className="section-card" key={section.class_id}>
              <div className="section-card-header">
                <span className="course-code">
                  {section.course_code}
                </span>

                <span
                  className={
                    section.remaining > 0
                      ? "availability available"
                      : "availability full"
                  }
                >
                  {section.remaining > 0 ? "Còn chỗ" : "Đã đầy"}
                </span>
              </div>

              <h3>{course?.name || section.course_code}</h3>

              <p className="class-id">
                Mã lớp: {section.class_id}
              </p>

              <div className="section-stats">
                <span>
                  Đã đăng ký: <strong>{section.enrolled}</strong>
                </span>
                <span>
                  Sức chứa: <strong>{section.capacity}</strong>
                </span>
                <span>
                  Còn lại: <strong>{section.remaining}</strong>
                </span>
              </div>

              <button
                className={
                  isRegistered
                    ? "register-button registered"
                    : "register-button"
                }
                disabled={
                  loading ||
                  isRegistered ||
                  section.remaining <= 0
                }
                onClick={() => onEnroll(section.class_id)}
              >
                {isRegistered
                  ? "Đã đăng ký"
                  : section.remaining <= 0
                    ? "Hết chỗ"
                    : loading
                      ? "Đang xử lý..."
                      : "Đăng ký lớp"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SectionList;
