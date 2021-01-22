let uid = Store.getStoredId();
let user = Store.getUser(uid);

UI.listUserDetails(user);

document.querySelector("#withdraw-form").addEventListener("submit", (e) => {
  // Prevent actual submit and reloading the page
  e.preventDefault();
  const formData = {
    amount: parseFloat(document.querySelector("#amount").value),
  };
  // console.log(formData.amount);
  if (Validation.checkSufficientFunds(user, formData.amount)) {
    Account.withdraw(user, formData.amount);
    document.querySelector("#withdraw-form").reset();
  }
  UI.listUserDetails(user);
});
