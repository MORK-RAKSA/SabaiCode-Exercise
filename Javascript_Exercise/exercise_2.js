//1. Write a declaration function that take a parameter called: “name”, and return a greeting message including that name
// function showName(names){console.log(`Greeting ${names}, nice to see you!`);}
// showName('Mork Raksa')  //result: Greeting Mork Raksa, nice to see you.


//2. Write an expression function that take two parameters “num1” & “num2” and returns their sum
// const sum = function sum(num1, num2){return num1 + num2}
// console.log(sum(5, 7));


// 3. Write an arrow function that that take an array of numbers as a parameter and returns the average of those numbers
// const arrayNumber = (number) =>{
//     let avg
//     let sum = 0
//     for(let i = 0; i < number.length; i++){
//         if(number.length === 0) return 0;
//         sum = sum + number[i];
//     }
//     return avg = sum/number.length;
// }
// let num = [1,2,3,4,5,6,7,8,9,10]
// console.log(arrayNumber(num));



// 4. Write an anonymous function that calculates BMI (Body Mass Index). Formula: BMI = weight / (height * height)
// const BMI = function(w, h){
//     return console.log(w / (h*h));
// }
// BMI(56, 1.75)



// 5. Write a function that could take a parameter that is an array of objects representing products with
// `name`, `price` and `quantity` property and filter out products with a quantity of zero
// products = [
//     {name: "Bag", price:200, qty:3},
//     {name: "Shoes", price:200, qty:0},
//     {name: "Laptop", price:200, qty:2},
//     {name: "Phone", price:200, qty:0}
//     ];
    
// const filterProduct = (products) => {
//     for(const pd of products){
//         if(pd.qty > 0){
//             console.log(`\nName: ${pd.name}\nPrice: ${pd.price}\nQuantity: ${pd.qty}`)
//         }
//     }
// }
// filterProduct(products) 


// 6.Write a function that could check if the password provided is strong or not.
// A strong password should have a minimum length of 8 characters

// function isStrongPassword(password) {
//     if (password.length >= 8) {
//         return true;
//     } else {
//         return false;
//     }
// }
// const password1 = "1234"; 
// const password2 = "visdfunvdf";

// console.log(isStrongPassword("Password 1" + password1)); // Output: false
// console.log(isStrongPassword("Password 2" + password2)); // Output: true



// 7.Write a function that count vowels of a string that provided as an input and return the count of vowels (a, e, i, o, u)
// function countVowels(txt) {
//     const txtLowerCase = txt.toLowerCase();
//     let vowelCount = 0;

//     for (const char of txtLowerCase) {
//         if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
//             vowelCount++;
//         }
//     }
//     return vowelCount;
// }

// const text = "Apple";
// console.log("Number of vowels:", countVowels(text));\



// 8. Write a function that could sort a list of numbers in ascending order.
// const list = [2,5,1,7,3,6,4,9,8,10];
// const sortNum = (list) => {
//     for(let i = 0; i < list.length; i++) {
//         for(let j = 0; j < list.length - 1; j++) {
//             if(list[j] > list[j + 1]) {
//                 let temp = list[j];
//                 list[j] = list[j + 1];
//                 list[j + 1] = temp;
//             }
//         }
//     }
//     return list;
// };
// console.log(sortNum(list));



// // 9. 

// function findMedian(arr) {
//     arr.sort((a, b) => a - b);
//     let middleIndex = Math.floor(arr.length / 2);
    
//     if (arr.length % 2 === 0) {
//         return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
//     } else {
//         return arr[middleIndex];
//     }
// }

// let list = [1, 2, 3, 4, 5, 6];
// let medianValue = findMedian(list);
// console.log("Median value:", medianValue);



