//  1.
//  class Book {
//     title: string;
//     author: string;
//     genre: string;
//     available: boolean;

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


import * as readline from 'readline';

class Book {
    title: string;
    author: string;
    genre: string;
    available: boolean;

    constructor(title: string, author: string, genre: string, available: boolean) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.available = available;
    }
}

class User {
    name: string;
    borrowedBooks: Book[];

    constructor(name: string) {
        this.name = name;
        this.borrowedBooks = [];
    }

    borrowBook(book: Book): void {
        this.borrowedBooks.push(book);
        console.log(`${this.name} borrowed "${book.title}" successfully!`);
    }

    viewBorrowedBooks(): void {
        console.log(`${this.name}'s Borrowed Books:`);
        this.borrowedBooks.forEach(book => {
            console.log(`- ${book.title} by ${book.author}`);
        });
    }
}

class Library {
    name: string;
    books: Book[];
    users: { [key: string]: User };

    constructor(name: string, books: Book[]) {
        this.name = name;
        this.books = books;
        this.users = {};
    }

    addUser(name: string): void {
        this.users[name] = new User(name);
    }

    getUser(name: string): User | undefined {
        return this.users[name];
    }

    addBook(title: string, author: string, genre: string): void {
        this.books.push(new Book(title, author, genre, true));
        console.log(`Book "${title}" added successfully!`);
    }

    removeBookByTitle(title: string): void {
        const index = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
        if (index !== -1) {
            this.books.splice(index, 1);
            console.log(`Book "${title}" removed successfully!`);
        } else {
            console.log(`Book "${title}" not found in the library.`);
        }
    }

    searchByTitle(title: string): Book[] {
        return this.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    }

    searchByAuthor(author: string): Book[] {
        return this.books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }

    searchByGenre(genre: string): Book[] {
        return this.books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
    }

    displayAvailableBooks(): void {
        const availableBooks = this.books.filter(book => book.available);
        console.log(`Available Books in ${this.name}:`);
        availableBooks.forEach(book => {
            console.log(`- ${book.title} by ${book.author}`);
        });
    }

    borrowBook(userName: string, title: string): void {
        const user = this.getUser(userName);
        if (!user) {
            console.log(`User "${userName}" not found.`);
            return;
        }

        const book = this.books.find(book => book.title.toLowerCase() === title.toLowerCase() && book.available);
        if (book) {
            book.available = false;
            user.borrowBook(book);
        } else {
            console.log(`Book "${title}" is either not available or doesn't exist.`);
        }
    }

    returnBook(userName: string, title: string): void {
        const user = this.getUser(userName);
        if (!user) {
            console.log(`User "${userName}" not found.`);
            return;
        }

        const borrowedBookIndex = user.borrowedBooks.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
        if (borrowedBookIndex !== -1) {
            const book = user.borrowedBooks[borrowedBookIndex];
            book.available = true;
            user.borrowedBooks.splice(borrowedBookIndex, 1);
            console.log(`Book "${title}" returned successfully!`);
        } else {
            console.log(`Book "${title}" not found in the borrowed books of user "${userName}".`);
        }
    }

    viewBorrowersByBook(title: string): void {
        const book = this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
        if (book) {
            const borrowers = Object.values(this.users).filter(user => {
                return user.borrowedBooks.some(borrowedBook => borrowedBook.title.toLowerCase() === title.toLowerCase());
            });
            if (borrowers.length > 0) {
                console.log(`Users who borrowed "${title}":`);
                borrowers.forEach(user => console.log(`- ${user.name}`));
            } else {
                console.log(`No users have borrowed "${title}".`);
            }
        } else {
            console.log(`Book "${title}" not found.`);
        }
    }
}

const library = new Library("Local Library", []);

const rl = readline.createInterface({
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

function handleUserInput(option: string) {
    switch(option) {
        case '1':
            library.displayAvailableBooks();
            break;
        case '2':
            rl.question("Enter book title: ", title => {
                rl.question("Enter author: ", author => {
                    rl.question("Enter genre: ", genre => {
                        library.addBook(title, author, genre);
                        displayMenu();
                    });
                });
            });
            break;
        case '3':
            rl.question("Enter the title of the book to remove: ", title => {
                library.removeBookByTitle(title);
                displayMenu();
            });
            break;
        case '4':
            rl.question("Enter title to search for: ", title => {
                console.log(library.searchByTitle(title));
                displayMenu();
            });
            break;
        case '5':
            rl.question("Enter author to search for: ", author => {
                console.log(library.searchByAuthor(author));
                displayMenu();
            });
            break;
        case '6':
            rl.question("Enter genre to search for: ", genre => {
                console.log(library.searchByGenre(genre));
                displayMenu();
            });
            break;
        case '7':
            rl.question("Enter user name: ", userName => {
                rl.question("Enter the title of the book to borrow: ", title => {
                    library.borrowBook(userName, title);
                    displayMenu();
                });
            });
            break;
        case '8':
            rl.question("Enter user name: ", userName => {
                rl.question("Enter the title of the book to return: ", title => {
                    library.returnBook(userName, title);
                    displayMenu();
                });
            });
            break;
        case '9':
            rl.question("Enter user name: ", name => {
                library.addUser(name);
                console.log(`User ${name} created successfully!`);
                displayMenu();
            });
            break;
        case '10':
            rl.question("Enter user name: ", userName => {
                const user = library.getUser(userName);
                if (user) {
                    user.viewBorrowedBooks();
                } else {
                    console.log(`User "${userName}" not found.`);
                }
                displayMenu();
            });
            break;
        case '11':
            rl.question("Enter the title of the book: ", title => {
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

rl.on('close', () => {
    console.log("Exiting...");
    process.exit(0);
});

rl.on('line', (input) => {
    handleUserInput(input.trim());
});

displayMenu();
