**A. Javascript - Functions advance:**
**1.Function expression**: Định nghĩa function bằng cách gán nó cho một biến
Vd:
const hi = function(name){
   return `Hello ${name}`;
}
console.log(hi("Nga"));

const tinh = function(price, quantity, discount){
   return price * quantity - discount;
}
console.log(tinh(100,2,30));

**2.Lambda function:**(còn gọi là Arrow Function)
● Xuất hiện lần đầu trong ES6 (ES2015).
● Đây là cách viết ngắn gọn hơn cho function
● Sử dụng dấu =>
Vd:
const hello = (name) => {
   return `Hello ${name}`;
}
const total = (price, quantity, discount) => {
   return price * quantity - discount;
}
console.log(hello("AAA"));
console.log(total(100,2,30));

*Lambda function: một số cách viết khác*
Nếu chỉ có 1 dòng code => có thể “rút gọn” cặp ngoặc nhọn
// Cú pháp ngắn gọn nhất (implicit return)
const add = (a, b) => a + b;

Không có tham số
// Phải có dấu ngoặc tròn rỗng
const greet = () => console.log("Hello!");
const getRandom = () => Math.random();

Một tham số
// Có thể bỏ dấu ngoặc tròn
const double = x => x * 2;
const square = x => x * x;

// Hoặc giữ dấu ngoặc (tùy style)
const triple = (x) => x * 3;

**3.Anonymous function:**(hàm ẩn danh):
● function không có tên.
● được sử dụng khi function chỉ cần dùng một lần hoặc làm callback.
Vi du:
// Named function (có tên)
function namedFunction() {
    console.log("I have a name!");
}
// Anonymous function (không tên)
function() { // SyntaxError! Không thể đứng một mình
    console.log("I'm anonymous!");
}
// Anonymous function phải được sử dụng ngay
// 1. Gán cho biến
const anonymousFunc = function() {
    console.log("I'm anonymous but stored in a variable!");
};
// 2. Dùng làm callback
setTimeout(function() {
    console.log("Anonymous callback!");
}, 1000);

**B. DOM:**
DOM = Document Object Model
1.1 Thẻ cấu trúc cơ bản:
<html>: Thẻ gốc của trang
<head>: Chứa metadata: tiêu đề website, hiển thị Google
<body>: Nội dung của cả website hiển thị
<span>: Inline container
<header>, <footer>, <nav>, <section>: Thẻ ngữ nghĩa

1.2 Thẻ nội dung:
<h1> đến <h6>: Tiêu đề
<p>: Đoạn văn
<a>: Liên kết
<img>: Hình ảnh
<ul>,<ol>,<li>:: Danh sách

1.3 Thẻ Form:
<form>: Biểu mẫu
<input>: Ô nhập liệu (text, password, checkbox, radio, etc.)
<button>: Nút bấm
<select> và <option>: Dropdown
<textarea>: Vùng văn bản nhiều dòng

1.4 Table
<table>:  tạo bảng dữ liệu
<thead>: chứa phần đầu bảng
<tbody>: chứa nội dung chính
<tr>:  tạo hàng
<th>: tạo ô tiêu đề
<td>: tạo ô dữ liệu
<tfoot>: chứa phần chân bảng

**C. Selector:**
Có 3 loại selector thường dùng:
● **XPath**:
Dùng được trong hầu hết các trường hợp (99.99%)
○ Đa dạng, có khả năng tìm các phần tử khó
○ Hơi dài
○ VD: //button[normalize-space() = ‘Add to cart’]
● **CSS selector**
○ Ngắn gọn, performance cao
○ Dùng cho các trường hợp dễ tìm.
○ Không linh hoạt bằng XPath
○ VD: .add-to-cart
● **Playwright selector**
Chỉ dùng riêng cho Playwright
○ Cú pháp ngắn gọn, không phụ thuộc vào cấu trúc DOM
○ Hướng tới “giống người dùng đang nhìn thấy gì”
○ VD: page.getByText(“Add to cart”);
**Khi nào thì dùng gì?**
Playwright selector > CSS Selector > XPath

**D. Playwright basic syntax:**
XPath = XML path. XPath có 2 loại: tuyệt đối và tương đối => Nên dùng Xpath tương đối.
*test*: Đơn vị cơ bản để khai báo một test
*step*: Đơn vị nhỏ hơn test,để khai báo từng step của test case
***Lưu ý***: step nên được map 1-1 với test case để dễ dàng maintain.

import { test } from '@playwright/test';

test('<tên test>', async ({ page }) => {
// Code của test
    await test.step('Tên step', async () => {
        // Code here
    });
});

Navigate:
    await page.goto('https://pw-practice.playwrightvn.com/');
Locate:
    page.locator(“//input[@id=’email’]”)
Click:
    Single click
        await page.locator("//button").click();
    Double click
        await page.locator("//button").dblclick();
    Click chuột phải
        page.locator("//button").click({button: 'right'})
    Click chuột kèm bấm phím khác
        page.locator("").click({modifiers: ['Shift'],})
Input:
    page.locator("//input").fill('Playwright Viet Nam');
    page.locator("//input").pressSequentially('Playwright Viet Nam', {
        delay: 100,
    });
Radio/checkbox:
    Lấy giá trị hiện tại đang là check hay không:
    const isChecked = page.locator("//input").isChecked();
    Check/ uncheck
    page.locator("//input").check();
    page.locator("//input").setChecked(false);
Select:
    await page.locator('//select[@id=”country”]').selectOption({ label: 'USA' })
Upload file:
    await page.locator("//input[@id='profile']").setInputFiles("<file-path>");

text(): Hàm text()dùng để tìm ra phần tử có giá trị tương ứng. Ví dụ
Với DOM sau:
    <div @class=”playwright”>This is a text</div>
Thì để chọn phần tử này, ta dùng cú pháp như sau:
    //div[text()=’This is a text’]

contains(): Đôi khi trong phần tử HTML, phần tử sẽ bị thừa khoảng trắng, hoặc có các giá trị không cố định trong text. 
Ví dụ
    <div> Tôi là Alex </div> // Text này có 1 ký tự space ở đầu và ở đuôi
    <div> Bây giờ là: 08:07 </div> // Thời gian sẽ tuỳ vào thời điểm truy cập trang web
Để chọn các phần tử này, ta dùng hàm contains(<giá trị>, <giá trị contains>). 
Ví dụ:
    //div[contains(text(), ‘Tôi là Alex’)]
    //div[contains(text(), ‘Bây giờ là:’)]

confirmation dialog: dùng page.on trước khi thực thi hành động để pop-up hiện ra.
    page.on('dialog', async dialog => dialog.accept());
