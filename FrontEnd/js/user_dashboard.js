$(document).ready(function() {
    console.log(localStorage.getItem('authToken'))
    $(document).on('click', '#logout-btn', function(e) {
        e.preventDefualt()
        localStorage.removeItem('authToken');
        window.location.href = '/FrontEnd/index.html';
    })
    loadCompanies()
    isLoggedIn()


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
            } else {
                console.log('User is not logged in');
                window.location.href = '/FrontEnd/index.html';
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
                                    <p class="title">${company.company_name}</p>
                                    <i style="font-size: 3rem;" class="ico fa fa-briefcase"></i>
                                    <p>${company.email}</p>
                                </div>
                            </div>
                        </div>
                `

                document.getElementById(`${company.username}`).addEventListener('click', () => {
                    const data = {
                        compan_username: `${company.username}`,
                        company_email: `${company.email}`,
                        company_name: `${company.company_name}`
                    };

                    const encodedData = encodeURIComponent(JSON.stringify(data));
                    window.location.href = `businessInfo.html?data=${encodedData}`;
                })
            });
        }
    })
}