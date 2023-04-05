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
  let email = document.getElementById("reg");
  let pass1 = document.getElementById("pass1");
  let pass2 = document.getElementById("pass2");
  let department = document.getElementById("reg-dept");

  // function selectDept(dept){
  //     department = dept;
  // }

  console.log(email.value, pass1.value, pass2.value, department.value);
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
        password: pass1.value,
        department: department.value,
      },
    ])
  );

  alert("You are registered successfully");
  pass1.value = "";
  pass2.value = "";
  email.value = "";
}

function login(e) {
//   e.preventDefault();
  let users = Array.from(JSON.parse(localStorage.getItem("users")));
  console.log('users :>> ', JSON.stringify(users));
  let email = document.getElementById("login");
  let pass = document.getElementById("pass");
  let department = document.getElementById("login-dept");
}
