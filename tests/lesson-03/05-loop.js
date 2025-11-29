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
let revenue = [
    {"month":1, "total":100},
    {"month":2, "total":110},
    {"month":3, "total":120},
    {"month":4, "total":130},
    {"month":5, "total":140},
    {"month":6, "total":150},
    {"month":7, "total":160},
    {"month":8, "total":170},
    {"month":9, "total":180},
    {"month":10, "total":190},
    {"month":11, "total":200},
    {"month":12, "total":200}, 
]
let totalRevenue = 0;
for (let i = 0; i < revenue.length; i++) {
    totalRevenue = totalRevenue + revenue[i].total;
}
console.log("Bài 5: Tổng doanh thu: " + totalRevenue);
