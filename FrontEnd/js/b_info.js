$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");
    const token = localStorage.getItem('authToken');
    const data = JSON.parse(decodeURIComponent(encodedData));
    const ownerID = data.id;

    console.log(data.id)
    loadProducts(ownerID, token, data.company_name)

    let name = document.getElementById('c-name')
    name.textContent = data.company_name
    let info = document.getElementById('info')
    info.textContent = data.company_description
})

async function loadProducts(ownerID, token, name) {
    await fetch(`http://127.0.0.1:8000/products/products/by_owner/${ownerID}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        }
    }).then(data => {
        let list = document.getElementById('cards-container')
        console.log(data)
        list.innerHTML = ''
        data.forEach(product => {
            list.innerHTML += `
                <div class="myCard" id="${product.id}">
                    <div class="innerCard">
                        <div class="frontSide">
                            <h1 class="services-title">${product.name}</h1>
                            <p class="price" id="">
                                Price: ${product.price}
                            </p>
                            <p class="price" id="">
                                type: ${product.type}
                            </p>
                        </div>
                    </div>
                </div>
            `
            document.getElementById(`${product.id}`).addEventListener('click', () => {

                const data = {
                    id: `${product.id}`,
                    ownerID: ownerID,
                    company_name: name
                };
                const encodedData = encodeURIComponent(JSON.stringify(data));
                window.location.href = `productinfo.html?data=${encodedData}`;
            })

        });

    })
}