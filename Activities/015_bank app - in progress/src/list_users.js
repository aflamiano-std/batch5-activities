// Event: Display Users
document.addEventListener("DOMContentLoaded", UI.list_users);

// Event: User Options [Delete, Withdraw, Deposit]
document.querySelector("#user-list").addEventListener("click", (e) => {
  let accn = e.target.parentElement.parentElement.firstElementChild.textContent;
  let uid = Store.getId(accn);
  Store.setStoreId(uid);
  // Remove user from UI and localStorage
  if (e.target.classList.contains("delete")) {
    // console.log("DELETE");
    if (confirm("Delete action cannot be reversed, press OK to continue")) {
      UI.deleteUser(e.target);
      Store.removeUser(uid);
    } else {
      // DO NOTHING
    }
  } else if (e.target.classList.contains("edit")) {
    console.log("EDIT USER");
    location.href = "../pages/user_edit.html";
  } else if (e.target.classList.contains("withdraw")) {
    console.log("WITHDRAW");
    location.href = "../pages/user_withdraw.html";
  } else if (e.target.classList.contains("deposit")) {
    console.log("DEPOSIT");
    location.href = "../pages/user_deposit.html";
  } else if (e.target.classList.contains("send")) {
    console.log("SEND");
    location.href = "../pages/user_send.html";
  } else {
    //DO NOTHING
  }
});
