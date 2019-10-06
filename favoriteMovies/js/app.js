const template = Handlebars.compile($("#movie-card-template").html());

class GetMovies {
  constructor() {
    this.showMovies();

    $(".row").on("click", "#btn-favorite", this.favoriteClickHandler.bind(this));
    $(".row").on("click", "#trailer", this.trailerClickHandler.bind(this));
  }

  _fetchMovie(id) {
    this._fetchData("https://api.themoviedb.org/3/movie/" + id + "?api_key=3d7fd0461ae8d0f2e808c37fb41950d7", "movie");
  }

  _fetchPopularMovies() {
    this._fetchData("https://api.themoviedb.org/3/movie/popular?api_key=3d7fd0461ae8d0f2e808c37fb41950d7", "popular");
  }

  _fetchVideo(id) {
    this._fetchData("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=3d7fd0461ae8d0f2e808c37fb41950d7", "trailer");
  }

  _fetchData(url, type) {
    fetch(url)
      .then(response => response.json())
      .then(data => this._responseHandler(data, type))
      .catch(err => {
        console.log(err);
      });
  }

  showMovies() {
    this._showPopular();
  }

  _showPopular() {
    this._fetchPopularMovies();
  }

  _embedTrailer(id) {
    // let trailerId = id[0].key;
    let trailerId = id.results[0].key;
    let url = "https://www.youtube.com/embed/" + trailerId;
    $(".modal iframe").attr("src", url);
  }

  _printMovie(movie) {
    $("#popular .row").append(template(movie));
    this._printFavoriteMovie(movie)
  }

  _printFavoriteMovie(movie) {
    if (this._checkCurrentFavorite(movie.id)) {
      $("#favorites .row").append(template(movie));
      $(".row").find("#" + movie.id).addClass("favorite-movie")
    }
  }

  _responseHandler(response, type) {
    if (type === "movie") { this._printMovie(response) }

    if (type === "popular") { this._moviesArrayHandler(response) }

    if (type === "trailer") { this._embedTrailer(response) }
  }

  _moviesArrayHandler(movies) {
    movies.results.forEach(movie => {
      this._fetchMovie(movie.id);
    });
  }

  trailerClickHandler(e) {
    const id = $(e.currentTarget).parents(".movie").attr("id");
    this._fetchVideo(id);
  }


  favoriteClickHandler(e) {
    const id = $(e.currentTarget).parents(".movie").attr("id");
    let favorites = this._getFavorites();

    if (this._checkCurrentFavorite(id)) {
      $("#favorites #" + id).remove();
      $("#" + id).removeClass("favorite-movie");
      favorites = favorites.filter(f => f !== id)

    } else {
      favorites.push(id)
      $(e.currentTarget).parents(".movie").addClass("favorite-movie").clone().appendTo("#favorites .row");
    }

    localStorage.setItem("favorites", favorites.join(","));
  }

  _getFavorites() {
    let favoriteMovies = localStorage.getItem("favorites") || "";
    return favoriteMovies.split(",")
  }

  _checkCurrentFavorite(id) {
    let favoriteMovies = this._getFavorites()
    return favoriteMovies.includes(id.toString());
  }
}

Handlebars.registerHelper('trimString', function (passedString) {
  var theString = passedString.substring(0, 100);
  return new Handlebars.SafeString(theString + "...")
});

