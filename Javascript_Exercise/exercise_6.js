// a
const mockDatabase = [
  { id: 1, name: "sok" },
  { id: 2, name: "sao" },
  { id: 3, name: "pisey" },
]

// b
function getUserById(id, callback) {
  setTimeout(() => {
    const user = mockDatabase.find((user) => user.id === id)
    if (user) {
      callback(null, user)
    } else {
      callback("User not found")
    }
  }, 2000)
}

// c
function processUserData(user, callback) {
  setTimeout(() => {
    user.name = user.name
    callback(null, user)
  }, 1500)
}

// d
getUserById(3, (err, user) => {
  if (err) {
    console.error(err)
  } else {
    processUserData(user, (err, processedUser) => {
      if (err) {
        console.error(err)
      } else {
        console.log("User Data:", processedUser)
      }
    })
  }
})
