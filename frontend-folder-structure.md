# Giới thiệu phong cách tổ chức thư mục

Phong cách tổ chức thư mục là sự pha trộn của 2 cách tổ chức

1. Phân chia thư mục theo chức năng (folder by Feature)

```
Ví dụ 

 /my-app
|-- /user          chứa tất cả các file liên quan đến quản lý người dùng, như đăng nhập, đăng ký, quên mật khẩu, v.v.
|-- /product       chứa tất cả các file liên quan đến việc hiển thị và tìm kiếm sản phẩm.
|-- /card          chứa tất cả các file liên quan đến giỏ hàng của người dùng.
|-- /payment       chứa tất cả các file liên quan đến việc xử lý thanh toán.
```
2. Phân chia thư mục theo loại file (folder by Type)

```
Ví dụ

/my-app
|-- /components               chứa tất cả các React components.
|-- /services                 chứa các file liên quan đến việc gọi API hoặc thực hiện các tác vụ liên quan đến dịch vụ.
|-- /utils                    chứa các hàm tiện ích được sử dụng trong suốt application
|-- /tests                    chứa tất cả các file kiểm thử
```
---

# Cấu trúc thư mục

Lưu ý : Cấu trúc này chỉ mang tính dự kiến, có thể mở rộng nhưng cần tuân theo quy tắc của phong cách tổ chức thư mục.

```
frontend/
├─ public/                         # Tài nguyên tĩnh (favicon, manifest…)
└─ src/
   ├─ app/                         # Hạ tầng ứng dụng (không gắn domain)
   │  ├─ store/                    # Redux Toolkit store, enhancers
   │  ├─ router/                   # Khai báo routes, guards, layout mapping
   │  ├─ api/                      # BaseQuery RTKQ, adapters HTTP chung
   │  ├─ middleware/               # Redux middleware: listener, logger, analytics
   │  ├─ providers/                # AppProvider (Redux, Router, Theme, Query…)
   │  └─ config/                   # env, constants, feature flags, runtime config
   │
   ├─ shared/                      # Dùng chung, KHÔNG gắn domain nghiệp vụ
   │  ├─ components/               # Layout chung, Navbar, Sidebar/Control, Footer
   │  │  ├─ layout/
   │  │  ├─ navigation/
   │  │  └─ form/                  # Input, Select, DatePicker, FormField…
   │  ├─ ui/                       # Atoms/Molecules: Button, Modal, Table, Tabs…
   │  ├─ hooks/                    # useDebounce, useToggle, useLocalStorage…
   │  ├─ utils/                    # formatter, validator, download, parser…
   │  ├─ lib/                      # httpClient, errorMap, i18n init, storage engine
   │  ├─ styles/                   # Tailwind layers, tokens, global styles
   │  ├─ types/                    # (Tuỳ chọn) type chung nếu dùng TS sau này
   │  └─ assets/                   # images, icons, fonts
   │
   ├─ features/                    # MỖI domain = 1 feature
   │  ├─ auth/
   │  │  ├─ pages/                 # Login, Register, ForgotPassword, Profile
   │  │  ├─ components/            # LoginForm, OTPForm, AuthGuard
   │  │  ├─ api/                   # authApi (login, refresh, me, permissions…)
   │  │  ├─ slice/                 # auth.slice (user, token, role)
   │  │  ├─ hooks/                 # useAuth, usePermission
   │  │  └─ types/                 # User, Token, Role
   │  ├─ object-storage/
   │  │  ├─ pages/                 # Buckets, BucketDetail, Objects, Policies
   │  │  ├─ components/            # BucketTable, UploadDialog, ACLForm, PolicyEditor
   │  │  ├─ api/                   # s3Api (listBuckets, listObjects, upload…)
   │  │  ├─ slice/                 # UI state: filters, selections, panel
   │  │  ├─ hooks/                 # useBucketActions, usePresignUrl
   │  │  └─ types/                 # Bucket, Object, ACL, Policy
   │  ├─ vps/
   │  │  ├─ pages/                 # VPSList, VPSDetail, CreateVPS, Metrics
   │  │  ├─ components/            # VPSCard, PlanSelector, ActionBar, ConsoleFrame
   │  │  ├─ api/                   # vpsApi (provision, power, resize, metrics…)
   │  │  ├─ slice/                 # UI state: filters, wizard
   │  │  ├─ hooks/                 # useVpsActions, useMetrics
   │  │  └─ types/                 # VPS, Plan, Snapshot
   │  ├─ dns/
   │  │  ├─ pages/                 # Domains, Records, Templates
   │  │  ├─ components/            # RecordTable, AddRecordForm, ZoneViewer
   │  │  ├─ api/                   # dnsApi (zones, records…)
   │  │  └─ types/                 # Zone, Record, Template
   │  ├─ billing/
   │  │  ├─ pages/                 # Invoices, PaymentMethods, Usage/Costs
   │  │  ├─ components/            # InvoiceTable, CardForm, UsageChart
   │  │  ├─ api/                   # billingApi (invoices, payments, usage)
   │  │  └─ types/                 # Invoice, LineItem, PaymentMethod
   │  └─ admin/
   │     ├─ pages/                 # Users, Groups, Permissions, AuditLogs
   │     ├─ components/            # UserTable, PermissionMatrix, InviteDialog
   │     ├─ api/                   # adminApi (user/group/permission, audits)
   │     └─ types/                 # Admin models
   │  ....... (Các domain sẽ bổ sung ở đây)
   ├─ pages/                        # Landing/404/Legal… (không thuộc feature)
   ├─ mocks/                        # MSW cho dev
   │  ├─ handlers/                  # handlers theo feature (auth, s3, vps…)
   │  └─ data/                      # dữ liệu giả (JSON)
   ├─ tests/                        # Unit/Integration (nếu không co-locate)
   │  ├─ unit/
   │  └─ integration/
   ├─ e2e/                          # End-to-End (Playwright/Cypress)
   ├─ locales/                      # i18n resources (vi, en…)
   └─ styles/                       # Global CSS, Tailwind layers
```
---
# Quy ước đặt tên file và thư mục
```
Với tên thư mục : viết thường 
VD : object, auth, v.v.

Với tên file : viết hoa với mỗi ký tự đầu tiên 
VD : SetUseStage.jsx, S3Api , v.v.
```
---
# Quy ước import
```
Dùng alias @ → src/.

Không import xuyên feature (ví dụ: features/vps gọi thẳng vào file của features/object-storage).

Chia sẻ logic qua shared/ nếu thực sự dùng chung.

Dưới đây là cấu hình vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```
---
# Config & biến môi trường
```
VITE_*: tất cả biến môi trường runtime (ví dụ: VITE_API_BASE_URL).

Đọc qua app/config/env.js; không gọi import.meta.env bừa bãi trong component.

constants chung đặt ở app/config/constants.js
```
# Quy ước UI
```
Tailwind cho styling; không inline style nếu không cần thiết.

Atoms/Molecules (Button, Modal, Table…) đặt ở shared/ui/.

Layout chung (RootLayout, Navbar, Control, Footer) đặt ở shared/components/.

Component gắn domain (bảng S3, form VPS…) nằm trong feature tương ứng.
```
---
# Quy ước Middleware và Network
```
Redux middleware đặt ở src/app/middleware/:

listener (logout, token-expired, side-effects nhẹ)

logger (dev), analytics (nếu có)

Network layer:

RTKQ baseQuery trong src/app/api/ (gắn token, retry, refresh 401).

Nếu dùng Axios thêm: shared/lib/httpClient.js (interceptors).

Thứ tự middleware trong store: listener → rtkQuery → logger/analytics
```
---
# Quy ước Routing và Guard
```
Tất cả route định nghĩa trong app/router/.

Guard (kiểm tra đăng nhập/quyền) đặt ở features/auth/components/AuthGuard.component.jsx (hoặc app/router/guards nếu dùng chung).

Lazy-load page của từng feature; không import chéo page giữa các feature.
```
---
# Quy ước Test và Mock
```
MSW trong src/mocks/ để mô phỏng API theo feature.

Unit: test util/hook/component nhỏ.

Integration: test flow (API slice + component).

E2E: hành vi end-to-end với Playwright/Cypress.

Co-locate test gần source nếu tiện; nếu không, đặt vào tests/
```
---
# Quy trình thêm 1 feature mới
```
Quy trình thêm một feature mới

Tạo thư mục src/features/<feature>/ với các nhánh:

pages/, components/, api/, slice/, hooks/, types/ (tối thiểu: pages/, api/)

Tạo *.api.js (RTKQ) với reducerPath, tagTypes, endpoints.

Đăng ký API vào store (nếu dùng multi-store file, thêm ở app/store/).

Tạo *.page.jsx và lazy-load trong app/router/.

Nếu cần quyền: bọc route bằng AuthGuard.

Viết component cục bộ ở components/, hook nghiệp vụ ở hooks/.

Viết test tối thiểu, thêm mock handler nếu cần
```
