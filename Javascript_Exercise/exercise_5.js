// 1
// const colors = ["Red", "Blue", "Green"]
// const [firstColor, , thirdColor] = colors
// console.log(`First Color : ${firstColor}\nthird Color : ${thirdColor}`)


// 2
// const person = { name: "raksa", age: 25, job: "developer" }
// const { name, age } = person
// console.log(`Name : ${name}\nAge : ${age}`)



// // 3
// const user = {id:1, name: "Sok", address: {street: "123 Main St",city: "PP"}};
// const { address: { street, city } } = user;
// console.log(`Street : ${street} \nCity : ${city}`)


// // 4
// const num1 = [1, 2, 3];
// const num2 = [4, 5, 6];
// const mergedArr = [...num1, ...num2]
// console.log(mergedArr)


// 5
// function sum(...nums) {
//     return nums.reduce((acc, curr) => acc + curr, 0)
// }
// console.log(sum(1, 2, 3, 4, 5 ,6, 7, 8, 9, 10))



// 6
// const point = [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}];
// const [firstPoint, ...otherPoint] = point
// console.log("First point:", firstPoint)
// console.log("Other point:", otherPoint)


// 7
function findProperties(obj, ...filterPro) {
    const findObj = {...obj};
    filterPro.forEach(pro => delete findObj[pro]);
    return findObj;
}
const obj = {a: 1, b: 2, c: 3, d: 4}
console.log(findProperties(obj, "b", "d"))
