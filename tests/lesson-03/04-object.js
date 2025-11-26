/*
Object
Tạo file lesson-03/04-object.js , thêm bài giải lần lượt cho các bài sau:
1. Tạo một object car với thuộc tính make=”Toyota”, model=”Corolla”, và
year=2021. Sau đó in ra năm sản xuất của xe.
*/
let car = {
    make: "Toyota",
    model: "Corolla",
    year: "2021"
}
console.log("Năm sản xuất của xe là: " + car.year);

/*
2. Tạo một object person có thuộc tính name, address (là một object lồng với các thuộc
tính street, city, country). In ra tên đường của người này.
*/
let person = {
    name: "Nga",
    address: {
        street: "Le Trong Tan",
        city: "Binh Duong",
        country: "Viet Nam"
    }
}
console.log("Bạn " + person.name + " ở đường " + person.address.street);

/*
3. Tạo một object student và truy cập đến điểm môn toán (math) sử dụng ngoặc vuông.
Biết object student bao gồm 2 thuộc tính: name và grades. Trong đó grades là một
object với 2 thuộc tính kiểu number: math và english
*/
let student = {
    name: "Karina",
    grades: {
        "math": 10,
        "english": 9.5
    }
}
console.log(student.name + " có điểm Math là " + student.grades["math"]);

/*
4. Tạo một object settings để quản lý cài đặt của ứng dụng với các thuộc tính như
volume, brightness. Thay đổi volume và in ra object mới.
*/
let settings = {
    volume: 10,
    brightness: 10
}
settings.volume = 5;
console.log(settings);

/*
5. Tạo một object bike và sau đó thêm thuộc tính color vào object đó
*/
let bike = {
    brand: 'Dat bike'
}
bike.color = "black orange";
console.log(bike);

//6. Tạo một object employee với các thuộc tính: name, age và xóa thuộc tính age khỏi object này
let employee = {
    name: "NN",
    age: 43
}
console.log(employee);
delete employee.age;
console.log(employee);

/*
7. Một trường học có các lớp học và học sinh như sau:
○ classA: An, Bình, Châu
○ classB: Đào, Hương, Giang
Hãy viết code để đáp ứng yêu cầu sau:
- Khai báo tên biến: school
- Tên class là tên thuộc tính, giá trị của các thuộc tính này là một mảng chứa tên các học sinh
Vd:
const school = { classA: ["Giang"]...}
*/
let school = {
    classA: ["An", "Bình", "Châu"],
    classB: ["Đào", "Hương", "Giang"]
}
for (let i = 0; i < school.classA.length; i++) {
    console.log(school.classA[i]);
}
for (let i = 0; i < school.classB.length; i++) {
    console.log(school.classB[i]);
}