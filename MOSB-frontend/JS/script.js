document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //demo login username and password
    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
        alert('Login successful!');
        window.location.href = 'order.html'; // Redirect to home page
    } else {
        alert('Invalid username or password');
    }
});
