// 1.Create a function that could take an argument which is an array of objects.
// Each object should contain property name and age. The function should return
// a new list which only contains the user who have higher than 18 years old
// function UserFilter(users) {
//     return users.filter(user => user.age > 18);
// }

// const users = [
//     { name: 'raksa', age: 25 },
//     { name: 'lol', age: 17 },
//     { name: 'Pisey', age: 20 },
//     { name: 'Devid', age: 16 }
// ];
// const userFilter = UserFilter(users);
// console.log(userFilter);


// 2.
// function uniqueValue(array) {
//     return array.filter((value, index, self) => self.indexOf(value) === index);
// }
// const num = [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10];
// const uniqueNum = uniqueValue(num);
// console.log(uniqueNum);

// 3.Given an array of user objects which include property name and age, use the `map`
//  method to create a new array that contains just the names of the users
// const users = [
//     { name: 'Mork', age: 25 },
//     { name: 'Raksa', age: 30 },
//     { name: 'OlO', age: 35 }
// ];

// function extractNames(users) {
//     return users.map(user => user.name);
// }
// console.log(extractNames(users));



// 4.
// function dateCoverter(dates) {
//     return dates.map(dateString => {
//         const [year, month, day] = dateString.split('-');
//         return `${day} ${month} ${year}`;
//     });
// }
// const dates = ["2024-.01-01", "2024-02-02", "2024-04-04"];
// console.log(dateCoverter(dates));



// 5.
// function MaxNum(num) {
//     return num.reduce((max, current) => {
//         return current > max ? current : max;
//     }, num[0]);
// }
// const num = [10, 5, 20, 15, 8];
// const maxNum = MaxNum(num);
// console.log(maxNum);


// 6.
const items = [
    { name: "Bread", category: "Grocery" },
    { name: "Butter", category: "Grocery" },
    { name: "Shampoo", category: "Personal Care" }
];

const groupedItem = items.reduce((result, currentItem) => {
    const { name, category } = currentItem;
    if (!result[category]) {
        result[category] = [];
    }
    result[category].push(name);
    return result;
}, {});
console.log(groupedItem);
