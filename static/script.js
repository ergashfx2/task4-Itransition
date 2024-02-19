
document.addEventListener('DOMContentLoaded', function() {
    var registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
      registrationForm.addEventListener('submit', handleRegisterFormSubmit);
    } else {
      console.error('Registration form not found');
    }
  var buttons = document.querySelectorAll('.button2');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        Block_user(this);
    });
});

var deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(function(delete_button) {
  delete_button.addEventListener('click', function() {
      DeleteUser(this);
  });
});

  var logoutButton = document.getElementById('logout');
  if (logoutButton) {
      logoutButton.addEventListener('click', handleLogout);
  } else {
      console.error('Logout button not found');
  }

  var loginForm = document.getElementById('login-form');
  if (loginForm) {
      loginForm.addEventListener('submit', handleLoginFormSubmit);
  } else {
      console.error('Login form not found');
  }
});


function DeleteUser(Button){
    console.log("Clicked delete")
    var button = Button;
    var email = button.id;
    var formData = new FormData();
    formData.append('email',email);
    fetch('/delete_user',{
    method : 'POST',
    body: formData


})
.then(response=>{
    if (response.ok){
        alert("Deleted Successfully")
        location.reload();
    }else{
        alert("Failed please try again")
    }
})
}


function Block_user(clickedButton) {
    console.log("clicked");
    var button = clickedButton;
    var email = button.id;
    var formData = new FormData();
    var icon = button.querySelector('i');
    formData.append('email', email);
    if (icon.classList.contains('bi-unlock-fill')) {
        fetch('/unblock_user', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Unblocked successfully');
                icon.remove();
                button.innerHTML += '<i class="bi bi-lock-fill bi-7x"></i>';
                location.reload();
            } else {
                alert('Failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}else {
    fetch('/block_user', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Blocked successfully');
                icon.remove();
                button.innerHTML += '<i class="bi bi-unlock-fill"></i>';
                location.reload();
        } else {
            alert('Failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

}


function handleLogout() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/logout');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      if (xhr.status === 200) {
          window.location.href = '/';
      } else {
          console.error('Logout failed');
      }
  };
  xhr.send();
}

function handleLoginFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(this);

  fetch('/login-user', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (response.ok) {
          alert('Login was successful!');
          window.location.href = '/';
      } else {
          alert('Login failed. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}


function handleRegisterFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/create-user', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Registration was successful!');
            window.location.href = '/';
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }