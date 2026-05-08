<feature>
  <meta>
    <id>user_roles</id>
    <title>Phân quyền (Roles)</title>
    <group>Users</group>
    <status>done</status>
    <priority>p2</priority>
  </meta>

  <overview>
    Hệ thống phân quyền dựa trên role: superadmin, admin, member.
    Mỗi role có tập hợp quyền khác nhau, kiểm tra ở cả API và UI.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Super Admin</actor>
      <action>gán role cho user</action>
      <benefit>kiểm soát quyền truy cập của từng người dùng</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] 3 roles: superadmin (toàn quyền), admin (quản lý users + mọi tính năng), member (sử dụng tính năng, không quản lý users)
- [x] API middleware kiểm tra role trước khi xử lý request
- [x] superadmin role không thể bị gán hoặc thu hồi qua API — chỉ tồn tại từ seed. Zod schema chỉ chấp nhận admin/member
- [x] Trả 403 Forbidden nếu user không đủ quyền

## Web
- [x] UI ẩn/disable các nút/menu mà user không có quyền
- [x] Role dropdown khi create/edit user chỉ hiện admin/member (không có superadmin)
