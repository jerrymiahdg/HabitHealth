let user;
if (window.location.href.split("/").at(-1) == "create.html") {
} else if (window.location.href.split("/").at(-1) == "habits.html") {
} else if (window.location.href.split("/").at(-1) == "login.html") {
} else if (window.location.href.split("/").at(-1) == "profile.html") {
  const profileHead = document.querySelector("#profile-head");
  const profile = document.querySelector("#profile");
  const noProfile = document.querySelector("#no-profile");
  const profileName = document.querySelector("#profile-name");
  if (sessionStorage.getItem("user")) {
    profile.display = "block";
    noProfile.style.display = "none";
    profileName.textContent = sessionStorage.user.split(" ")[0];
  } else {
    profileHead.textContent = "You are not logged in.";
    profile.style.display = "none";
    noProfile.style.display = "block";
  }
} else if (window.location.href.split("/").at(-1) == "signup.html") {
  const signupUser = document.querySelector("#signup-user");
  const signupPass = document.querySelector("#signup-pass");
  const signupBtn = document.querySelector("#signup-btn");
  const signup = document.querySelector("#signup");
  const noSignup = document.querySelector("#no-signup");
  const signupHead = document.querySelector("#signup-head");

  if (sessionStorage.getItem("user")) {
    signupHead.textContent = "You are logged in.";
    noSignup.style.display = "block";
    signup.style.display = "none";
  } else {
    signupHead.textContent = "Sign in";
    noSignup.style.display = "none";
    signup.style.display = "block";
    signupBtn.addEventListener("click", function () {
      if (signupUser.value.length >= 5 && signupPass.value.length >= 5) {
        localStorage.setItem(
          `user-${localStorage.length + 1}`,
          `${signupUser.value.toLowerCase()} ${signupPass.value}`
        );
        signupUser.value = "";
        signupPass.value = "";
        sessionStorage.setItem(
          "user",
          localStorage.getItem(`user-${localStorage.length}`)
        );
        location.reload();
      }
    });
  }
}
localStorage.clear();
