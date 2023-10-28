$(document).ready(function() {

    $(document).on('click', '#login-btn', function(e) {
        e.preventDefault()
        $('#login-form').show()
        $("#login-form").animate({ top: '25%' }, 500);
        $("main").animate({ opacity: '0.5' }, 500)


        document.onkeyup = function(data) {
            if (data.which == 27) {
                $("#login-form").animate({ top: '-350px' }, 500);
                $("main").animate({ opacity: '1' }, 500)
                setTimeout(500, () => {
                    $("#login-form").hide()
                })
            }
        };
    })

    $(document).on('click', '#login-btn-form', function(e) {
        e.preventDefault()

        let email = document.getElementById('email-login').value.trim()
        let password = document.getElementById('password-login').value.trim()
        console.log(email)
        Login(email, password)
    })

})

async function Login(email, password) {
    await fetch('http://127.0.0.1:8000/usermanagment/user-login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (response.status === 200) {
                alert('Login successful');
                console.log(response)

                return response.json();
            } else {
                console.log(response)
                alert('Login failed');
            }
        })
        .then(data => {
            if (data != undefined) {
                console.log(data)
                if (data.user_group == 'client') {
                    window.location.href = '/FrontEnd/userMain.html';
                } else if (data.user_group == 'company') {
                    window.location.href = '/FrontEnd/businessMain.html';
                }

                localStorage.setItem('authToken', data.token);
            }


        })
}