$(document).ready(function() {
    $(document).on('click', '#create-product-btn', function(e) {
        e.preventDefault()

        $("#product-form").animate({ top: '50%' }, 500);
    })

    $(document).on('click', "#form-create", function(e) {
        e.preventDefault()
        console.log('tt')
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