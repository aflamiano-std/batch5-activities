const userForm = document.querySelector('#user-form');
const withdrawForm = document.querySelector('#withdraw-form');
const depositForm = document.querySelector('#deposit-form');

const wuidText = document.querySelector('#withdrawUidText');
const duidText = document.querySelector('#depositUidText');
let id = null;

// User Class: User skeleton
class User {
    constructor(uid, username, password, firstName, lastName, accountType) {
        this.uid = uid;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountType = accountType;
        this.balance = 0.0;
    }
}

// UI Class: Handles UI items
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

    static refreshList() {
        const list = document.querySelector('#user-list');
        list.innerHTML = '';
        UI.list_users();
    }

    static deleteUser(element) {
        element.parentElement.parentElement.remove();
    }

    static displayForm(form) {
        switch (form) {
            case 'withdraw':
                userForm.classList.add('d-none');
                depositForm.classList.add('d-none');
                withdrawForm.classList.remove('d-none');
                break;
            case 'deposit':
                userForm.classList.add('d-none');
                depositForm.classList.remove('d-none');
                withdrawForm.classList.add('d-none');
                break;
            case 'addUser':
                userForm.classList.remove('d-none');
                depositForm.classList.add('d-none');
                withdrawForm.classList.add('d-none');
                break;
        }
        
    }

    static clearFields() {
        document.querySelector('#username').value = '',
        document.querySelector('#password').value = '',
        document.querySelector('#firstName').value = '',
        document.querySelector('#lastName').value = '',
        document.querySelector('[value="sa"]').checked = true;

        document.querySelector('#withdrawAmount').value = '';
        document.querySelector('#depositAmount').value = '';
    }
}

// Account Class: Handles Account Features
class Account {
    static generateUID() {
        return Date.now() + Math.random().toString().slice(2);
    }

    static create_user(user, balance) {
        const usr = new User(Account.generateUID(), user.username, user.password, user.firstName, user.lastName, user.accountType);
        usr.balance = balance;
        UI.addUserToList(usr);
        Store.addUser(usr);
        console.log(Store.getUsers());
    }
    
    static deposit(user, amount) {
        user.balance += parseFloat(amount);
        Store.updateUser(user);
    }
    
    static withdraw(user, amount) {
        user.balance -= parseFloat(amount);
        Store.updateUser(user);
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

    static getStoredId(uid) {
        function stored() {
            return uid;
        }
        return stored;
    }

    static getUser(uid) {
        const users = Store.getUsers();
        let retrievedUser;
        users.forEach((user, index) => {
            if(user.uid === uid) {
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
        localStorage.setItem('users', JSON.stringify(users));
    }

    static updateUser(update) {
        const users = Store.getUsers();
        users.forEach((user, index) => {
            if(user.uid === update.uid) {
                users.splice(index, 1, update);
            } else {
                //DO NOTHING
            }
        });
        localStorage.setItem('users', JSON.stringify(users));
    }

    static removeUser(uid) {
        const users = Store.getUsers();
        users.forEach((user, index) => {
            if(user.uid === uid) {
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
    let balance = 0;
    if (userFormValues.accountType === 'SA') {
        balance = 2000;
    } else if (userFormValues.accountType === 'CA') {
        balance = 10000;
    } else {
        // DO NOTHING
    }

    Account.create_user(userFormValues, balance);
    UI.clearFields();
});

document.querySelector('#withdraw-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    console.log(document.querySelector('#withdrawAmount').value)
    let amount = document.querySelector('#withdrawAmount').value;
    console.log(id());
    console.log(Store.getUser(id()));
    Account.withdraw(Store.getUser(id()), amount);
    UI.refreshList();
    UI.clearFields();
});

document.querySelector('#deposit-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    console.log(document.querySelector('#depositAmount').value)
    let amount = document.querySelector('#depositAmount').value;
    console.log(id());
    console.log(Store.getUser(id()));
    Account.deposit(Store.getUser(id()), amount);
    UI.refreshList();
    UI.clearFields();
});

// Event: User Options [Delete, Withdraw, Deposit]
document.querySelector('#user-list').addEventListener('click', (e) => {
    let uid = e.target.parentElement.parentElement.firstElementChild.textContent;
    // Remove user from UI and localStorage
    if(e.target.classList.contains('delete')) {
        Store.removeUser(uid);
    } else if(e.target.classList.contains('withdraw')) { // Display withdraw form and getId from table row
        UI.displayForm('withdraw');
        wuidText.innerText = uid;
        id = Store.getStoredId(uid);
        console.log('WITHDRAW');
    } else if(e.target.classList.contains('deposit')) { // Display deposit form and getId from table row
        UI.displayForm('deposit');
        duidText.innerText = uid;
        id = Store.getStoredId(uid);
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