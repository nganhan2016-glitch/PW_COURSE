/*1. Viết hàm multiply nhận 2 tham số a và b, in ra kết quả nhân của chúng. Gọi hàm với
2 cặp giá trị khác nhau.*/
function multiply(a, b) {
    return a * b;
}
console.log("Bai 1: Multiply")
console.log(multiply(8, 9));
console.log(multiply(22, 30));

/*
2. Viết hàm findMin nhận 3 tham số a, b, c, trả về giá trị nhỏ nhất. Gọi hàm và in kết quả
với 2 bộ số khác nhau.*/
function findMin(a, b, c) {
    if (a < b && a < c)
        return a;
    if (b < a && b < c)
        return b;
    if (c < a && c < b)
        return c;
}
console.log("Bai 2: FindMin")
console.log(findMin(4, 5, 1));
console.log(findMin(4, 0, -1));

/*
3. Viết hàm getTopStudents nhận 2 tham số:
● students: mảng các object, mỗi object chứa name (tên) và score (điểm).
● threshold: ngưỡng điểm để được coi là "top" (số).
Hàm trả về mảng mới chứa tên của những học sinh có điểm >= threshold.
Gọi hàm với danh sách thực tế và in kết quả.*/

let students = [
    { name: "A", score: 7.5 },
    { name: "B", score: 8.5 },
    { name: "C", score: 9.5 }
]
let topStudents = [];
function getTopStudents(students, threshold) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].score >= threshold) {
            topStudents.push(students[i]);
        }
    }
    return topStudents;
}
topStudents = getTopStudents(students, 8);
console.log("Bai 3: ");
console.log(topStudents);
/*
4. Viết hàm calculateInterest nhận 3 tham số:
● principal: số tiền gửi ban đầu (số).
rate: lãi suất hàng năm (phần trăm, ví dụ 5 nghĩa là 5%).
● years: số năm gửi.
Hàm tính và trả về tổng số tiền (gốc + lãi) sau years năm, sử dụng công thức lãi
đơn: total = principal + principal * rate * years / 100. Gọi hàm với ví dụ thực tế và
in kết quả.
*/
let total = 0;
function calculateInterest(principal, rate, years) {
    return principal + principal * rate * years / 100;
}
total = calculateInterest(500000000, 8, 10);
console.log("Bai 4: Tổng số tiền (gốc + lãi) sau years năm: " + total);

