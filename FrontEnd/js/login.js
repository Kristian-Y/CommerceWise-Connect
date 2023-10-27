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
        Login(email, password)
    })

})

async function test() {
    await fetch('http://127.0.0.1:8000/usermanagment/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: "test" }),
    })
}

async function Login(email, password) {
    await fetch('http://127.0.0.1:8000/usermanagment/test/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            console.log(response)
            if (response.status === 201) {
                alert('Login successful');
            } else {
                alert('Login failed');
            }
        });
}