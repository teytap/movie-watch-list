const moviesContainer = document.getElementById("movies-container");
const newCard = document.getElementById("new-card");
const movieInput = document.getElementById("movie-input");
const searchBtn = document.getElementById("button-addon2");
const addBtn = document.getElementById("add-btn");

let title = "";
let searchedMoviesArray = [];

document.addEventListener("click", (e) => {
  //-------add button---------
  if (e.target.id === `add-btn`) {
    let localArray = [];
    const addButtons = document.getElementsByClassName("film-btn");
    //toggle buttons
    const targetBtn = Object.values(addButtons).filter((btn) => {
      return btn.dataset.imdb === e.target.dataset.imdb;
    });
    targetBtn[1].classList.toggle("hidden");
    targetBtn[0].classList.toggle("hidden");
    //add to local storage
    const targetMovies = searchedMoviesArray.filter((movie) => {
      return movie.imdbID === e.target.dataset.imdb;
    });
    if (localStorage.getItem("watchlistMovies")) {
      localArray = JSON.parse(localStorage.getItem("watchlistMovies"));
    }
    if (localArray.indexOf(targetMovies[0]) == -1 || localArray.length === 0) {
      localArray.push(targetMovies[0]);
    }
    localStorage.setItem("watchlistMovies", JSON.stringify(localArray));
  }

  //------remove button------
  if (e.target.id === "remove-btn") {
    const addButtons = document.getElementsByClassName("film-btn");
    const targetBtn = Object.values(addButtons).filter((btn) => {
      return btn.dataset.imdb === e.target.dataset.imdb;
    });
    const oldArray = JSON.parse(localStorage.getItem("watchlistMovies"));
    targetBtn[0].classList.toggle("hidden");
    targetBtn[1].classList.toggle("hidden");
    // remove movie from local storage
    const newArray = oldArray.filter((movie) => {
      return movie.imdbID !== e.target.dataset.imdb;
    });
    localStorage.setItem("watchlistMovies", JSON.stringify(newArray));
  }
});

movieInput.addEventListener("change", (e) => {
  e.preventDefault();
  title = movieInput.value.toLowerCase().split(" ").join("+");
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    renderMovies();
  } catch (e) {
    moviesContainer.innerHTML = `<div class='no-results'><p>Unable to find what you’re looking for. Please try another search.</p></div>`;
  }
});

function getMovieCardHtml(data) {
  let poster = "";

  if (data.Poster === "N/A" || data.Poster === undefined) {
    poster = "/images/movie.png";
  } else {
    poster = data.Poster;
  }

  moviesContainer.innerHTML += ` 
  <div id="new-card" class="movie-card"><img src="${poster}" alt="${
    data.Title
  }-img" class="poster" />
        <div id="movie-info">
              <div id="movie-title">
                <span class="movie-title">${data.Title}</span>
                <span class="movie-rate"> ⭐️ ${data.Ratings[0].Value.slice(
                  0,
                  3
                )}</span>
              </div>
            <div class="movie-short-info">
            <span class="movie-year">${data.Year}</span>
                <span class="movie-runtime">${data.Runtime}</span>
                <span class="movie-genre">${data.Genre}</span
                ><button class="film-btn hidden" id="remove-btn" data-imdb = ${
                  data.imdbID
                }>
                  <img src="images/minus-icon.png" alt="" />
                  Remove
                </button>
                <button class="film-btn" id="add-btn" data-imdb = ${
                  data.imdbID
                }>
                  <img src="images/plus-icon.png" alt="" />
                  Watchlist
                </button>
                
            </div>
            <div class="movie-actors">Director: ${data.Director} </div>
            <div class="movie-actors">Actors: ${data.Actors} </div>
              <p>
                ${data.Plot}
              </p>
        </div>
    </div>`;
}

function renderMovies() {
  fetch(`https://www.omdbapi.com/?s=${title}&apikey=124ce01e`)
    .then((res) => res.json())
    .then((data) => {
      moviesContainer.innerHTML = "";
      if (data.Search) {
        for (data of data.Search) {
          let searchTitle = data.Title.toLowerCase().split(" ").join("+");

          fetch(`https://www.omdbapi.com/?t=${searchTitle}&apikey=124ce01e`)
            .then((res) => res.json())
            .then((data) => {
              searchedMoviesArray.push(data);
              getMovieCardHtml(data);
            });
        }
      } else {
        moviesContainer.innerHTML = `<p class="not-found">Unable to find what you’re looking for. Please try another search.</p>`;
      }
    });
}
