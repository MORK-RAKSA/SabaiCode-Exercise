// 1. Write a function called that takes an array of numbers and a callback
// function that processes each element of the array. Use the callback to
// square each number in the array
// let list = [1,2,3,4,5,6,7,8,9]
// const sqare = (num) => num * num;

// const callSqare = (array, callback) => {
//   let x = [];
//     for(let i of array)
//     x.push(callback(i));
//   return x;
// }



// console.log(callSqare(list, sqare))

// 2. Create a function that takes an array of numbers and a callback.
// The callback should return true if a number is even. Use the callback to filter the array synchronously.
// const eventNum = (num) => num % 2 === 0;
// function arrayEventNum(arr, eventNum) {
//   const evenNumbers = [];
//   for (const num of arr) {
//     if (eventNum(num)) {
//       evenNumbers.push(num);
//     }
//   }
//   return evenNumbers;
// }
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(arrayEventNum(numbers, eventNum));

// 3. Use Node.js's fs module to read a file asynchronously:`fs.readFile`.
// Write a function that takes a file path and a callback. Use the callback
// to print the contents of the file to the console.
// const fs = require('fs');
// function readFileAsync(filepath, callback) {
//   fs.readFile(filepath, 'utf8', (e, data) => {
//     if (e) {
//       console.error(e);
//       callback(e);
//     } else {
//       callback(null, data);
//     }
//   });
// }
// const filepath = 'Y:/E5-Year3-G25/Web Design/HTML/Chrome Download/Javascript_Exercise/Test_Exercise_3.3.txt';
// readFileAsync(filepath, (e, data) => {
//   if (e) {
//     console.error('Error reading file:', e);
//   } else {
//     console.log(`content: \n${data}`);
//   }
// });

// 4. Use Node.js's fs module to write a file asynchronously `fs.writeFile`. Write a function that takes
// a file path and a callback. Use the callback to write the contents of the file to the file path.
const fs = require('fs');
function writeFile(filePath, content, callback) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}
let filePath = 'Y:/E5-Year3-G25/Web Design/HTML/Chrome Download/Javascript_Exercise/exercise_3/Test_Exercise_3.4.txt';
let fileContent = '[1,2,3,4,5,6,7,8,9,10]';

writeFile(filePath, fileContent, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('File has been written success.');
    }
});

//5.Use the example 3 & 4, write in the below scenario:
//     - Read the context of `input.txt`
//     - Append “First modification” to the content and write it to `output1.txt`
//     - Read `output1.txt` and append “SEcond modification” to the file `output2.txt`
//     - Finally read `output2.txt` and print to the console

// const fs = require("fs");

// function readFileAndModify(inputFilepath, modification, outputFilepath, callback) {
//   fs.readFile(inputFilepath, "utf8", (err, data) => {
//     if (err) return callback(err);
//     fs.writeFile(outputFilepath, `${data}\n${modification}`, "utf8", callback);
//   });
// }

// const inputFilepath = "Y:/E5-Year3-G25/Web Design/HTML/Chrome Download/Javascript_Exercise/exercise_3/input.txt";
// const output1Filepath = "Y:/E5-Year3-G25/Web Design/HTML/Chrome Download/Javascript_Exercise/exercise_3/output1.txt";
// const output2Filepath = "Y:/E5-Year3-G25/Web Design/HTML/Chrome Download/Javascript_Exercise/exercise_3/output2.txt";

// readFileAndModify(inputFilepath, "First", output1Filepath, (err) => {
//   if (err) return console.error("Error during first modification:", err);
//   readFileAndModify(output1Filepath, "Second", output2Filepath, (err) => {
//     if (err) return console.error("Error during second modification:", err);
//     fs.readFile(output2Filepath, "utf8", (err, data) => {
//       if (err) return console.error("Error reading final output:", err);
//       console.log("Final content:\n", data);
//     });
//   });
// });




