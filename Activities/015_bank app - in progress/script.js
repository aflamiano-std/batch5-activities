// User Class: User skeleton
class User {
    constructor(uid, username, password, firstName, lastName, accountType) {
        this.uid = uid;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountType = accountType;
        this.balance = 1.1;
    }

    setBalance(amount) {
        this.balance = amount;
    }

    getBalance() {
        return this.balance;
    }
}

// UI Class: Handles UI
class UI {
    static list_users() {
        const users = Store.getUsers();
        users.forEach((user) => UI.addUserToList(user));
    }

    static addUserToList(user) {
        const list = document.querySelector('#user-list');
    
        const row = document.createElement('tr');
    
        row.innerHTML = `
          <td>${user.uid}</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.accountType}</td>
          <td>${user.balance}</td>
          <td><a href="#user-list" class="btn btn-primary btn-sm withdraw">Withdraw</a></td>
          <td><a href="#user-list" class="btn btn-secondary btn-sm deposit">Deposit</a></td>
          <td><a href="#user-list" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    
        list.appendChild(row);
    }

    static deleteUser(element) {
        element.parentElement.parentElement.remove();
    }

    static clearFields() {
        document.querySelector('#username').value = '',
        document.querySelector('#password').value = '',
        document.querySelector('#firstName').value = '',
        document.querySelector('#lastName').value = '',
        document.querySelector('[value="sa"]').checked = true;
    }
}

// Account Class: Handles Account Features
class Account {
    static generateUID() {
        return Date.now() + Math.random().toString().slice(2);
    }

    static create_user(user, balance) {
        const usr = new User(Account.generateUID(), user.username, user.password, user.firstName, user.lastName, user.accountType);
        UI.addUserToList(usr);
        Store.addUser(usr);
        console.log(Store.getUsers());
    }
    
    static deposit(user, amount) {
    
    }
    
    static withdraw(user, amount) {
    
    }
    
    static send(from_user, to_user, amount) {
    
    }
    
    static get_balance(user) {
    
    }
}

// Store Class: Handles Storage
class Store {
    static getUsers() {
        let users;
        if(localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

    static addUser(user) {
        const users = Store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    static removeUser(id) {
        const users = Store.getUsers();
        users.forEach((user, index) => {
            if(user.uid === id) {
                users.splice(index, 1);
            } else {
                //DO NOTHING
            }
        });
        localStorage.setItem('users', JSON.stringify(users));
    }
}

//Dummy inputs
const admin = {
    uid: 000000000000,
    username: 'admin'.toUpperCase(),
    password: 'admin'.toUpperCase(),
    accountType: 'AD'.toUpperCase()
}

const user1 = {
    uid: Account.generateUID(),
    username: 'username1'.toUpperCase(),
    password: 'password1'.toUpperCase(),
    firstName: 'First'.toUpperCase(),
    lastName: 'FirstLast'.toUpperCase(),
    accountType: 'SA'.toUpperCase()
}

const user2 = {
    uid: Account.generateUID(),
    username: 'username2'.toUpperCase(),
    password: 'password2'.toUpperCase(),
    firstName: 'Second'.toUpperCase(),
    lastName: 'SecondLast'.toUpperCase(),
    accountType: 'CA'.toUpperCase()
}


// Event: Display Users
document.addEventListener('DOMContentLoaded', UI.list_users);

// Event: Get form submitted values
document.querySelector('#user-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const userFormValues = { 
        username : document.querySelector('#username').value.toUpperCase(),
        password : document.querySelector('#password').value.toUpperCase(),
        firstName : document.querySelector('#firstName').value.toUpperCase(),
        lastName : document.querySelector('#lastName').value.toUpperCase(),
        accountType : document.querySelector('[name="customRadio"]:checked').value.toUpperCase()
    }

    Account.create_user(userFormValues);
    UI.clearFields();
});

// Event: Remove a User
document.querySelector('#user-list').addEventListener('click', (e) => {
    // Remove user from UI
    if(e.target.classList.contains('delete')) {
        UI.deleteUser(e.target); 
        // Remove user from store
        // console.log(e.target.parentElement.parentElement.firstElementChild.textContent);
        Store.removeUser(e.target.parentElement.parentElement.firstElementChild.textContent);
    } else if(e.target.classList.contains('withdraw')) {
        console.log('WITHDRAW');
    } else if(e.target.classList.contains('deposit')) {
        console.log('DEPOSIT');
    } else {
        //DO NOTHING
    }
});

//Catch errors
// wrong_arguments (e.g. amount cannot be negative, name cannot start with a number) 
// user_already_exists ('Den' == 'den')
// user_does_not_exists ('Den' == 'den')
// not_enough_money • sender_does_not_exists
// receiver_does_not_exists