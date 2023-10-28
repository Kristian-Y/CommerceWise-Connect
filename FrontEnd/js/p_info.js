$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");
    const token = localStorage.getItem('authToken');
    const data = JSON.parse(decodeURIComponent(encodedData));
    const prodctId = data.id
    console.log(data)
    const ownerID = data.ownerID
    const company_name = data.company_name

    let backBtn = document.getElementById('back-btn')
    backBtn.addEventListener('click', () => {
        goBack(ownerID, token)
    })

    loadProductInfo(prodctId, ownerID, token, company_name)
})

async function loadProductInfo(id, ownerID, token, company_name) {
    await fetch(`http://127.0.0.1:8000/products/product/by_id/${id}/`, {
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
        console.log(data)
        let description = document.getElementById('info')
        description.textContent = data.description
        let price = document.getElementById('price')
        price.textContent = `Price: ${data.price} lv`
        let name = document.getElementById('name')
        name.textContent = data.name
        let type = document.getElementById('type')
        type.textContent = `Type: ${data.type}`
        let cName = document.getElementById('c-name')
        cName.textContent = `Company name: ${company_name}`
    })
}


async function goBack(ownerID, token) {
    console.log('Test')
    await fetch(`http://127.0.0.1:8000/usermanagment/get_company_by_id/${ownerID}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        }
    }).then(response_data => {
        console.log(response_data)
        const data = {
            compan_username: `${response_data.username}`,
            company_email: `${response_data.email}`,
            company_name: `${response_data.company_name}`,
            id: `${response_data.id}`,
            company_description: `${response_data.description}`
        };

        const encodedData = encodeURIComponent(JSON.stringify(data));
        window.location.href = `businessInfo.html?data=${encodedData}`;
    })
}