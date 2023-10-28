$(document).ready(function() {
    isLoggedIn()
    $(document).on('click', '#create-product-btn', function(e) {
        e.preventDefault()

        $("#product-form").animate({ top: '50%' }, 500);
        $("main").animate({ opacity: '0.5' }, 500)
        document.onkeyup = function(data) {
            if (data.which == 27) {
                $("#product-form").animate({ top: '-350px' }, 500);
                $("main").animate({ opacity: '1' }, 500)
            }
        };
    })

    $(document).on('click', "#form-create", function(e) {
        e.preventDefault()
        let name = document.getElementById('name').value.trim()
        let description = document.getElementById('description').value.trim()
        let price = document.getElementById('price').value.trim()
        let type = document.getElementById('type').value.trim()
        let data = {
            'name': name,
            'description': description,
            'price': price,
            'type': type,
        }

        createProduct(data)
    })



})

async function isLoggedIn() {

    const token = localStorage.getItem('authToken');
    const headers = {
        'Authorization': `Token ${token}`
    };
    fetch('http://127.0.0.1:8000/usermanagment/is_user_logged_in/', {
            method: 'GET',
            headers: headers,
        }).then(response => response.json())
        .then(data => {
            if (data.is_authenticated) {
                console.log('User is logged in as ' + data.user);
                let navBTns = document.getElementById('nav-btns')
                navBTns.innerHTML = `
                    <h4>${data.user}</h4>
                    <a href="" id="logut-btn">Logout</a>    
                `
                let welcome = document.getElementById('welcome')
                console.log(data)
                welcome.innerHTML = `<strong>Welcome ${data.company_name}<strong>`
            } else {
                console.log('User is not logged in');
                window.location.href = '/FrontEnd/index.html';
            }
        })
}


async function createProduct(data) {
    let token = localStorage.getItem('authToken')
    await fetch('http://127.0.0.1:8000/products/create-product/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                'name': data['name'],
                'description': data['description'],
                'price': data['price'],
                'type': data['type'],
            }),
        })
        .then(response => {
            console.log(response)
            if (response.status === 201) {
                alert('Product created');
            } else {
                alert('Registration failed');
            }
        });
}