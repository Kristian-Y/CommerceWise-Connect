var searchInput = document.getElementById('search');

function myFunction() {
    var x = document.getElementById("mynavbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }

// Add an event listener to the search input
searchInput.addEventListener('keydown', ()=> {
        searchFunction();
    }
);

function searchFunction() {
    // Extract the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the front side titles
    var frontSideTitles = document.querySelectorAll('.frontSide .title');

    // Loop through the front side titles and show or hide the cards based on the search query
    for (var i = 0; i < frontSideTitles.length; i++) {
        var frontSideTitle = frontSideTitles[i].textContent.toLowerCase();
        var cardContainer = frontSideTitles[i].closest('.myCard');

        if (frontSideTitle.includes(searchQuery)) {
            cardContainer.style.display = 'block';  // Show the card
        } else {
            cardContainer.style.display = 'none';   // Hide the card
        }
    }
}