
function EnrollmentList({ enrollments, onDelete, loading }) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <h2>Học phần đã đăng ký</h2>
          <p>Danh sách lớp học phần bạn đang tham gia.</p>
        </div>

        <span>{enrollments.length} lớp đã đăng ký</span>
      </div>

      {enrollments.length === 0 ? (
        <div className="empty-state">
          <h3>Chưa có học phần nào</h3>
          <p>
            Bạn chưa đăng ký lớp học phần nào.
            Hãy chọn một lớp ở danh sách phía trên.
          </p>
        </div>
      ) : (
        <div className="enrollment-list">
          {enrollments.map((item) => (
            <article
              className="enrollment-card"
              key={item.class_section_id}
            >
              <div className="enrollment-info">
                <span className="course-code">
                  {item.course_code}
                </span>

                <h3>{item.course_name}</h3>

                <p>Mã lớp: {item.class_section_id}</p>
                <p>Sinh viên: {item.student_name}</p>

                <p>
                  Ngày đăng ký:{" "}
                  {item.registered_at
                    ? new Date(item.registered_at).toLocaleString(
                        "vi-VN"
                      )
                    : "Không có thông tin"}
                </p>
              </div>

              <button
                className="cancel-button"
                disabled={loading}
                onClick={() => {
                  const confirmed = window.confirm(
                    `Bạn có chắc muốn hủy lớp ${item.class_section_id}?`
                  );

                  if (confirmed) {
                    onDelete(item.class_section_id);
                  }
                }}
              >
                {loading ? "Đang xử lý..." : "Hủy đăng ký"}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default EnrollmentList;
