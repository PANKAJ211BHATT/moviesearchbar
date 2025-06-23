// For index.html (Search functionality)
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const movieResult = document.getElementById("movieResult");

  if (searchBtn && searchInput && movieResult) {
    searchBtn.addEventListener("click", async () => {
      let btnvalue = searchInput.value.trim();
      if (!btnvalue) {
        movieResult.innerHTML = "Please enter a movie title.";
        return;
      }

      const YOUR_API_KEY = "${YOUR_API_KEY}"; 
      const URL = `http://www.omdbapi.com/?apikey=${YOUR_API_KEY}&t=${btnvalue}`;

      try {
        let response = await fetch(URL);
        let data = await response.json();
        if (data.Response === "True") {
          localStorage.setItem("movieData", JSON.stringify(data));
          window.location.href = "movie.html"; // Redirect only on success
        } else {
          movieResult.innerHTML = "Movie not found.";
        }
      } catch (error) {
        movieResult.innerHTML = "Error fetching data.";
        console.log(error);
      }
    });
  }
});

// For movie.html (Display functionality)
document.addEventListener("DOMContentLoaded", () => {
  const movieDetails = document.getElementById("movieDetails");
  const title1 = document.getElementById("title1");

  if (movieDetails && title1) {
    const movieData = JSON.parse(localStorage.getItem("movieData"));
    if (movieData) {
      movieDetails.innerHTML = `
        <h2>${movieData.Title} (${movieData.Year})</h2>
        <img src="${movieData.Poster}" alt="${movieData.Title} Poster" style="max-width: 200px;">
        <p><strong>Director:</strong> ${movieData.Director}</p>
        <p><strong>Plot:</strong> ${movieData.Plot}</p>
      `;
    } else {
      movieDetails.innerHTML = "No movie data available.";
    }
  }
});
