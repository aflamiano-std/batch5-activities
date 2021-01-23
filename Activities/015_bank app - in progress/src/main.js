// THREE UNIQUE FEATURES
// 1. Account number increments even after account has been deleted to prevent
//    future withdrawals or deposits to a different account when creating a new user
// 2. Stored GUID will be deleted once page tab or window is closed
// 3. Added edit function for the user to edit first name, last name, and email

// User Class: Represents a User
class User {
  constructor(uid, accn, user, pass, fname, lname, email, accType) {
    this.id = uid;
    this.accountNumber = accn;
    this.username = user;
    this.password = pass;
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.accountType = accType;
    this.balance = 0.0;
  }
  setBalance(balance) {
    this.balance = balance;
  }
}

// Store Class: Handles storage of data
class Store {
  // Get an Array of users object from local storage
  static getUsers() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
  }

  // Get only the id of a user using Account Number
  static getId(accn) {
    const users = Store.getUsers();
    let retrievedId;
    users.forEach((user, index) => {
      if (user.accountNumber === accn) {
        retrievedId = user.id;
      } else {
        //DO NOTHING
      }
    });
    return retrievedId;
  }

  // Get a user object using its id
  static getUser(uid) {
    const users = Store.getUsers();
    let retrievedUser;
    users.forEach((user, index) => {
      if (user.id === uid) {
        retrievedUser = user;
      } else {
        //DO NOTHING
      }
    });
    return retrievedUser;
  }

  // Adds a user object to local storage
  static addUser(user) {
    const users = Store.getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Updates a user object on local storage
  static updateUser(update) {
    const users = Store.getUsers();
    users.forEach((user, index) => {
      if (user.id === update.id) {
        users.splice(index, 1, update);
      } else {
        //DO NOTHING
      }
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Deletes a user object from local storage using its id
  static removeUser(uid) {
    // console.log(`REMOVE USER INITIATED for ${uid}`);
    const users = Store.getUsers();
    users.forEach((user, index) => {
      if (user.id === uid) {
        users.splice(index, 1);
      } else {
        //DO NOTHING
      }
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Stores id of a selected user to local storage to be accessed on any page
  static setStoreId(uid) {
    localStorage.setItem("GUID", uid);
  }

  // Gets id of a selected user from local storage to be accessed on any page
  static getStoredId() {
    return localStorage.getItem("GUID");
  }

  // Sets stored id to NULL
  static releaseStoredId() {
    localStorage.setItem("GUID", null);
  }

  // Gets latest increment count of registered accounts even when they are deleted
  static getNextAccnNumber() {
    let accn = 0;
    if (localStorage.getItem("accnCurrent") === null) {
      accn = Store.getUsers().length + 1;
    } else {
      accn = JSON.parse(localStorage.getItem("accnCurrent")) + 1;
    }
    localStorage.setItem("accnCurrent", accn);
    return accn;
  }
}

// Account Class: Handles account related functions
class Account {
  // Creates a User object from form data and stores it to local storage
  static create_user(formData, balance) {
    const user = new User(
      formData.id,
      formData.accountNumber,
      formData.username,
      formData.password,
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.accountType
    );
    user.setBalance(balance);

    Store.addUser(user);
  }

  // Edits a user with form data and stores it to local storage
  static edit_user(uid, formData) {
    let user = Store.getUser(uid);
    user.firstName = formData.firstName;
    user.lastName = formData.lastName;
    user.email = formData.email;
    Store.updateUser(user);
  }

  // Retrieves current balance of a user and deposits specified amount and stores it to local storage
  static deposit(user, amount) {
    let currentBalance = Account.get_balance(user);
    let total = parseFloat(currentBalance) + amount;
    user.balance = parseFloat(total).toFixed(2);
    Store.updateUser(user);
  }

  // Retrieves current balance of a user and withdraws specified amount and stores it to local storage
  static withdraw(user, amount) {
    let currentBalance = Account.get_balance(user);
    let total = parseFloat(currentBalance) - amount;
    user.balance = parseFloat(total).toFixed(2);
    Store.updateUser(user);
  }

  // Performs withdraw function on sender and deposit function on receiver with a specified amount which stores them to local storage
  static send(from_user, to_user, amount) {
    Account.withdraw(from_user, amount);
    Account.deposit(to_user, amount);
  }

  // Retrieves only the balance of a user
  static get_balance(user) {
    return Store.getUser(user.id).balance;
  }
}

// UI Class: Handles UX related functions
class UI {
  // lists ALL users retrieved from local storage to the UI
  static list_users() {
    const users = Store.getUsers();
    users.forEach((user) => UI.addUserToList(user));
  }

  // Adds user retrieved from local storage to the bottom of the list
  static addUserToList(user) {
    const list = document.querySelector("#user-list");

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${user.accountNumber}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.accountType}</td>
            <td>${user.balance}</td>
            <td><a href="#" class="edit">Edit</a></td>
            <td><a href="#" class="withdraw">Withdraw</a></td>
            <td><a href="#" class="deposit">Deposit</a></td>
            <td><a href="#" class="send">Send</a></td>
            <td><a href="#" class="delete">X</a></td>
          `;

    list.appendChild(row);
  }

  // deletes selected user from the UI
  static deleteUser(element) {
    element.parentElement.parentElement.remove();
  }

  // list the details of a user retrieved local storage
  static listUserDetails(user) {
    const details = document.querySelector("#accountDetails");
    details.innerHTML = `
    <li>Account Number: ${user.accountNumber}</li>
    <li>Name: ${user.firstName} ${user.lastName}</li>
    <li>Email: ${user.email.toLowerCase()}</li>
    <li>Account type: ${user.accountType}</li>
    <li>Current balance: ${user.balance}</li>
    `;
  }

  // Adds values to input fields according to user being edited
  static defaultUserDetails(user) {
    document.querySelector("#firstName").value = user.firstName;
    document.querySelector("#lastName").value = user.lastName;
    document.querySelector("#email").value = user.email;
  }
}

class Validation {
  // Checks create user input fields for wrong arguments, returns true or false
  static checkCreateUserForm(formData) {
    // formData.id,
    // formData.accountNumber,
    // formData.username,
    // formData.password,
    // formData.firstName,
    // formData.lastName,
    // formData.email,
    // formData.accountType
    let regex = /^[0-9]+$/;
    let status = true;
    if (formData.username.charAt(0).match(regex)) {
      alert("Username MUST start with a string");
      status = false;
    }
    if (formData.firstName.charAt(0).match(regex)) {
      alert("First Name MUST start with a string");
      status = false;
    }
    if (formData.lastName.charAt(0).match(regex)) {
      alert("Last Name MUST start with a string");
      status = false;
    }
    return status;
  }

  // Checks edit user input fields for wrong arguments, returns true or false
  static checkEditUserForm(formData) {
    // formData.firstName,
    // formData.lastName,
    // formData.email,
    let regex = /^[0-9]+$/;
    let status = true;
    if (formData.firstName.charAt(0).match(regex)) {
      alert("First Name MUST start with a string");
      status = false;
    }
    if (formData.lastName.charAt(0).match(regex)) {
      alert("Last Name MUST start with a string");
      status = false;
    }
    return status;
  }

  // Checks if user with the same username exists in local storage, returns true or false
  static checkIfUserDoesNotExist(username) {
    let users = Store.getUsers();
    let status = true;
    users.forEach((user, index) => {
      if (user.username === username) {
        alert("User already exists");
        status = false;
      } else {
        // DO NOTHING
      }
    });
    return status;
  }

  // Checks if user with the same account number exists in local storage, returns true or false
  static checkIfAccountExists(user, accn) {
    let users = Store.getUsers();
    let status = false;
    if (user.accountNumber === accn) {
      alert("You cannot send to your own account");
      status = false;
    } else {
      users.forEach((user, index) => {
        if (user.accountNumber === accn) {
          status = true;
        }
      });
      if (status === false) {
        alert("Account does not exist");
      }
    }
    return status;
  }

  // Checks if user's balance has enough funds to make a transfer
  static checkSufficientFunds(user, amount) {
    if (user.balance < amount) {
      alert("Insufficient Balance");
      return false;
    } else {
      return true;
    }
  }
}
