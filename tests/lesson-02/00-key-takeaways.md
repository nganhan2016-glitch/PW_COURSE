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
    - ***var*** cho phép khai báo lại, ***let*** thì không
    - var có phạm vi global, let có phạm vi theo block
    - Code nằm trong cặp ngoặc nhọn được gọi là *một block code*
    Ví dụ: 
    {
        var a = 10;
        let b = 11;
    }
    console.log(a);//In ra: 10
    console.log(b);//Lỗi referenceError: b is not defined.
2. Hằng số
    - <từ khoá> <tên hằng> = <giá trị>
    - Từ khoá: const
    - Ví dụ:
    const slogan = "Học kỹ - hiểu bản chất - Mentor tận tình";
    const PI = 3.14;
    const dollar = 26000;

    Q: Khi nào dùng biến? Khi nào dùng hằng?
    Mặc định dùng *const* - giúp code an toàn hơn, dễ đọc hơn.
    Chỉ dùng *let* khi chắc chắn gán lại giá trị.
    Không dùng *var*

3. Comments 
    - Dùng // hoặc /* */
4. Kiểu dữ liệu:  2 nhóm 
- Kiểu nguyên thuỷ (primitive types)
    - Number
    - String
    - Boolean
- Kiểu tham chiếu (reference types)
    - Object
Q: Làm sao để biết một biến có kiểu dữ liệu gì?
A: - Đọc code xem khai báo thế nào.
    - dùng hàm typeof <variable>

5. Các toán tử so sánh
- So sánh bằng: == và ===
- So sánh hai bằng (==): so sánh giá trị sau khi chuyển đổi kiểu dữ liệu
vd:
5 == "5" // true (chuyển string thành number)
5 == "6" // false (chuyển string thành number)
true == 1 // true (true chuyển thành 1)
false == 0 // true (false chuyển thành 0)

- So sánh ba bằng === : So sánh giá trị và kiểu dữ liệu - không chuyển đổi kiểu
vd:
5 === "5" // false (khác kiểu)
true === 1 // false (khác kiểu)
false === 0 // false (khác kiểu)
5 === 5 // true (cùng kiểu, cùng giá trị)
***NOTE***: Luôn dùng so sánh ba bằng!
● Chỉ sử dụng == khi có chủ đích, muốn so sánh mà
không quan tâm tới kiểu dữ liệu.***

- So sánh không bằng: !
- So sánh không bằng != và !==
5 != "5" // false (chuyển string thành number)
true != 1 // false (true chuyển thành 1)
false != 0 // false (false chuyển thành 0)
5 !== "5" // true (khác kiểu)
true !== 1 // true (khác kiểu)
false !== 0 // true (khác kiểu)
5 !== 5 // false (cùng kiểu, cùng giá trị)

- So sánh lớn hơn, nhỏ hơn: >, <, >=, <=

6. Toán tử logic
- AND: && -> trả về đúng nếu cả 2 vế của mệnh đề đúng
- OR: || -> trả về đúng nếu một trong 2 vế của mệnh đề đúng
Ví dụ:
Ví dụ:
● Điều kiện nhận lương tháng 13: làm việc trên 6 tháng *hoặc* nhân viên chính thức
● Điều kiện nhận lương tháng 14: làm việc trên 6 tháng *và* nhân viên chính thức
const isMoreThan6 = true;
const isOfficial = true;
const receive13 = isMoreThan6 || isOfficial;
const receive14 = isMoreThan6 && isOfficial;

7. Toán tử 1 ngôi:
Toán tử một ngôi là toán tử chỉ cần một toán hạng để thực hiện.
Hai loại:
● Prefix: toán tử nằm ở phía trước - tăng trước, trả về sau
○ ++x;
○ --x;
● Postfix: toán tử nằm ở phía sau - trả về trước, tăng sau
○ x++;
○ x--;
Ví dụ:
let a = 10;
b = ++a; // tăng a lên 11 rồi trả về => b có giá trị là 11
let c = 10;
d = c++; // trả về giá trị 10 cho d rồi mới tăng
// => d có giá trị là 10

8. Toán tử toán hoc
- + - * /
- % -> % sẽ trả về phần dư của phép tính.
Giả sử:
- 3%3 = 0 (vì 3 chia hết cho 3 dư 0)
- 3%2 = 1 (vì 3 không chia hết cho 2, dư 1)
- 3%1 = 0 (vì 3 chia hết 1 dư 0)
- 1%2 = 1 (vì 1 không chia hết cho 2, dư 1)
- 100%80 = 20 (vì 100 không chia hết cho 80, dư 20)
Ứng dụng tìm số chẵn, lẻ:
- Nếu là số lẻ, chia dư cho 2 = 1: x % 2 === 1
- Nếu là số chẵn, chia dư cho 2 = 0: x % 2 === 0

9. Câu điều kiện: if
Câu điều kiện dùng để kiểm tra một đoạn logic trước khi chạy. Nếu điều kiện đúng thì mới chạy
Cú pháp:
if (<điều kiện>) {
// code...
}
Ví dụ:
let hour = 8;
if (hour <= 11) {
console.log(“Good morning”);
}
Ví dụ: Kết hợp nhiều điều kiện
let hour = 8;
if (hour >= 6 && hour <= 11) {
console.log(“Good morning”);
}

Ví dụ: Kết hợp nhiều điều kiện
let hour = 8;
if (hour >= 6) {
if (hour <= 11) {
console.log(“Good morning”);
}
}

10. vòng lặp for (i)
for (<điều kiện khởi tạo>; <điều kiện lặp>; <cập nhật>) {
// code
}
Trong đó:
● Điều kiện khởi tạo: chạy một lần duy nhất, khi vòng lặp bắt đầu.
● Điều kiện lặp: nếu đúng thì chạy tiếp, sai thì dừng.
● Cập nhật: chạy vào mỗi cuối vòng lặp, để thay đổi giá trị của biến đếm.
Ví dụ:
for (let i = 0;i < 5; i++) {
console.log("Xin chào!")
}

11. Format code:
- Mac: Option + Shift + F
- Window: Alt + Shift + F

12. Console.log:
Để in ra kết hợp giá trị kiểu chuỗi và giá trị của biến, ta có hai cách như sau:
- console.log(“Dùng dấu cộng như sau: “ + name)
- console.log(“Hoặc dùng dấu phẩy: “, name)
Để nối chuỗi từ hai biến, ta sử dụng dấu cộng (+):
- const str1 = “Hello”;
- const str2 = “Playwright Viet Nam”
- console.log(str1 + str2); // HelloPlaywright Viet Nam