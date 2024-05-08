// // a
// const mockDatabase = [
//   { id: 1, name: "sok" },
//   { id: 2, name: "sao" },
//   { id: 3, name: "pisey" },
// ]

// const { Interface } = require("readline")

// // b
// function getUserById(id, callback) {
//   setTimeout(() => {
//     const user = mockDatabase.find((user) => user.id === id)
//     if (user) {
//       callback(null, user)
//     } else {
//       callback("User not found")
//     }
//   }, 2000)
// }

// // c
// function processUserData(user, callback) {
//   setTimeout(() => {
//     user.name = user.name
//     callback(null, user)
//   }, 1500)
// }

// // d
// getUserById(3, (err, user) => {
//   if (err) {
//     console.error(err)
//   } else {
//     processUserData(user, (err, processedUser) => {
//       if (err) {
//         console.error(err)
//       } else {
//         console.log("User Data:", processedUser)
//       }
//     })
//   }
// })

// 2 // old one
// const fs = require("fs")

// function readFile(filepath) {
//   return new Promise((resolve, reject) => {
//     fs.appendFile(filepath, fileContent, (err) => {
//       if (err) {
//         console.error("Error Write file:", err)
//         reject(err)
//       } else {
//         fs.readFile(filepath, "utf8", (err, data) => {
//           if (err) {
//             console.error("Error reading file:", err)
//             reject(err)
//           } else {
//             resolve(data)
//           }
//         })
//       }
//     })
//   })
// }
// let fileContent = "Mork Raksa\n"
// const filepath =
//   "Chrome Download/Javascript_Exercise/exercise_3/Test_Exercise_3.3.txt"
// readFile(filepath)
//   .then((data) => {
//     console.log(`Content: \n${data}`)
//     console.log("Write successfuly!")
//   })
//   .catch((err) => {
//     console.error("Error:", err)
//   })

// 2.1
// const fs = require("fs")
// function readFilePromise(filepath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filepath, 'utf8', (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }
// function writeFilePromise(filePath, content) {
//   return new Promise((resolve, reject) => {
//     fs.appendFile(filePath, content, 'utf8', (err) => {
//       if (err) {
//         reject(err)
//       } else {
//         console.log(`written successfully!!!`)
//         resolve(content)
//       }
//     })
//   })
// }

// let fileContent = '\t\t\t\tMork Raksa\n'
// const filepath = 'Y:/E5-Year3-G25/Web Design/HTML/Chrome Download/Javascript_Exercise/exercise_3/Test_Exercise_3.3.txt'

// writeFilePromise(filepath,fileContent)
// readFilePromise(filepath)
//   .then(data => {
//     console.log('---- Read file content ----')
//     console.log(data)
//     return fileContent
//   })
//   .then(contentToWrite => {
//     console.log('Data :', contentToWrite)
//   })
//   .catch(error => {
//     console.error('Error:', error)
//   })

// 3 // old one
// const fs = require("fs").promises

// async function readFileAsync(filepath) {
//     try {
//       await fs.appendFile(filepath, fileContent)
//       const data = await fs.readFile(filepath, 'utf-8')
//       return data
//     } catch (err) {
//       console.error("Error:", err)
//       throw err
//     }
// }
// let fileContent = "Mork Raksa\n"
// const filepath =  "Chrome Download/Javascript_Exercise/exercise_3/Test_Exercise_3.3.txt"

// (async ()=>{
//   try{
//     const data = await readFileAsync(filepath, fileContent)
//     console.log(`Content: \n${data}`)
//     console.log("Write successfuly!")
//   }catch(err){
//     console.error("Error:", err)
//   }
// })()


// 3.1 // new one
const fs = require('fs').promises

async function readFileAsync(filepath) {
  try {
    const data = await fs.readFile(filepath, 'utf-8')
    return data
  } catch (err) {
    console.error('Error reading file:', err)
  }
} 
  
async function writeFileAsync(filePath, content) {
  try {
    await fs.appendFile(filePath, content)
    console.log('Successfully')
  } catch (err) {
    console.error('Error :', err)
  }
} 

let fileContent = 'This is Async and Await function'
const filepath = 'Y:/E5-Year3-G25/Web Design/HTML/Chrome Download/Javascript_Exercise/exercise_3/Test_Exercise_3.4.txt';
(async () => {
  try {
    const data = await readFileAsync(filepath)
    console.log('Content:', data)
  
    await writeFileAsync(filepath, fileContent)
  } catch (err) {
    console.error('Error:', err)
  }
})()
