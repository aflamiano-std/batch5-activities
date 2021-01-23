let uid = Store.getStoredId();
let user = Store.getUser(uid);

if (user != null) {
  UI.listUserDetails(user);
} else {
  alert("Session has expired");
  location.href = "./list_users.html";
}

document.querySelector("#deposit-form").addEventListener("submit", (e) => {
  // Prevent actual submit and reloading the page
  e.preventDefault();
  const formData = {
    amount: parseFloat(document.querySelector("#amount").value),
  };

  // console.log(formData.amount);
  Account.deposit(user, formData.amount);
  UI.listUserDetails(user);
  document.querySelector("#deposit-form").reset();
});

window.onunload = function () {
  console.log("DELETING GUID");
  localStorage.setItem("GUID", null);
  return "";
};
