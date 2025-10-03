# Website quản lý vps hosting
```
Dự án code bằng React + Vite + Tailwindcss, chạy nodejs 22.12
```
# Cấu trúc thư mục
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
git checkout -b origin/<tên_nhánh>
```

**Ví dụ:**

```
git checkout -b origin/dev-an
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