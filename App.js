const moviesContainer = document.getElementById("movies-container");
const newCard = document.getElementById("new-card");
const movieInput = document.getElementById("movie-input");
const searchBtn = document.getElementById("button-addon2");
console.log(movieInput.value);
let title = "";

movieInput.addEventListener("change", (e) => {
  e.preventDefault();
  title = movieInput.value.toLowerCase().replace(" ", "+");
  console.log(title);
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  renderMovies();
});

function getMovieCardHtml(data) {
  let movieCardHtml = "";

  movieCardHtml = ` <img src="${data.Poster}" alt="movie-img" class="poster" />
            <div id="movie-info">
              <div id="movie-title">
                <span class="movie-title">${data.Title}</span>
                <span class="movie-rate"> ⭐️ ${data.Ratings[0].Value.slice(
                  0,
                  3
                )}</span>
              </div>
              <div>
                <span class="movie-runtime">${data.Runtime}</span
                ><span class="movie-genre">${data.Genre}</span
                >
                <button id="add-btn">
                  <img src="images/plus-icon.png" alt="" />
                  Watchlist
                </button></div>
              <p>
                ${data.Plot}
              </p>`;
  newCard.innerHTML = movieCardHtml;
}
function renderMovies() {
  //fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=124ce01e`)
  fetch(`http://www.omdbapi.com/?t=${title}&apikey=124ce01e`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      getMovieCardHtml(data);
    });
}
