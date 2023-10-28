$(document).ready(function() {
    loadCompanies()
    isLoggedIn()
})

async function isLoggedIn() {
    fetch('http://127.0.0.1:8000/usermanagment/is_user_logged_in/', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
        .then(data => {
            if (data.is_authenticated) {
                console.log('User is logged in as ' + data.username);
                // You can perform actions for authenticated users here
            } else {
                console.log('User is not logged in');
                // You can handle actions for unauthenticated users here
            }
        })
}


async function loadCompanies() {
    let listCompanies = document.getElementById('cards-container')
    listCompanies.innerHTML = ''

    fetch('http://127.0.0.1:8000/usermanagment/getCompanies/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
    }).then(data => {
        if (data !== undefined) {
            data.forEach(company => {
                listCompanies.innerHTML += `
                    
                        <div class="myCard" id="${company.username}">
                            <div class="innerCard">
                                <div class="frontSide">
                                    <p class="title">${company.companyName}</p>
                                    <i style="font-size: 3rem;" class="ico fa fa-briefcase"></i>
                                    <p>${company.email}</p>
                                </div>
                            </div>
                        </div>
                `
            });
        }
    })
}