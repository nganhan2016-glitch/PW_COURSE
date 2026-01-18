// ---------------Exe 1---------------
const person = {
    firstName: "Nga",
    lastName: "Nhan",
    age: 18,
    occupation: "software tester"
};

const {firstName, lastName, age, occupation} = person;
console.log (firstName);
console.log (lastName);
console.log (age);
console.log (occupation);

// ---------------Exe 2---------------
const car = {
    brand:"Toyota",
    model: "Camry",
    year: 2022,
    color: "white"
}

const {brand, model, year, color} = car;
console.log(brand);
console.log(model);
console.log(year);
console.log(color);

// ---------------Exe 3---------------
const user = {
    //name: 

}
const {name = "Guest"} = user;
console.log(name);

// ---------------Exe 4---------------
const product = {
    //price:
}
const {price = "0"} = product;
console.log(price);

// ---------------Exe 5---------------
const book = {
    title: "Playwright for Dummmies"
}
const {title: bookTitle} = book;
console.log(bookTitle);

// ---------------Exe 6---------------
const movie = {
    director: "Ly Hai"
}
const {director: filmDiretor} = movie;
console.log(filmDiretor);

// ---------------Exe 7---------------
const address = {
    street: "Nguyen Kim",
    city: "Ho Chi Minh",
    country: "Viet Nam"
}
const person1 = {
    address 
}

const { address: { street } } = person1;
console.log(street);

// ---------------Exe 8---------------
const details = {
    brand:"Mitsubitshi",
    model1: "Xpander Cross",
    color: "Gray"
}
const product1 = {
    details
}

const {details: { model1 }} = product1;
console.log(model1);