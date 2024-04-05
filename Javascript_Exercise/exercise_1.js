// Iterate through the numbers 1 to 10, and at each iteration print “i”
for (i = 1; i <= 10; i++) {
  console.log(i);
}

// Iterate through the numbers 10 to 1, and at each iteration print “i”
for (i = 10; i >= 1; i--) {
  console.log(i);
}

// Convert numerical grades into letter grades (A, B, C, D, E, F)
function numToGrade(grade) {
  if (grade >= 90) {
    return "A";
  } else if (grade >= 80) {
    return "B";
  } else if (grade >= 70) {
    return "C";
  } else if (grade >= 60) {
    return "D";
  } else if (grade >= 50) {
    return "E";
  } else {
    return "F";
  }
}
console.log(numToGrade(85));

// A company has a list of employees and their salary in separate arrays. You are tasked
// with the job of printing our the name of each employee and the employee’s salary as a
// string in the format: “Employee name: Employee salary”
let employees = ["Lara", "Evee", "Simi"];
let salary = [1000, 2000, 120.9];

if (employees.length != salary.length) {
  console.log("Error...");
} else {
  for (let i = 0; i < employees.length; i++)
    console.log(
      [i] +
        "\n- Employee's name: " +
        employees[i] +
        "\n" +
        "- Salary: " +
        salary[i]
    );
}

// Write a loop that displays from 1 to 10 except even numbers
for (let i = 0; i <= 10; i += 2) {
  console.log(i); //  result: 0, 2, 4, 6, 8, 10
}

// Write a program that count the odd and even numbers from the list of numbers containing 1 to 10
let list1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let oddNum = 0;
let evenNum = 0;

for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    evenNum++;
    console.log(i + " is even."); // result:
  } else {                        //  1 is odd, 2 is even, 3 is odd, 4 is even, 5 is odd,
    oddNum++;                     //  6 is even, 7 is even, 8 is odd, 9 is even,  10 is even.
    console.log(i + " is odd.");
  }
}

// Write a program that prints the numbers from 1 to 100. But for multiples of three
// print “Fizz” instead of number and for the multiples of five print “Buzz”. For
// numbers which are multiples of both three and five, print “FizzBuzz”
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}

// Write a program that uses a loop to calculate the sum of all numbers in an array.
let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0;
for (let i = 0; i < list.length; i++) {     // result: 55; 
  sum = sum + list[i];
}
console.log(sum);

// Prime Number from 1 to 100
const isPrime = num => {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++)
    if (num % i === 0) return false;
  return true;
};

console.log("Prime numbers between 1 and 100:");
for (let i = 2; i <= 100; i++) 
  if (isPrime(i))
    console.log(i);

// Find Largest Number in array list
function findLargestNumber(array) {
  if (array.length === 0) {
    return "Array is empty";
  }

  let largest = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > largest) {
      largest = array[i];
    }
  }

  return largest;
}
let numbers = [10, 5, 20, 15, 90, 23, 8];
let largestNumber = findLargestNumber(numbers);
console.log("The largest number in the array is: " + largestNumber);
