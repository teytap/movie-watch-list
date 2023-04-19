const watchlistContainer = document.getElementById("watchlist-container");
//----remove button------
document.addEventListener("click", (e) => {
  if (e.target.id === "remove-btn") {
    const oldArray = JSON.parse(localStorage.getItem("watchlistMovies"));

    const newArray = oldArray.filter((movie) => {
      return movie.imdbID != e.target.dataset.imdb;
    });
    console.log(newArray);
    localStorage.setItem("watchlistMovies", JSON.stringify(newArray));

    watchlistContainer.innerHTML = getWatchlistHtml();
  }
});
//----shows movie list----
function getWatchlistHtml() {
  let watchlistHtml = "";

  const watchlist = JSON.parse(localStorage.getItem("watchlistMovies"));
  if (watchlist.length > 0) {
    for (watch of watchlist) {
      let poster = "";

      if (watch.Poster === "N/A" || watch.Poster === undefined) {
        poster = "/images/movie.png";
      } else {
        poster = watch.Poster;
      }
      watchlistHtml += ` 
      <div id="new-card" class="movie-card">
          <img src="${poster}" alt="${watch.Title}-img" class="poster" />
          <div id="movie-info">
                <div id="movie-title">
                  <span class="movie-title">${watch.Title}</span>
                  <span class="movie-rate"> ⭐️ ${watch.Ratings[0].Value.slice(
                    0,
                    3
                  )}</span>
            </div>
            <div class="movie-short-info">
                 <span class="movie-year">${watch.Year}</span>
                  <span class="movie-runtime">${watch.Runtime}</span
                  ><span class="movie-genre">${watch.Genre}</span
                  ><button class="film-btn" id="remove-btn" data-imdb = ${
                    watch.imdbID
                  }>
                    <img src="images/minus-icon.png" alt="" />
                    Remove
                  </button>
            </div>
            <div class="movie-actors">Director: ${watch.Director} </div>
            <div class="movie-actors">Actors: ${watch.Actors} </div>
                <p>${watch.Plot}</p>
            </div>
      </div>`;
    }
  } else {
    watchlistHtml = `
                <div class="no-movie-container">
          <h4>Your watchlist is looking a little empty...</h4>
          <a href="/index.html">
            <img src="images/plus-icon.png" alt="" /> Let's add some movies!
          </a>
        </div>
            `;
  }
  return watchlistHtml;
}
watchlistContainer.innerHTML = getWatchlistHtml();
