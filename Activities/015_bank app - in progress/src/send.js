let uid = Store.getStoredId();
let user = Store.getUser(uid);

UI.listUserDetails(user);

document.querySelector("#send-form").addEventListener("submit", (e) => {
  // Prevent actual submit and reloading the page
  e.preventDefault();
  const formData = {
    accn: document.querySelector("#accn").value,
    amount: parseFloat(document.querySelector("#amount").value),
  };

  // console.log(formData.accn);
  // console.log(formData.amount);
  let toId = Store.getId(formData.accn);
  let toUser = Store.getUser(toId);
  Account.send(user, toUser, formData.amount);
  UI.listUserDetails(user);
  document.querySelector("#send-form").reset();
});
