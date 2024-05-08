"use strict";
//  1.
//  class Book {
//     title: string;
//     author: string;
//     genre: string;
//     available: boolean;
Object.defineProperty(exports, "__esModule", { value: true });
//     constructor(title: string, author: string, genre: string, available: boolean) {
//         this.title = title;
//         this.author = author;
//         this.genre = genre;
//         this.available = available;
//     }
// }
// class Library {
//     name: string;
//     books: Book[];
//     constructor(name: string, books: Book[]) {
//         this.name = name;
//         this.books = books;
//     }
//     displayBooks(): void {
//         console.log("Books available in\t\t:", this.name);
//         this.books.forEach(book => {
//             console.log(`${book.title} by ${book.author}`);
//         });
//     }
// }
// const book1 = new Book("- The Great Raksa", "Mork. Raksa", "novel", true);
// const book2 = new Book("- To Kill a dig bick", "Mork. Raksa", "novel", false);
// const library = new Library("\nLocal Library", [book1, book2]);
// library.displayBooks();
var readline = require("readline");
var Book = /** @class */ (function () {
    function Book(title, author, genre, available) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.available = available;
    }
    return Book;
}());
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
        this.borrowedBooks = [];
    }
    User.prototype.borrowBook = function (book) {
        this.borrowedBooks.push(book);
        console.log("".concat(this.name, " borrowed \"").concat(book.title, "\" successfully!"));
    };
    User.prototype.viewBorrowedBooks = function () {
        console.log("".concat(this.name, "'s Borrowed Books:"));
        this.borrowedBooks.forEach(function (book) {
            console.log("- ".concat(book.title, " by ").concat(book.author));
        });
    };
    return User;
}());
var Library = /** @class */ (function () {
    function Library(name, books) {
        this.name = name;
        this.books = books;
        this.users = {};
    }
    Library.prototype.addUser = function (name) {
        this.users[name] = new User(name);
    };
    Library.prototype.getUser = function (name) {
        return this.users[name];
    };
    Library.prototype.addBook = function (title, author, genre) {
        this.books.push(new Book(title, author, genre, true));
        console.log("Book \"".concat(title, "\" added successfully!"));
    };
    Library.prototype.removeBookByTitle = function (title) {
        var index = this.books.findIndex(function (book) { return book.title.toLowerCase() === title.toLowerCase(); });
        if (index !== -1) {
            this.books.splice(index, 1);
            console.log("Book \"".concat(title, "\" removed successfully!"));
        }
        else {
            console.log("Book \"".concat(title, "\" not found in the library."));
        }
    };
    Library.prototype.searchByTitle = function (title) {
        return this.books.filter(function (book) { return book.title.toLowerCase().includes(title.toLowerCase()); });
    };
    Library.prototype.searchByAuthor = function (author) {
        return this.books.filter(function (book) { return book.author.toLowerCase().includes(author.toLowerCase()); });
    };
    Library.prototype.searchByGenre = function (genre) {
        return this.books.filter(function (book) { return book.genre.toLowerCase() === genre.toLowerCase(); });
    };
    Library.prototype.displayAvailableBooks = function () {
        var availableBooks = this.books.filter(function (book) { return book.available; });
        console.log("Available Books in ".concat(this.name, ":"));
        availableBooks.forEach(function (book) {
            console.log("- ".concat(book.title, " by ").concat(book.author));
        });
    };
    Library.prototype.borrowBook = function (userName, title) {
        var user = this.getUser(userName);
        if (!user) {
            console.log("User \"".concat(userName, "\" not found."));
            return;
        }
        var book = this.books.find(function (book) { return book.title.toLowerCase() === title.toLowerCase() && book.available; });
        if (book) {
            book.available = false;
            user.borrowBook(book);
        }
        else {
            console.log("Book \"".concat(title, "\" is either not available or doesn't exist."));
        }
    };
    Library.prototype.returnBook = function (userName, title) {
        var user = this.getUser(userName);
        if (!user) {
            console.log("User \"".concat(userName, "\" not found."));
            return;
        }
        var borrowedBookIndex = user.borrowedBooks.findIndex(function (book) { return book.title.toLowerCase() === title.toLowerCase(); });
        if (borrowedBookIndex !== -1) {
            var book = user.borrowedBooks[borrowedBookIndex];
            book.available = true;
            user.borrowedBooks.splice(borrowedBookIndex, 1);
            console.log("Book \"".concat(title, "\" returned successfully!"));
        }
        else {
            console.log("Book \"".concat(title, "\" not found in the borrowed books of user \"").concat(userName, "\"."));
        }
    };
    Library.prototype.viewBorrowersByBook = function (title) {
        var book = this.books.find(function (book) { return book.title.toLowerCase() === title.toLowerCase(); });
        if (book) {
            var borrowers = Object.values(this.users).filter(function (user) {
                return user.borrowedBooks.some(function (borrowedBook) { return borrowedBook.title.toLowerCase() === title.toLowerCase(); });
            });
            if (borrowers.length > 0) {
                console.log("Users who borrowed \"".concat(title, "\":"));
                borrowers.forEach(function (user) { return console.log("- ".concat(user.name)); });
            }
            else {
                console.log("No users have borrowed \"".concat(title, "\"."));
            }
        }
        else {
            console.log("Book \"".concat(title, "\" not found."));
        }
    };
    return Library;
}());
var library = new Library("Local Library", []);
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function displayMenu() {
    console.log("\nMenu:");
    console.log("1. Display available books");
    console.log("2. Add a book");
    console.log("3. Remove a book by title");
    console.log("4. Search for books by title");
    console.log("5. Search for books by author");
    console.log("6. Search for books by genre");
    console.log("7. Borrow a book");
    console.log("8. Return a book");
    console.log("9. Create a user account");
    console.log("10. View borrowed books by user");
    console.log("11. View borrowers by book");
    console.log("0. Exit");
}
function handleUserInput(option) {
    switch (option) {
        case '1':
            library.displayAvailableBooks();
            break;
        case '2':
            rl.question("Enter book title: ", function (title) {
                rl.question("Enter author: ", function (author) {
                    rl.question("Enter genre: ", function (genre) {
                        library.addBook(title, author, genre);
                        displayMenu();
                    });
                });
            });
            break;
        case '3':
            rl.question("Enter the title of the book to remove: ", function (title) {
                library.removeBookByTitle(title);
                displayMenu();
            });
            break;
        case '4':
            rl.question("Enter title to search for: ", function (title) {
                console.log(library.searchByTitle(title));
                displayMenu();
            });
            break;
        case '5':
            rl.question("Enter author to search for: ", function (author) {
                console.log(library.searchByAuthor(author));
                displayMenu();
            });
            break;
        case '6':
            rl.question("Enter genre to search for: ", function (genre) {
                console.log(library.searchByGenre(genre));
                displayMenu();
            });
            break;
        case '7':
            rl.question("Enter user name: ", function (userName) {
                rl.question("Enter the title of the book to borrow: ", function (title) {
                    library.borrowBook(userName, title);
                    displayMenu();
                });
            });
            break;
        case '8':
            rl.question("Enter user name: ", function (userName) {
                rl.question("Enter the title of the book to return: ", function (title) {
                    library.returnBook(userName, title);
                    displayMenu();
                });
            });
            break;
        case '9':
            rl.question("Enter user name: ", function (name) {
                library.addUser(name);
                console.log("User ".concat(name, " created successfully!"));
                displayMenu();
            });
            break;
        case '10':
            rl.question("Enter user name: ", function (userName) {
                var user = library.getUser(userName);
                if (user) {
                    user.viewBorrowedBooks();
                }
                else {
                    console.log("User \"".concat(userName, "\" not found."));
                }
                displayMenu();
            });
            break;
        case '11':
            rl.question("Enter the title of the book: ", function (title) {
                library.viewBorrowersByBook(title);
                displayMenu();
            });
            break;
        case '0':
            rl.close();
            break;
        default:
            console.log("Invalid option!");
            displayMenu();
            break;
    }
}
rl.on('close', function () {
    console.log("Exiting...");
    process.exit(0);
});
rl.on('line', function (input) {
    handleUserInput(input.trim());
});
displayMenu();
