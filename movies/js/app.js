const template = Handlebars.compile($("#movie-card-template").html());

class GetMovies {
  constructor() {
    this._fetchData = this._fetchData();
    $(".row").on("click", "#btn-favorite", function(e) {
      const id = $(e.currentTarget).parents(".movie").attr("id");
      let favorite = localStorage.getItem("favorites") || "";
      localStorage.setItem("favorites", favorite + "," + id);
    });

    $(".row").on("click", "#triler", this.trillerClickHandler.bind(this));
  }
  
  _fetchData() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=3d7fd0461ae8d0f2e808c37fb41950d7")
    .then(response => response.json())
    .then(data => this._showMovies(data.results))
    .catch(err => {
      console.log(err);
    });
  }

  _fetchVideo(id) {
    fetch("https://api.themoviedb.org/3/movie/"+ id +"/videos?api_key=3d7fd0461ae8d0f2e808c37fb41950d7")
    .then(response => response.json())
    .then(data => this.showTriler(data.results)
    )
    .catch(err => {
      console.log(err);
    });
  }

  _showMovies(movies) {
    console.log(movies);
    
    for(let i = 0; i < movies.length; i++) {
      $("#popular .row").append(template(movies[i])) 
    }
  }
  trillerClickHandler(e) {
    const id = $(e.currentTarget).parents(".movie").attr("id");
      this._fetchVideo(id);
  }
  
  showTriler(id) {
    let trilerId = id[0].key;
    console.log(trilerId);
    let url = "https://www.youtube.com/embed/" + trilerId;
    $(".modal iframe").attr("src", url);
  }


 
  _printMovie(movie) {}
}