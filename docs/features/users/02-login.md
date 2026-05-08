<feature>
  <meta>
    <id>user_login</id>
    <title>Đăng nhập (Login)</title>
    <group>Users</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User đăng nhập bằng username/email và password. Hệ thống cấp JWT token
    để xác thực các request tiếp theo. Mọi route (trừ public routes)
    đều yêu cầu đăng nhập.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>nhập username/email và password, nhấn Login</action>
      <benefit>truy cập hệ thống và sử dụng các tính năng</benefit>
    </story>
    <story id="US-02">
      <actor>User chưa đăng nhập</actor>
      <action>truy cập bất kỳ trang nào</action>
      <benefit>tự động redirect về trang login</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/auth/login { username, password } → trả JWT token
- [x] Token có thời hạn (mặc định 24h), hết hạn → redirect login
- [x] Tất cả API routes (trừ /api/auth/*) yêu cầu token hợp lệ, trả 401 nếu thiếu/hết hạn
- [x] Trả lỗi cụ thể: sai password, user không tồn tại

## Web
- [x] Trang login: form Username/Email + Password
- [x] Nhấn Login → validate input, gọi API POST /api/auth/login
- [x] Thành công → lưu token, redirect về trang chính
- [x] Thất bại → hiển thị thông báo lỗi cụ thể
- [x] User chưa đăng nhập → redirect về login
