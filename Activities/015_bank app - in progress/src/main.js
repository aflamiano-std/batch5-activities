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
  static getUsers() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
  }

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

  static addUser(user) {
    const users = Store.getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

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

  static setStoreId(uid) {
    localStorage.setItem("GUID", uid);
  }

  static getStoredId() {
    return localStorage.getItem("GUID");
  }

  static releaseStoredId() {
    localStorage.setItem("GUID", null);
  }

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

    // console.log(user);
    Store.addUser(user);
  }

  static deposit(user, amount) {
    let currentBalance = Account.get_balance(user);
    let total = parseFloat(currentBalance) + amount;
    // console.log(currentBalance);
    user.balance = parseFloat(total).toFixed(2);
    // console.log(user.balance);
    Store.updateUser(user);
  }

  static withdraw(user, amount) {
    let currentBalance = Account.get_balance(user);
    let total = parseFloat(currentBalance) - amount;
    // console.log(currentBalance);
    user.balance = parseFloat(total).toFixed(2);
    // console.log(user.balance);
    Store.updateUser(user);
  }

  static send(from_user, to_user, amount) {
    // console.log(from_user);
    // console.log(to_user);
    // console.log(amount);
    Account.withdraw(from_user, amount);
    Account.deposit(to_user, amount);
  }

  static get_balance(user) {
    return Store.getUser(user.id).balance;
  }
}

// UI Class: Handles UX related functions
class UI {
  static list_users() {
    const users = Store.getUsers();
    users.forEach((user) => UI.addUserToList(user));
  }

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
            <td><a href="#" class="withdraw">Withdraw</a></td>
            <td><a href="#" class="deposit">Deposit</a></td>
            <td><a href="#" class="send">Send</a></td>
            <td><a href="#" class="delete">X</a></td>
          `;

    list.appendChild(row);
  }

  static deleteUser(element) {
    // console.log(element.parentElement.parentElement);
    element.parentElement.parentElement.remove();
  }

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
}

class Validation {
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

  static checkIfUserExists(username) {
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

  static checkSufficientFunds(user, amount) {
    if (user.balance < amount) {
      alert("Insufficient Balance");
      return false;
    } else {
      return true;
    }
  }
}
// document.addEventListener("DOMContentLoaded", Store.releaseStoredId());
