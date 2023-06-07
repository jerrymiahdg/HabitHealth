const changeLocation = function(newLocation) {
  window.location.href = `${window.location.href.split('/')[0]}/${newLocation}`
}
if (window.location.href.split("/").at(-1) == "create.html") {
} else if (window.location.href.split("/").at(-1) == "habits.html") {
  for(const habit of document.querySelectorAll('.habit-btn')) {
    habit.addEventListener('click', habitListener(habit))
  }
  function habitListener(habit) {
    return function() {
      if(sessionStorage.getItem('user')) {
        let sessionUser = sessionStorage.getItem('user')
        let localUser = localStorage.getItem('user-1')
        let i = 1
        while(sessionUser !== localUser) {
          i++
          localUser = localStorage.getItem(`user-${i}`)
        }
        localStorage.setItem(`user-${i}`, `${localUser} ${habit.textContent.replaceAll(' ', '-')}`)
        sessionStorage.setItem('user', localStorage.getItem(`user-${i}`))
        console.log(`1: ${sessionStorage.getItem('user')}, 2: ${sessionUser}, 3: ${localUser}`)
      } else {
        changeLocation('pages/profile.html')
      }
    }
  }
} else if (window.location.href.split("/").at(-1) == "login.html") {
  const loginUser = document.querySelector('#login-user')
  const loginPass = document.querySelector('#login-pass')
  const loginBtn = document.querySelector('#login-btn')
  if(sessionStorage.getItem('user')) {
    changeLocation('pages/logged-in.html')
  } else {
    loginBtn.addEventListener('click', function() {
      for(let i = 1; i <= localStorage.length; i++) {
        const currentUser = localStorage.getItem(`user-${i}`)
        const [username, password] = currentUser.split(' ')
        if(loginUser.value.toLowerCase() == username && loginPass.value == password) {
          loginPass.value = ''
          loginUser.value = ''
          sessionStorage.setItem('user', currentUser)
          changeLocation('pages/profile.html')
        }
      }
    })
  }
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
  if (sessionStorage.getItem("user")) {
    changeLocation('pages/logged-in.html')
  } else {
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
        changeLocation('pages/profile.html')
      }
    });
  }
} else if (window.location.href.split("/").at(-1) == "logged-in.html") {
  const logoutBtn = document.querySelector('#logout-btn')
  if(sessionStorage.getItem('user')) {
    logoutBtn.addEventListener('click', function() {
      sessionStorage.removeItem('user')
      changeLocation('index.html')
    })
  } else {
    changeLocation('index.html')
  }
}
console.log(localStorage)