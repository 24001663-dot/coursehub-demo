students = [
    {"id": "22000001", "name": "Nguyen Minh Anh", "major": "KHDL"},
    {"id": "22000002", "name": "Tran Duc Long", "major": "KHDL"},
]

courses = [
    {
        "code": "INT2204",
        "name": "Co so du lieu Web va he thong thong tin",
        "capacity": 3,
        "enrolled": 2,
    },
    {
        "code": "INT2205",
        "name": "Khai pha du lieu",
        "capacity": 2,
        "enrolled": 2,
    },
]

enrollments = [
    {"student_id": "22000001", "course_code": "INT2204"}
]


def enroll_student(student_id, course_code):
    student_exists = any(s["id"] == student_id for s in students)
    if not student_exists:
        return False, f"Lỗi: Sinh viên có mã {student_id} không tồn tại!"

    target_course = None
    for c in courses:
        if c["code"] == course_code:
            target_course = c
            break

    if target_course is None:
        return False, f"Lỗi: Học phần {course_code} không tồn tại!"

    is_already_enrolled = any(
        e["student_id"] == student_id and e["course_code"] == course_code
        for e in enrollments
    )
    if is_already_enrolled:
        return False, f"Lỗi: Sinh viên {student_id} đã đăng ký học phần {course_code} trước đó!"

    if target_course["enrolled"] >= target_course["capacity"]:
        return False, f"Lỗi: Học phần {course_code} đã hết chỗ (Sĩ số đã đầy)!"

    enrollments.append({"student_id": student_id, "course_code": course_code})
    target_course["enrolled"] += 1

    return True, f"Đăng ký thành công học phần {course_code} cho sinh viên {student_id}!"


success, message = enroll_student("22000002", "INT2204")
print(message)

success, message = enroll_student("99999999", "INT2204")
print(message)

success, message = enroll_student("22000002", "INT2205")
print(message)

success, message = enroll_student("22000002", "INT2204")
print(message)

# --- 2. KIỂM TRA CHƯƠNG TRÌNH (5 TINH HUONG) ---

print("--- BẮT ĐẦU KIỂM THỬ ---")

# Tình huống 1: Đăng ký thành công
# (Sinh viên 22000002 đăng ký học phần INT2204 - còn 1 chỗ)
print("\n[TH 1] Đăng ký thành công:")
success, msg = enroll_student("22000002", "INT2204")
print(f"Kết quả: {msg}")

# Tình huống 2: Đăng ký trùng
# (Sinh viên 22000001 thử đăng ký lại INT2204 - học phần đã đăng ký từ trước)
print("\n[TH 2] Đăng ký trùng:")
success, msg = enroll_student("22000001", "INT2204")
print(f"Kết quả: {msg}")

# Tình huống 3: Lớp đầy (Hết chỗ)
# (Sinh viên 22000002 đăng ký INT2205 - học phần đã đầy 2/2)
print("\n[TH 3] Lớp đã đầy:")
success, msg = enroll_student("22000002", "INT2205")
print(f"Kết quả: {msg}")

# Tình huống 4: Mã học phần không tồn tại
# (Sinh viên 22000001 đăng ký học phần INT9999)
print("\n[TH 4] Mã học phần không tồn tại:")
success, msg = enroll_student("22000001", "INT9999")
print(f"Kết quả: {msg}")

# Tình huống 5: Mã sinh viên không tồn tại
# (Sinh viên 99999999 đăng ký INT2204)
print("\n[TH 5] Mã sinh viên không tồn tại:")
success, msg = enroll_student("99999999", "INT2204")
print(f"Kết quả: {msg}")