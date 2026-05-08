<feature>
  <meta>
    <id>dynamic_api_overview</id>
    <title>Dynamic API — Overview</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p0</priority>
    <updated>2026-05-06</updated>
  </meta>

  <overview>
    Dynamic API cho phép user tạo, chỉnh sửa, xoá các HTTP API endpoints
    tại runtime. Mỗi API endpoint là một file JavaScript/TypeScript code
    được lưu trong DB. Khi có request gọi tới endpoint, hệ thống lấy code
    từ DB và thực thi trên Bun runtime. User có thể tạo REST APIs tuỳ chỉnh
    mà không cần deploy lại app.

    Kiến trúc lấy cảm hứng từ Cloudflare Workers:
    - **Warm Instances**: Handler được cache trong memory, chỉ reload khi code thay đổi.
    - **Bindings pattern**: Code truy cập internal services (Variables, Tables, Docs, Files)
      thông qua injected `context` object — giống Cloudflare env bindings.
    - **Console capture**: Mọi console.log/error trong handler được capture → lưu logs.
    - **Execution limits**: Timeout + memory limit per endpoint.

    Hai chế độ chạy:
    - **Fast mode**: Endpoints không có external dependencies → chạy in-process (vm module),
      cold start ~1-5ms.
    - **Isolated mode**: Endpoints có npm dependencies → chạy subprocess riêng
      (Bun.spawn) với node_modules riêng per endpoint, cold start ~20-50ms.
  </overview>
</feature>

## Tính năng (atomic — theo thứ tự ưu tiên)

| #  | Tính năng                         | File                                                            | Status     | Priority |
|----|-----------------------------------|-----------------------------------------------------------------|------------|----------|
| 01 | Tạo API endpoint mới              | [01-create-api.md](01-create-api.md)                            | ✅ Done    | p0       |
| 02 | Chỉnh sửa API endpoint            | [02-edit-api.md](02-edit-api.md)                                | ✅ Done    | p0       |
| 03 | Xoá API endpoint                   | [03-delete-api.md](03-delete-api.md)                            | ✅ Done    | p0       |
| 04 | Code editor cho API                | [04-api-code-editor.md](04-api-code-editor.md)                  | ✅ Done    | p0       |
| 05 | JS/TS runtime cho API (Bun)       | [05-api-runtime.md](05-api-runtime.md)                          | ✅ Done    | p0       |
| 06 | API request routing                | [06-api-routing.md](06-api-routing.md)                          | ✅ Done    | p0       |
| 07 | API test panel                     | [07-api-test-panel.md](07-api-test-panel.md)                    | ✅ Done    | p1       |
| 08 | Toggle active/inactive             | [08-toggle-api.md](08-toggle-api.md)                            | ✅ Done    | p1       |
| 09 | API logs & monitoring              | [09-api-logs.md](09-api-logs.md)                                | ✅ Done    | p2       |
| 10 | API management page                | [10-api-management.md](10-api-management.md)                    | ✅ Done    | p0       |

## Kiến trúc tổng quan

```
Request: POST /apis/users
  │
  ▼
┌─────────────┐    cache hit?     ┌────────────────┐
│   Router     │ ───── yes ─────→ │  Warm Handler  │
│  (match DB)  │                  │  (in memory)   │
└──────┬──────┘                  └───────┬────────┘
       │ no                              │
       ▼                                 ▼
┌──────────────┐              ┌──────────────────┐
│ Load code    │              │  Execute handler │
│ from DB      │              │  with timeout    │
│ + resolve    │              │                  │
│ deps mode    │              │  inject: request │
│ + cache warm │              │  inject: context │
└──────────────┘              │  capture: logs   │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌────────────────┐
                              │  Return Response│
                              │  + Save logs    │
                              └────────────────┘
```
