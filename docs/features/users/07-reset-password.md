<feature>
  <meta>
    <id>user_reset_password</id>
    <title>Reset password</title>
    <group>Users</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    Admin reset password cho user bất kỳ. User cũng có thể tự đổi password.
    Password mới được hash và cập nhật, sessions cũ bị invalidate.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Admin</actor>
      <action>reset password cho user quên mật khẩu</action>
      <benefit>user có thể đăng nhập lại mà không cần email recovery</benefit>
    </story>
    <story id="US-02">
      <actor>User</actor>
      <action>đổi password của chính mình từ trang profile/settings</action>
      <benefit>bảo mật tài khoản cá nhân</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Admin: POST /api/users/:id/reset-password { newPassword } → hash + update DB
- [x] Self-change: POST /api/auth/change-password { oldPassword, newPassword }
- [x] Validate: new password tối thiểu 8 ký tự, old password đúng
- [x] Mọi session cũ bị invalidate sau khi reset

## Web
- [x] Admin: nút "Reset Password" trên mỗi user row/detail
- [x] Click → dialog nhập password mới (hoặc generate random)
- [x] Self-change: form old password + new password + confirm
- [x] Toast thông báo thành công sau khi đổi
