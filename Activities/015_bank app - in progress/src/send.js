let uid = Store.getStoredId();
let user = Store.getUser(uid);

if (user != null) {
  UI.listUserDetails(user);
} else {
  alert("Session has expired");
  location.href = "./list_users.html";
}

document.querySelector("#send-form").addEventListener("submit", (e) => {
  // Prevent actual submit and reloading the page
  e.preventDefault();
  const formData = {
    accn: document.querySelector("#accn").value,
    amount: parseFloat(document.querySelector("#amount").value),
  };

  console.log(formData.accn);
  console.log(formData.amount);
  if (Validation.checkIfAccountExists(user, formData.accn)) {
    let toId = Store.getId(formData.accn);
    let toUser = Store.getUser(toId);
    Account.send(user, toUser, formData.amount);
    document.querySelector("#send-form").reset();
  }
  UI.listUserDetails(user);
});

window.onunload = function () {
  console.log("DELETING GUID");
  localStorage.setItem("GUID", null);
  return "";
};
