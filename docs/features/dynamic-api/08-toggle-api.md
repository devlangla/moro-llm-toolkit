<feature>
  <meta>
    <id>dynamic_api_toggle</id>
    <title>Toggle active/inactive</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
       User bật/tắt API endpoint mà không cần xoá. Endpoint inactive sẽ trả 404
    khi gọi, nhưng code, dependencies, và config vẫn được giữ lại. Warm instance
    được evict khi toggle off.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>toggle off API endpoint tạm thời</action>
      <benefit>tắt endpoint mà không mất code, có thể bật lại bất cứ lúc nào</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Toggle switch trên API row trong management page.
- [x] Toggle on → isActive = true, endpoint hoạt động lại ngay (warm lại từ request đầu tiên).
- [x] API: PATCH /api/dynamic-apis/:id { isActive: boolean }.

## Web
- [x] Toggle off → isActive = false, evict warm instance, request tới path trả 404.
- [x] Badge/icon hiển thị trạng thái active/inactive.
