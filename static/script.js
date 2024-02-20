document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const buttons = document.querySelectorAll('.button2');
    const deleteButtons = document.querySelectorAll('.delete-button');
    const logoutButton = document.getElementById('logout');
    const loginForm = document.getElementById('login-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegisterFormSubmit);
    } else {
        console.error('Registration form not found');
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            blockUser(button);
        });
    });

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            deleteUser(deleteButton);
        });
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    } else {
        console.error('Logout button not found');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginFormSubmit);
    } else {
        console.error('Login form not found');
    }
});

function deleteUser(button) {
    console.log("Clicked delete");
    const email = button.id;
    const formData = new FormData();
    formData.append('email', email);

    fetch('/delete_user', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert("Deleted Successfully");
            location.reload();
        } else {
            alert("Failed please try again");
        }
    });
}

function blockUser(clickedButton) {
    console.log("Clicked block");
    const button = clickedButton;
    const email = button.id;
    const formData = new FormData();
    const icon = button.querySelector('i');
    formData.append('email', email);

    const url = icon.classList.contains('bi-unlock-fill') ? '/unblock_user' : '/block_user';

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            const message = url === '/unblock_user' ? 'Unblocked successfully' : 'Blocked successfully';
            alert(message);
            icon.remove();
            button.innerHTML += `<i class="bi bi-${url === '/unblock_user' ? 'lock' : 'unlock'}-fill"></i>`;
            location.reload();
        } else {
            alert('Failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function handleLogout() {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/';
        } else {
            console.error('Logout failed');
        }
    });
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
            response.text().then(errorMessage => {
                alert('Login failed.' + JSON.parse(errorMessage).message);
            }).catch(error => {
                console.error('Error:', error);
                alert('Login failed. Please try again.');
            });
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
            response.text().then(errorMessage => {
                alert('Registration failed.' + JSON.parse(errorMessage).message);
            }).catch(error => {
                console.error('Error:', error);
                alert('Registration failed. Please try again.');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

