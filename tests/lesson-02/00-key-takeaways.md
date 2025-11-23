# A -Git
1. Git - three states
- Working directory, Statging area, Repository
- câu lệnh git:
    - git init
    - git add <ten file>
    // nếu file nằm trong thư mục, cần đưa luôn tên thư mục
    - git add .
    - git commit -m "message"

2. Git- cấu hình
- Hai lệnh này để đặt mặc định username và email cho toàn bộ các repo trên máy tính
    - git config --global user.name “Tên bạn”
    - git config --global user.email “email của bạn”
- Nếu  mỗi repo muốn một tên khác nhau thì bỏ --global trong 2 câu lệnh trên

3. Git - xem trang thái file and xem log
    - git status
    - git log

4. Git - commit convention
- convention <type>: <short_description>
- type: loại commit
    - chore: sửa nhỏ lẻ, chính tả, xóa file không dùng tới,...
    - feat: thêm tính năng mới, test case mới
    - fix: sửa lỗi 1 test trước đó

5. Git workflow
- init -> add -> commit -> push

# B - Javascript
1. Biến số
    - <từ khoá> <tên biến> = <giá trị>
    - Từ khoá: var/let
2. Hằng số
    - <từ khoá> <tên hằng> = <giá trị>
    - Từ khoá: const
3. Comments 
    - Dùng // hoặc /* */
4. Kiểu dữ liệu:  2 nhóm 
- Kiểu nguyên thuỷ (primitive types)
    - Number
    - String
    - Boolean
- Kiểu tham chiếu (reference types)
    - Object

5. Các toán tử 
- So sánh bằng: == và ===
- So sánh không bằng: !
- So sánh lớn hơn, nhỏ hơn: >, <, >=, <=
- AND: &&
- OR: ||

6. Câu điều kiện: if

7. vòng lặp for (i)