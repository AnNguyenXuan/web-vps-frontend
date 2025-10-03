# Website quản lý vps hosting
```
Dự án code bằng React + Vite + Tailwindcss, chạy nodejs 22.

Hướng dẫn cài đặt truy cập https://github.com/coreybutler/nvm-windows/releases
cài gói nvm-setup.exe

Setup nodejs với nvm
nvm install 22.12.0
nvm use 22.12.0
node -v
npm -v

Lệnh cài đặt và khởi chạy frontend
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm i -D tailwindcss @tailwindcss/vite

Sửa config vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

Sửa src/index.css
@import "tailwindcss";

Kiểm tra nhanh
npm run build

Chạy dự án
npm run dev

Lệnh update
npm install -g npm@11.6.1

Lệnh cài icons
npm install react-icons --save

Lệnh cài 
npm i react react-dom react-router-dom
```
# Cấu trúc thư mục
```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📂home
 ┃ ┗ 📂shared
 ┃ ┃ ┣ 📜control.jsx
 ┃ ┃ ┣ 📜footer.jsx
 ┃ ┃ ┗ 📜navbar.jsx
 ┣ 📂layout
 ┃ ┗ 📜rootlayout.jsx
 ┣ 📂pages
 ┃ ┗ 📜home.jsx
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜main.jsx
```

### Bắt đầu với dự án

Để bắt đầu với dự án, hãy clone repository về máy của bạn:

```
git clone https://github.com/AnNguyenXuan/web-vps-frontend.git
```

### Quản lý nhánh

Chạy lệnh dưới đây để cập nhật danh sách các nhánh từ repository:

```
git fetch
```

Để kiểm tra kết quả, bạn có thể xem tất cả các nhánh (cả local và remote):

```
git branch -a
```

Bạn sẽ thấy danh sách các nhánh remote tương tự như sau:

  * `main`
  * `remotes/origin/dev-an`
  * `remotes/origin/dev-du`

Sau đó, hãy chuyển sang nhánh của mình. Bạn có thể sử dụng lệnh sau để tạo một nhánh local mới kết nối với nhánh remote tương ứng và chuyển sang nhánh đó:

```
git branch -M <tên nhánh>
```

**Ví dụ:**

```
git branch -M main
```

Lệnh này sẽ tạo nhánh local tên là **an**, kết nối với nhánh remote `remotes/origin/dev-an` trên GitHub, đồng thời chuyển nhánh đang hoạt động sang **vps-an** thay vì **main** như ban đầu.

-----

### Viết báo cáo và đẩy lên GitHub

Để đẩy nội dung lên GitHub, hãy sử dụng các lệnh sau theo thứ tự:

```
git add .
git commit -m "<ghi tóm tắt vài chữ về nội dung đẩy>"
git push
```

**Lưu ý:** Trước khi đẩy, hãy luôn kiểm tra lại xem bạn đang ở đúng nhánh. Điều này giúp tránh việc đẩy nhầm nội dung.