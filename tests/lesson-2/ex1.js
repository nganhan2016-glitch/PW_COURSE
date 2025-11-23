/* 
Tạo file ex1.js để giải bài sau:
a. Khai báo một hằng số number với giá trị là 12.
b. Khai báo một biến name với giá trị là ”my number”
c. Khai báo một biến isEven với giá trị là sai.
d. Kiểm tra nếu number là số chẵn, gán lại isEven thành giá trị đúng.
*/

const number = 12;
let name = "my number";
let isEven = false;

if (number % 2 === 0) 
{
    isEven = true;
}
console.log(isEven);