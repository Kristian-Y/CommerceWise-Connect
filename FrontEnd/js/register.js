$(document).ready(function() {
    // Register
    $(document).on('click', '#register-btn', function(e) {
        e.preventDefault();
        $("#register-form").show()
        $("#register-form").animate({ top: '25%' }, 500);
        $("main").animate({ opacity: '0.5' }, 500)

        $(document).on('click', "#register-btn-form", function(e) {
            let firstName = document.getElementById('firstName').value.trim()
            let lastName = document.getElementById('lastName').value.trim()
            let email = document.getElementById('email').value.trim()
            let password = document.getElementById('password').value.trim()
            let username = email.split('@')[0]
            let data = {
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'password': password,
                'username': username
            }
            RegisterUser(data)
        })


        document.onkeyup = function(data) {
            if (data.which == 27) {
                $("#register-form").animate({ top: '-350px' }, 500);
                $("main").animate({ opacity: '1' }, 500)
                setTimeout(500, () => {
                    $("#register-form").hide()
                })
            }
        };
    });

    $(document).on('click', "#change", function(e) {
        e.preventDefault()
        $("#register-form").animate({ top: '100%' }, 500);
        let cregister = document.getElementById('c-register')
        cregister.style.display = ''

        let lregister = document.getElementById('l-register')
        lregister.style.display = 'none'
        $("#register-form").animate({ top: '25%' }, 500);

        $(document).on('click', '#register-btn-form-c', function(e) {
            e.preventDefault()
            let companyName = document.getElementById('companyName').value.trim()
            let email = document.getElementById('email-c').value.trim()
            let password = document.getElementById('password-c').value.trim()
            let username = email.split('@')[0]
            let data = {
                'company_name': companyName,
                'email': email,
                'password': password,
                'username': username,
                'description': 'test'
            }
            RegisterUser(data)
        })


        document.onkeyup = function(data) {
            if (data.which == 27) {
                $("#register-form").animate({ top: '-350px' }, 500);
                $("main").animate({ opacity: '1' }, 500)
                setTimeout(500, () => {
                    $("#register-form").hide()
                })
            }
        };
    })

    $(document).on('click', "#change-cli", function(e) {
        e.preventDefault
        $("#register-form").animate({ top: '100%' }, 500);
        let cregister = document.getElementById('l-register')
        cregister.style.display = ''

        let lregister = document.getElementById('c-register')
        lregister.style.display = 'none'
        $("#register-form").animate({ top: '25%' }, 500);
        document.onkeyup = function(data) {
            if (data.which == 27) {
                $("#register-form").animate({ top: '-350px' }, 500);
                $("main").animate({ opacity: '1' }, 500)
                setTimeout(500, () => {
                    $("#register-form").hide()
                })
            }
        };
    })
});

async function RegisterUser(data) {
    console.log(data['company_name'])
    if (data['company_name'] === undefined) {
        await fetch('http://127.0.0.1:8000/usermanagment/register-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': data['username'],
                    'first_name': data['first_name'],
                    'last_name': data['last_name'],
                    'email': data['email'],
                    'password': data['password']
                }),
            })
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    alert('Registration successful');
                } else {
                    alert('Registration failed');
                }
            });
    } else {
        await fetch('http://127.0.0.1:8000/usermanagment/register-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': data['username'],
                    'company_name': data['company_name'],
                    'description': data['description'],
                    'email': data['email'],
                    'password': data['password']
                }),
            })
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    alert('Registration successful');
                } else {
                    alert('Registration failed');
                }
            });
    }

}