document.getElementById("register").style.display="none";

function checkEmail(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) return true;
  else return false;
}

function showDetails(user) {
  // console.log(user);
  document.getElementById("users").style.display = "none";
  document.getElementById("user-details").style.display = "flex";
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  document.getElementById("go-back").style.display =
    loggedInUser.department === "sales" ? "none" : "inline";

  document.getElementById(
    "logged-in-as-2"
  ).innerHTML = `Logged in as: ${loggedInUser.username} (${loggedInUser.email})`;

  document.getElementById("user-details-email").innerHTML = user.email;
  document.getElementById("user-details-username").innerHTML = user.username;
  document.getElementById("user-details-firstname").innerHTML = user.firstname;
  document.getElementById("user-details-lastname").innerHTML = user.lastname;
  document.getElementById("user-details-gender").innerHTML = user.gender;
  document.getElementById("user-details-department").innerHTML =
    user.department;
}

function showToAdmins(userlist, users) {
  let i = 1;
  users.forEach((user) => {
    const userElement = document.createElement("tr");
    userElement.innerHTML = `
              <td class="tg-0lax">${i}</td>
              <td class="tg-0lax">${user.email}</td>
              <td class="tg-0lax">${user.username}</td>
              <td class="tg-0lax">${user.firstname}</td>
              <td class="tg-0lax">${user.lastname}</td>
              <td class="tg-0lax">${user.gender}</td>
              <td class="tg-0lax">${user.department}</td>
    `;
    userElement.setAttribute(
      "onclick",
      `showDetails((${JSON.stringify(user)}))`
    );
    userlist.appendChild(userElement);
    i++;
  });
}

function showToOperations(userlist, users, currentUser) {
  let i = 1;
  users.forEach((user) => {
    if (user.department === "admin") return;
    else if (
      user.email !== currentUser.email &&
      user.department === "operations"
    )
      return;
    const userElement = document.createElement("tr");
    userElement.innerHTML = `
              <td class="tg-0lax">${i}</td>
              <td class="tg-0lax">${user.email}</td>
              <td class="tg-0lax">${user.username}</td>
              <td class="tg-0lax">${user.firstname}</td>
              <td class="tg-0lax">${user.lastname}</td>
              <td class="tg-0lax">${user.gender}</td>
              <td class="tg-0lax">${user.department}</td>
    `;
    userElement.setAttribute(
      "onclick",
      `showDetails((${JSON.stringify(user)}))`
    );
    userlist.appendChild(userElement);
    i++;
  });
}

function showToSales(currentUser) {
  showDetails(currentUser);
  document.getElementById("user-details-heading").innerHTML = "Your details";
}

function goBack() {
  document.getElementById("users").style.display = "block";
  document.getElementById("user-details").style.display = "none";
}

function showUsers(currentUser, users) {
  document.getElementById("login").style.display = "none";
  document.getElementById("users").style.display = "block";
  document.getElementById(
    "logged-in-as-1"
  ).innerHTML = `Logged in as: ${currentUser.username} (${currentUser.email})`;

  // console.log(currentUser, users);
  const userlist = document.getElementById("users-list");
  if (currentUser.department === "admin") {
    showToAdmins(userlist, users);
  } else if (currentUser.department === "operations") {
    showToOperations(userlist, users, currentUser);
  } else {
    showToSales(currentUser);
  }
}

function register(e) {
  e.preventDefault();
  let email = document.getElementById("reg-email");
  let username = document.getElementById("reg-username");
  let firstname = document.getElementById("reg-firstname");
  let lastname = document.getElementById("reg-lastname");
  let gender = document.getElementById("reg-gender");
  let department = document.getElementById("reg-dept");
  let pass1 = document.getElementById("pass1");
  let pass2 = document.getElementById("pass2");

  let regForm = document.getElementById("register-check");
  if (!regForm.checkValidity()) {
    regForm.reportValidity();
    return;
  }

  if (pass1.value !== pass2.value) {
    alert("Passwords doesn't match");
    pass1.value = "";
    pass2.value = "";
    pass1.focus();
    return;
  }
  if (!checkEmail(email.value)) {
    alert("Please enter a valid email");
    email.value = "";
    return;
  }

  localStorage.setItem(
    "users",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("users") || "[]"),
      {
        email: email.value,
        username: username.value,
        firstname: firstname.value,
        lastname: lastname.value,
        gender: gender.value,
        department: department.value,
        password: pass1.value,
      },
    ])
  );

  console.log(
    email.value,
    username.value,
    firstname.value,
    lastname.value,
    gender.value,
    department.value,
    pass1.value,
    pass2.value
  );

  alert("You are registered successfully");
  email.value = "";
  username.value = "";
  firstname.value = "";
  lastname.value = "";
  gender.value = "";
  pass1.value = "";
  pass2.value = "";

  showLogin();
}

function login(e) {
  e.preventDefault();
  let email = document.getElementById("login-email");
  let pass = document.getElementById("password");

  let logForm = document.getElementById("login-check");
  if (!logForm.checkValidity()) {
    logForm.reportValidity();
    return;
  }

  let currentUser;
  let usernameMatched = false;
  let users = Array.from(JSON.parse(localStorage.getItem("users")) || []);
  // console.log("users :>> ", users);

  users.forEach((user) => {
    if (user.email === email.value || user.username === email.value) {
      usernameMatched = true;
      if (user.password === pass.value) {
        currentUser = user;
        alert(`You are logged in as ${email.value}`);
      }
    }
  });

  if (!usernameMatched) {
    alert(`No user registered as ${email.value}, please register.`);
    showRegister();
    return;
  }

  if (currentUser === undefined) {
    if (usernameMatched) {
      alert("Password doesn't match the username!");
    } else {
      alert("Wrong username or password!");
    }
    return;
  }

  email.value = "";
  pass.value = "";

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({
      email: currentUser.email,
      username: currentUser.username,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      gender: currentUser.gender,
      department: currentUser.department,
      // password: pass1.value,
    })
  );

  showUsers(currentUser, users);
}
