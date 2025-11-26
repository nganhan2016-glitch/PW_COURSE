# A.Git: Undo
1. Update commit message: 
    - git commit --amend -m”message”
2. Undo files from staging area to working directory: 
    - git restore --staged <file_name>
    - git restore --staged .
3. Undo files from repository to working directory:
    - git reset HEAD~1
    - git reset HEAD~N
     ***Note:***
    - Commit đầu tiên không thể bị reset.
    - Nếu muốn reset → xoá thư mục .git đi rồi init lại 
4. Lấy danh sách các commit
    - git log
    Để trở về revision (hay hiểu đơn giản là đi về thời điểm quá khứ xem lúc ấy code của mình có gì), ta dùng lệnh:
    - git checkout <revision>
Ví dụ:
git checkout 070745d6c000d2a90740dcf97ee5db3f9418cc1f
# B.Git: Branch 
Git sử dụng nhánh (branch) để tạo ra các “phiên bản” riêng của code, tránh ảnh hưởng tới “bản gốc”
1. Lấy code từ server về: 
    - git pull origin main 
2. Xem danh sách nhánh:
    - git branch // cần có ít nhất 1 commit mới hiện danh sách nhánh
3. Tạo nhánh mới:
    - git branch <tên_branch>: Nhánh mới “copy” giống hệt nhánh hiện tại
4. Chuyển sang nhánh mới
    - git checkout <tên_branch>
5. Vừa tạo, vừa chuyển sang nhánh mới
    - git checkout -b <tên_branch>
6. Xóa nhánh
    - git branch -D <tên_branch>   // Lưu ý: đứng ở nhánh khác trước khi xóa
7. Luôn pull code về trước khi tạo nhánh mới   
# C. Git: gitignore
Trong dự án thường có nhiều file không cần thiết phải đưa vào Git repository, như:
    - File tạm thời của hệ điều hành (.DS_Store, Thumbs.db) 
    - Thư mục dependencies (node_modules/, vendor/) 
    - File build và artifacts (dist/, build/, *.exe)
    - File cấu hình cá nhân (IDE settings, environment variables)
    - File nhạy cảm (API keys, passwords, certificates)
    - File log và database local   

# D. Javascript:
1. Convention:
    - snake_case: tạm thời không dùng
    - kebab-case: đặt tên file và folder
    - camelCase: đặt tên biến, hàm
    - PascalCase: đặt tên class
2. Console.log with ‘ and “
    - console.log(‘Toi la Nga’);
    - console.log(“Toi la Phong”);
    - console.log(`${variable_name}`)
    - let name = “Nga”;
    - console.log(`Toi la ${name}`);
    - console.log(“Toi ten la” + name + “”)
3. Object: Object là một trong những kiểu dữ liệu quan trọng nhất trong JavaScript, dùng để lưu trữ dữ liệu dạng key-value.
Cú pháp
Trong đó:
● <key>: giống quy tắc đặt tên biến
● <value>: có kiểu giống biến, hoặc là 1 object khác.
const/let <variable_name> = {
key1: value1,
key2: value2,
}
Vi du:
`const user  = {
    name: "Nga",
    city: "HCM",
    address:{
        street: "HP",
        "thanh pho": "HCM"
    },
    "phone number":123456
}
console.log(user.name);
console.log(user.address.city);
console.log(user["phone number"]);
console.log(user.address["thanh pho"]);
`
4. Array
5. Operator
6. Function