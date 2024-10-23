## Khái niệm

- source control
- git: distributed version control system
- github

---

## Kiến trúc, Git flow

- Link: https://nvie.com/posts/a-successful-git-branching-model/
- Nhánh master - main: là sản phẩm hoàn chỉnh sau từng giai đoạn
- hotfixes: sửa lỗi của main
- release branches: nhận code từ develop, review code và đẩy lên main
- develop: thao tác với những tính năng của sản phẩm
- feature branch: các tính năng riêng lẻ
  **Git flow**: sau mỗi phase thường chỉ còn 2 branch: main (product), develop

1. Leader tạo repo cho sản phẩm → tạo nhánh develop → tạo assignments trong phần Issues và gán cho thành viên trong repo. Khi đó công việc sẽ hiện số tag \#.
2. Member tạo nhánh tương ứng tính năng và code → push. Lưu ý ở phần commit phải tham chiếu đến tag của Issues \'#1 - something' để commit hiện trong Issues → pull request với base: develop.
3. Leader review code và merge vào develop → git pull develop trong local.
4. Leader tạo nhánh release-1.0.0 → tạo tag tương ứng và git push --tags → merge từ develop qua nhánh release.
   1. Review code → push & pull request → review & merge vào main → git pull main trong local.
   2. Tạo tag cho main → Xóa branch release và các features. Việc xóa bao gồm xóa ở local (git branch -d release-1.0.0) và xóa trên github (git push origin -d release-1.0.0)
5. Main bị lỗi thì tạo nhánh hotfixes và sửa → merge về main, xóa hotfixes.

---

## Tạo repo

- Tạo từ github: create repo trên github và clone về
- Tạo từ terminal:
  - Mở terminal
  - git config --global user.name "tên muốn hiển thị trên git"
  - git config --global user.email "email đăng nhập trên git"
  - git init (tạo mới 1 cái version control ở máy local)
  - 3 câu lệnh thần thánh để đẩy code từ local lên remote (cái link trên Github)
  - Thêm tất cả các files muốn đẩy lên Github: git add .
  - Commit: git commit -m "add new project"
  - Push code lên remote (trong lần đầu tiên): git push -u origin main; (trong những lần sau): git push

---

## Các thao tác trên github

- Kéo dự án từ github về máy cá nhân: git clone (link github cần kéo về)
- Thực hiện các lệnh sau để đưa code lên github:
  - git add . : dấu . biểu hiện cho việc up hết code, nếu muốn up những file cụ thể, add những file hiện trong git status
  - git commit -m 'comment'
  - git remote add origin (khi tạo repo mới có hướng dẫn insert dòng này).
  - git push –-set-upstream origin master
  - git pull origin main
- git remote -v: hiện đường link git clone
- **Tạo nhánh**:
  - git checkout -b newbranch_name : chuyển đến nhánh nếu chưa tồn tại thì tạo nhánh mới.
  - git push –set-upstream origin newbranch_name
  - git branch -D branch_name: xóa branch, trước ghi xóa phải switch sang main branch: git switch main / git checkout main (nhìn chung 2 câu lệnh có chức năng giống nhau)
- git status: kiểm tra sự thay đổi ở các file
- git stash: add vào bộ nhớ tạm khi gặp lỗi add mà phải pull code v
- trước
- sau khi pull, dung git stash apply -> thường sẽ xuất hiện conflict
- Dùng git stash trước khi push để tránh tình trạng khi add và commit báo lỗi chưa pull về -> phải commit 2 lần
- **Pull requests**:
  1.  push code từ 1 nhánh lên github
  2.  ở giao diện repo tạo pull request → viết description → create pull request
  3.  những thành viên khác (được phân công) review pull request
  4.  merge pull request.
