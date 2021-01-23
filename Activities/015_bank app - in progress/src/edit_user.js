let uid = Store.getStoredId();
let user = Store.getUser(uid);

if (user != null) {
  UI.listUserDetails(user);
  UI.defaultUserDetails(user);
} else {
  alert("Session has expired");
  location.href = "./list_users.html";
}

document.querySelector("#editUser-form").addEventListener("submit", (e) => {
  // Prevent actual submit and reloading the page
  e.preventDefault();
  const formData = {
    firstName: document.querySelector("#firstName").value.toUpperCase(),
    lastName: document.querySelector("#lastName").value.toUpperCase(),
    email: document.querySelector("#email").value.toUpperCase(),
  };

  if (Validation.checkEditUserForm(formData)) {
    Account.edit_user(uid, formData);
    UI.listUserDetails(user);
    alert("User details have been updated!");
    location.href = "./list_users.html";
  }
});

window.onunload = function () {
  console.log("DELETING GUID");
  localStorage.setItem("GUID", null);
  return "";
};
