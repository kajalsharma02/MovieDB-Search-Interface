// Create the navigation bar
var navBar = document.createElement('nav');
navBar.setAttribute('id', 'navBar');
navBar.setAttribute('class', 'navBar');
navBar.style.height = "70px";
navBar.style.backgroundColor = "#2c3e50"; // Dark blue background color
navBar.style.display = "flex"; // Use flexbox for layout
navBar.style.alignItems = "center"; // Center items vertically

// Create and add the title
var title = document.createElement('h1');
title.textContent = 'MovieDB Api';
title.style.color = '#fff';
title.style.marginLeft = "20px";
navBar.appendChild(title);

// Create and add the search input
var searchInput = document.createElement('input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('id', 'search');
searchInput.placeholder = "Search..."; // Placeholder text
searchInput.style.width = "200px";
searchInput.style.height = "30px";
searchInput.style.border = "none";
searchInput.style.borderRadius = "5px";
searchInput.style.padding = "5px";
searchInput.style.marginLeft = "760px";
searchInput.style.marginRight = "10px"; // Add some space between search input and button
navBar.appendChild(searchInput);

// Create and add the search button
var searchButton = document.createElement('button');
searchButton.setAttribute('id', 'searchBTN');
searchButton.setAttribute('title', 'Search');
searchButton.textContent = 'Search';
searchButton.style.backgroundColor = '#3498db'; // Blue background color
searchButton.style.color = '#fff'; // Text color
searchButton.style.border = 'none';
searchButton.style.borderRadius = '5px';
searchButton.style.width = "100px";
searchButton.style.height = "37px";
searchButton.style.fontSize = "16px";
navBar.appendChild(searchButton);

// Append the navigation bar to the body
document.body.appendChild(navBar);

var container = document.createElement('div');
container.setAttribute('class', 'container');
container.setAttribute('id', 'movieContainer');
document.body.appendChild(container);


// Function to generate star icons based on rating
function getStars(rating) {
    const roundedRating = Math.round(rating / 2); // Ratings are out of 10, so dividing by 2 to scale to 5 stars
    let stars = '';
    for (let i = 0; i < roundedRating; i++) {
        stars += '<span style="color: gold;">★</span>'; // Add filled gold star
    }
    for (let i = roundedRating; i < 5; i++) {
        stars += '<span style="color: grey;">★</span>'; // Add empty grey star
    }
    return stars;
}


document.addEventListener('DOMContentLoaded', function () {
    const initialPageUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3b53b993105a06e7e228297260ee9015&page=1';
    
    // Fetch data from initial page API URL
    fetch(initialPageUrl)
      .then(response => response.json())
      .then(data => {
        const movies = data.results;
        const movieContainer = document.getElementById('movieContainer');
        
        // Loop through the movies and create movie cards
        movies.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          movieCard.innerHTML = `
            <div class="image-container">
              <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="movie-details">
              <h2>${movie.title}</h2>
              <p><strong>Release Date:</strong> ${movie.release_date}</p>
              <p><strong>Rating Count:</strong> ${movie.vote_count}</p>
              <p><strong>Rating Average:</strong> ${getStars(movie.vote_average)}</p>
              <p><strong>Overview:</strong> ${movie.overview}</p>
            </div>
          `;
          movieContainer.appendChild(movieCard);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
});


// Function for search
function handleSearch() {
    var searchValue = document.getElementById('search').value.trim();
    if (searchValue !== '') {
        var searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=3b53b993105a06e7e228297260ee9015&query=${searchValue}`;

        // Fetch data from search API URL
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                const movieContainer = document.getElementById('movieContainer');
                movieContainer.innerHTML = ''; // Clear previous search results

                // Loop through the movies and create movie cards
                movies.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');
                    movieCard.innerHTML = `
                        <div class="image-container">
                            <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="${movie.title}">
                        </div>
                        <div class="movie-details">
                            <h2>${movie.title}</h2>
                            <p><strong>Release Date:</strong> ${movie.release_date}</p>
                            <p><strong>Rating Count:</strong> ${movie.vote_count}</p>
                            <p><strong>Rating Average:</strong> ${getStars(movie.vote_average)}</p>
                            <p><strong>Overview:</strong> ${movie.overview}</p>
                        </div>
                    `;
                    movieContainer.appendChild(movieCard);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}


  // Calling function on search button click
  document.getElementById('searchBTN').addEventListener('click', handleSearch);
