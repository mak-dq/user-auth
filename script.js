document.getElementById("register").style.display="none";

function checkEmail(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) return true;
  else return false;
}

function showRegister(){
    document.getElementById("login").style.display="none";
    document.getElementById("register-prompt").style.display="none";
    document.getElementById("register").style.display="block";
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
