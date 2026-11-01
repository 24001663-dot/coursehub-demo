import concurrent.futures
import requests

BASE_URL = "http://127.0.0.1:8000"

def register_student(student_id: str, class_section_id: str):
    payload = {
        "student_id": student_id,
        "class_section_id": class_section_id
    }
    response = requests.post(f"{BASE_URL}/enrollments", json=payload)
    return student_id, response.status_code, response.json()

def main():
    print("--- Bắt đầu gửi 2 request đăng ký đồng thời vào RACE-01 ---")
    
    # Gửi 2 request cùng lúc cho 2 sinh viên khác nhau vào lớp RACE-01
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        f1 = executor.submit(register_student, "22000002", "RACE-01")
        f2 = executor.submit(register_student, "22000004", "RACE-01")
        
        r1 = f1.result()
        r2 = f2.result()

    print(f"Sinh viên {r1[0]}: Status {r1[1]} -> {r1[2]}")
    print(f"Sinh viên {r2[0]}: Status {r2[1]} -> {r2[2]}")
    print("-------------------------------------------------------")

if __name__ == "__main__":
    main()