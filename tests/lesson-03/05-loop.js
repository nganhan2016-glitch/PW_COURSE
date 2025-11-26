//1. Tính tổng từ 1 đến 100.
let result = 0;
for (let i = 1; i <= 100; i++) {
    result = result + i;
}
console.log("Tổng từ 1 đến 100 là: " + result);

//2. In bảng cửu chương từ 2 đến 9.
for (let i = 2; i <= 9; i++) {
    for (let j = 1; j <= 10; j++) {
        console.log(i + " * " + j + " = " + i * j);
    }
}

//3. Tạo một mảng chứa các số lẻ từ 1 đến 99.
let array = [];
for (let i = 1; i <= 99; i++) {
    if (i % 2 === 1) {
        array.push(i);
    }
}
console.log(array);

/*4. In ra 10 email dựa trên tên người dùng và số thứ tự (ví dụ:
user1@example.com, user2@example.com, ..., user10@example.com).*/
for (let i = 1; i <= 10; i++) {
    console.log("user" + i + "@example.com");
}

/*5. Tính tổng doanh thu của 12 tháng trong năm dựa trên mảng doanh thu đã cho và
in ra tổng doanh thu. Biết cấu trúc object của mảng doanh thu như sau:
{“month”: 2, “total”: 100}*/
revenuePerMonth = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
let revenue = {
    month: 0,
    total: 0
}
revenue.month = revenuePerMonth.length;
for (let i = 0; i < revenue.month; i++) {
    revenue.total = revenue.total + revenuePerMonth[i];
}
console.log(revenue);
