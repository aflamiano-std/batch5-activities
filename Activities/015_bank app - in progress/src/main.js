// User Class: Represents a User
class User {
  constructor(uid, accn, fname, lname, email, accType) {
    this.id = uid;
    this.accountNumber = accn;
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
}

// Account Class: Handles account related functions
class Account {
  static create_user(formData, balance) {
    const user = new User(
      formData.id,
      formData.accountNumber,
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.accountType
    );
    user.setBalance(balance);

    console.log(user);
    Store.addUser(user);
  }

  static deposit(user, amount) {
    let currentBalance = Account.get_balance(user);
    console.log(currentBalance);
    user.balance = currentBalance + amount;
    console.log(user.balance);
    Store.updateUser(user);
  }

  static withdraw(user, amount) {
    let currentBalance = Account.get_balance(user);
    console.log(currentBalance);
    user.balance = currentBalance - amount;
    console.log(user.balance);
    Store.updateUser(user);
  }

  static send(from_user, to_user, amount) {
    console.log(from_user);
    console.log(to_user);
    console.log(amount);
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

// document.addEventListener("DOMContentLoaded", Store.releaseStoredId());
