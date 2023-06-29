document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();

    const username = document.getElementById('loginInputUsername').value;
    const password = document.getElementById('loginInputPassword').value;

    if (username == 'admin' && password == 'admin'){
        window.open('./register-admin-pages/mainMenu.html');
    }else{
        alert('Login or password might be wrong.')
    };
})
