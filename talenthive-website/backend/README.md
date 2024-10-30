

### các bước cấu hình project với typescript và mongoose

- Tạo file tsconfig.json
sử dụng command line
```bash
npx tsc --init
```

- Để sử dụng typescript cần install các packages sau: 
    - "@types/cors": "^2.8.17",
    - "@types/express": "^5.0.0",
    - "@types/node": "^22.8.1",
    - "ts-node-dev": "^2.0.0",
    - "typescript": "^5.6.3"
    - ...

- Thêm scripts trong `package.json` file:
```json
"start": "ts-node-dev --respawn --transpile-only ./src/server.ts"
```
Trong đó:
- --respawn: để đảm bảo ts-node-dev khởi động lại ứng dụng từ đầu khi các các file config được thay đổi
    - Ví dụ: 
        * Khi bạn thay đổi một số biến cấu hình quan trọng trong `.env`.
        * Khi mã khởi tạo phức tạp và cần reset hoàn toàn.”
- --transpile-only: để yêu cầu ts-node chỉ chuyển đổi mã TypeScript sang JavaScript mà không thực hiện kiểm tra kiểu (type-checking). Tránh các lỗi không mong muốn

### Luồng hoạt động của mongoose
- File server.ts sẽ là file chạy đầu tiên
- Trong file server.ts có import config database file, từ đó mongoose đã nhận được cloud server database
- về sau chỉ việc gọi model và xem mỗi model như một collection trong db (logic chạy quá chi là thoải mái)

### Để cấu hình file .env

- Tạo file .env

- Thực hiện copy nội dung trong file .env.example qua file .env

- Điền các value tương ứng từng key












