
const API_BASE_URL = "http://127.0.0.1:8000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.detail || `Lỗi HTTP: ${response.status}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const getCourses = (options = {}) =>
  request("/courses", options);

export const getSections = (options = {}) =>
  request("/sections", options);

export const getEnrollments = (studentId, options = {}) =>
  request(`/students/${studentId}/enrollments`, options);

export const createEnrollment = (studentId, classSectionId) =>
  request("/enrollments", {
    method: "POST",
    body: JSON.stringify({
      student_id: studentId,
      class_section_id: classSectionId,
    }),
  });

export const deleteEnrollment = (studentId, classSectionId) =>
  request(`/enrollments/${studentId}/${classSectionId}`, {
    method: "DELETE",
  });
