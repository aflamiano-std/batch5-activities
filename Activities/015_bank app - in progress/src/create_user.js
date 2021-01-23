// Event: When create user submit button is pressed
document.querySelector("#createUser-form").addEventListener("submit", (e) => {
  // Prevent actual submit and reloading the page
  e.preventDefault();

  const formData = {
    id: Date.now() + Math.random().toString().slice(2),
    accountNumber: "dummyNumber",
    username: document.querySelector("#username").value.toUpperCase(),
    password: document.querySelector("#password").value.toUpperCase(),
    firstName: document.querySelector("#firstName").value.toUpperCase(),
    lastName: document.querySelector("#lastName").value.toUpperCase(),
    email: document.querySelector("#email").value.toUpperCase(),
    accountType: document
      .querySelector('[name="accountType"]:checked')
      .value.toUpperCase(),
  };

  let balance = 0.0;
  let additonalDeposit = document.querySelector("#addDeposit").value || 0;
  if (
    Validation.checkCreateUserForm(formData) &&
    Validation.checkIfUserDoesNotExist(formData.username)
  ) {
    formData.accountNumber = `BNUSR${Store.getNextAccnNumber()}`;
    if (formData.accountType === "SA") {
      balance = 2000.0;
    } else if (formData.accountType === "CA") {
      balance = 10000.0;
    } else {
      //DO NOTHING
    }
    balance = parseFloat(balance) + parseFloat(additonalDeposit);
    // console.log(balance);
    Account.create_user(formData, balance.toFixed(2));
    document.querySelector("#createUser-form").reset();
  }
});
