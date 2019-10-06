const template = Handlebars.compile($("#movie-card-template").html());

class GetMovies {
  constructor() {
    this._fetchData = this._fetchData.bind(this);
    this.movies = $("button").on("click", this._fetchData);
  }

  _fetchData() {
    $(".row").html("");
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=3d7fd0461ae8d0f2e808c37fb41950d7")
    .then(response => response.json())
    .then(data => this._showMovies(data.results))
    .catch(err => {
      console.log(err);
    });
  }

  _showMovies(movies) {
    for(let i = 0; i < movies.length; i++) {
      $(".row").append(template(movies[i])) 
    }
  }

  _printMovie(movie) {}
}