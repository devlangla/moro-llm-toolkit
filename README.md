# Moro LLM Toolkit

**Self-hosted infrastructure toolkit for LLM agents and AI applications.**

Moro LLM Toolkit là một bộ công cụ tự host, cung cấp tất cả các primitives mà LLM agents cần để hoạt động: state storage, knowledge base, tool execution, file storage, và dynamic API — được đóng gói trong một server duy nhất với Web UI đi kèm.

![License](https://img.shields.io/badge/license-MIT-blue)
![Runtime](https://img.shields.io/badge/runtime-Bun-%23f472b6)
![Version](https://img.shields.io/npm/v/moro-llm-toolkit)

---

## Tại sao cần Moro LLM Toolkit?

Khi xây dựng LLM agents và AI pipelines, bạn thường cần:

- **Nơi lưu state** — agents cần đọc/ghi runtime variables giữa các lần chạy
- **Nơi lưu dữ liệu có cấu trúc** — tables với custom columns, sort/filter như Notion
- **Nơi lưu tài liệu** — knowledge base dạng block editor cho agents retrieval
- **Nơi lưu files** — object storage cho documents, images, artifacts
- **Tools cho agents** — Python tools chạy sandbox, expose qua MCP protocol
- **Custom HTTP endpoints** — dynamic API viết bằng Python chạy runtime

Thay vì tích hợp nhiều dịch vụ riêng lẻ (Redis, Notion, S3, custom tool server...), Moro LLM Toolkit gom tất cả vào **một self-hosted server** duy nhất.

---

## Features

| Module | Mô tả |
|---|---|
| 👤 **User Management** | Authentication, RBAC, session management, API key management |
| 🔑 **Dynamic Variables** | Redis-like key-value store với data types, TTL, namespaces |
| 📊 **Dynamic Table** | Notion-style database với custom columns, sort/filter, multiple views |
| 📝 **Documents** | Block-based document editor (Notion-style), organized into Projects |
| 📦 **Storage** | Self-hosted S3-compatible object storage: buckets, upload/download, presigned URLs |
| 🔌 **MCP Servers** | Quản lý Model Context Protocol servers + Python tools chạy sandbox |
| ⚡ **Dynamic API** | Tạo HTTP API endpoints at runtime bằng Python code |

---

## Quick Start

### Yêu cầu

[Bun](https://bun.sh/) runtime ≥ 1.2.

```bash
curl -fsSL https://bun.sh/install | bash
```

### Cài đặt

```bash
bun add -g moro-llm-toolkit
```

### Khởi chạy

```bash
# Khởi động server (background daemon)
moro-llm-toolkit start

# Mở Web UI
open http://localhost:18080
```

Web UI được bundle sẵn và phục vụ tự động — không cần cài thêm gì.

---

## CLI Reference

```
moro-llm-toolkit <command> [options]
```

### Commands

| Command     | Mô tả                              |
|-------------|-------------------------------------|
| `start`     | Khởi động server (daemon mode)      |
| `stop`      | Dừng server đang chạy              |
| `restart`   | Khởi động lại server               |
| `status`    | Kiểm tra trạng thái server          |
| `logs`      | Xem server logs                    |
| `version`   | In version                         |
| `help`      | Hiển thị help                      |

### Options

**`start` / `restart`:**

| Flag                  | Default               | Mô tả              |
|-----------------------|-----------------------|--------------------|
| `--port <number>`     | `18080`               | Server port        |
| `--host <string>`     | `127.0.0.1`           | Server host        |
| `--data-dir <path>`   | `~/.moro-llm-toolkit` | Thư mục lưu dữ liệu |
| `-f, --foreground`    | —                     | Chạy foreground    |

**`logs`:**

| Flag                | Default | Mô tả                          |
|---------------------|---------|--------------------------------|
| `--lines <number>`  | `50`    | Số dòng log hiển thị           |
| `--follow`          | —       | Theo dõi log liên tục (tail)   |

### Ví dụ

```bash
# Khởi động với port tuỳ chỉnh
moro-llm-toolkit start --port 8080

# Expose ra mạng nội bộ
moro-llm-toolkit start --host 0.0.0.0

# Chạy foreground để debug
moro-llm-toolkit start --foreground

# Xem live logs
moro-llm-toolkit logs --follow

# Kiểm tra trạng thái
moro-llm-toolkit status

# Dừng server
moro-llm-toolkit stop
```

---

## Đăng nhập lần đầu

Khi khởi động lần đầu mà chưa có tài khoản nào, server tự động tạo tài khoản super admin mặc định:

| Field    | Giá trị           |
|----------|-------------------|
| Username | `admin`           |
| Email    | `admin@local.com` |
| Password | `admin123`        |

> [!WARNING]
> **Đổi mật khẩu ngay sau lần đăng nhập đầu tiên!** Tài khoản mặc định có quyền super admin và mật khẩu rất đơn giản.

### Cách đổi mật khẩu

**Qua Web UI:**

1. Mở `http://localhost:18080` và đăng nhập với credentials mặc định ở trên
2. Click vào avatar/tên tài khoản ở góc trên bên phải
3. Chọn **Profile** hoặc **Account Settings**
4. Nhập mật khẩu cũ (`admin123`) và mật khẩu mới
5. Lưu lại

**Qua API:**

```bash
# 1. Đăng nhập để lấy token
TOKEN=$(curl -s -X POST http://localhost:18080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","password":"admin123"}' \
  | jq -r '.token')

# 2. Đổi mật khẩu
curl -X POST http://localhost:18080/api/auth/change-password \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"old_password":"admin123","new_password":"your-new-secure-password"}'
```

---

## Data Storage

Toàn bộ dữ liệu được lưu trong thư mục data (`~/.moro-llm-toolkit` mặc định):

```
~/.moro-llm-toolkit/
├── data.db       # SQLite database (users, variables, tables, MCP configs...)
├── agent.pid     # PID file (daemon mode)
├── agent.log     # Server logs (daemon mode)
└── storage/      # Object storage files (buckets & objects)
```

---

## REST API

Server expose REST API tại `http://localhost:18080/api`. Tài liệu API đầy đủ có thể xem tại:

```
http://localhost:18080/docs
```

### Authentication

Tất cả API endpoints yêu cầu authentication qua một trong hai cách:

**Bearer Token** (session-based):
```http
Authorization: Bearer <token>
```

**API Key**:
```http
X-API-Key: <api-key>
```

### Các nhóm endpoint chính

| Prefix | Mô tả |
|---|---|
| `POST /api/auth/login` | Đăng nhập, lấy token |
| `GET /api/users` | Quản lý users |
| `GET /api/variables` | Dynamic Variables CRUD |
| `GET /api/databases` | Dynamic Tables CRUD |
| `GET /api/documents` | Documents & Projects CRUD |
| `GET /api/storage` | Object Storage (buckets, objects) |
| `GET /api/mcp-tool-servers` | MCP Server management |
| `GET /api/api-keys` | API Key management |

> Chi tiết request/response schemas xem tại `/docs` khi server đang chạy.

---

## Tích hợp với LLM Agents

### Dynamic Variables — Agent State Storage

Agents có thể đọc/ghi state thông qua Variables API:

```javascript
// Ghi state
await fetch('http://localhost:18080/api/variables', {
  method: 'POST',
  headers: { 'X-API-Key': 'your-key', 'Content-Type': 'application/json' },
  body: JSON.stringify({
    namespace: 'agent:session-123',
    key: 'current_step',
    value: '3',
    type: 'string',
    ttl: 3600  // Tự động xoá sau 1 giờ
  })
});

// Đọc state
const res = await fetch('http://localhost:18080/api/variables/agent:session-123/current_step', {
  headers: { 'X-API-Key': 'your-key' }
});
```

### MCP Servers — Tools cho Agents

Kết nối LLM client (Claude, Cursor, Cline...) tới MCP endpoint:

```
http://localhost:18080/api/mcp-tool-servers/<server-id>/mcp
```

Built-in system server expose các tools tích hợp sẵn (đọc variables, query tables...). Custom servers cho phép viết Python tools tuỳ chỉnh:

```python
# Ví dụ Python tool trong Moro MCP Server
def search_knowledge_base(query: str) -> str:
    """Tìm kiếm trong knowledge base"""
    # Tool code chạy trong sandbox
    results = db.query(query)
    return json.dumps(results)
```

### Dynamic API — Custom HTTP Endpoints

Tạo HTTP endpoint tại runtime mà không cần deploy lại:

```python
# Endpoint code (Python, chạy sandbox)
def handle(request):
    data = request.json()
    # Xử lý logic tuỳ chỉnh
    return {"result": process(data)}
```

---

## Tech Stack

| Layer | Công nghệ |
|---|---|
| **Runtime** | [Bun](https://bun.sh/) ≥ 1.2 |
| **Server** | [Fastify](https://fastify.dev/) + fastify-type-provider-zod |
| **Frontend** | React 19 + TypeScript + Vite + Tailwind CSS |
| **Database** | SQLite (`bun:sqlite`) + Drizzle ORM |
| **Validation** | Zod |
| **AI SDK** | Vercel AI SDK (`ai`, `@ai-sdk/*`) |

---

## Development

```bash
# Clone repo
git clone https://github.com/devlangla/moro-llm-toolkit.git
cd moro-llm-toolkit

# Cài dependencies
bun install

# Khởi động dev servers (API + Vite HMR chạy song song)
bun run dev

# Type check
bun run typecheck:server
bun run typecheck:web

# Lint & format
bun run biome:check
```

### Cấu trúc dự án

```
moro-llm-toolkit/
├── src/
│   ├── server/                    # Fastify API server
│   │   └── src/
│   │       ├── modules/           # Feature modules (auto-loaded)
│   │       │   ├── auth/          # Authentication
│   │       │   ├── users/         # User management
│   │       │   ├── variables/     # Dynamic variables
│   │       │   ├── databases/     # Dynamic tables
│   │       │   ├── documents/     # Documents & projects
│   │       │   ├── storage/       # Object storage
│   │       │   ├── s3/            # S3-compatible API layer
│   │       │   ├── mcp-tool-servers/ # MCP server management
│   │       │   ├── api-keys/      # API key management
│   │       │   └── api-docs/      # API documentation endpoint
│   │       └── common/            # Shared infrastructure
│   │           ├── db/            # Drizzle ORM schema & migrations
│   │           ├── auth/          # Auth middleware
│   │           ├── mcp/           # MCP protocol shared logic
│   │           └── utils/         # Utility functions
│   └── web/                       # React frontend (Vite)
├── bin/                           # CLI entry point
├── docs/                          # Feature documentation
│   └── features/                  # Per-feature specs
├── docker/                        # Docker configs
└── public/                        # Bundled web assets (production)
```

### Thêm module mới

Mỗi feature là một module độc lập. Tạo thư mục trong `src/server/src/modules/<tên>/` với 4 files:

```
src/server/src/modules/my-feature/
├── my-feature.module.ts      # Fastify plugin + MODULE_PREFIX export
├── my-feature.controller.ts  # Route handlers (thin layer)
├── my-feature.service.ts     # Business logic + Drizzle queries
└── my-feature.schema.ts      # Zod schemas
```

Module tự động được load — không cần sửa `app.ts`.

---

## Docker

```bash
# Build image
docker build -t moro-llm-toolkit -f docker/Dockerfile .

# Chạy với volume mount cho data
docker run -d \
  -p 18080:18080 \
  -v ~/.moro-data:/data \
  -e MORO_DATA_DIR=/data \
  moro-llm-toolkit
```

---

## License

[MIT](LICENSE)
