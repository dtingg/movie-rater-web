import React, { Component} from 'react';
import './App.css';
import MovieList from "./components/movie-list"
import MovieDetails from "./components/movie-details"
import MovieForm from "./components/movie-form"
import { withCookies } from "react-cookie";

var FontAwesome = require("react-fontawesome")


class App extends Component {
  // movies = ["titanic", "avatar"];
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get("mr-token")
  }

  componentDidMount(){
    if(this.state.token){
    } else {
      window.location.href = "/";
    }
    //fetch data
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET", 
      headers: {
        "Authorization":`Token ${this.state.token}`
      }
    }).then(response => response.json()).then(response => this.setState({movies: response})).catch(error => console.log(error))
  }

  loadMovie = movie => {
    this.setState({selectedMovie: movie, editedMovie: null});
  }

  movieDeleted = selectedMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selectedMovie.id);
    this.setState({movies: movies, selectedMovie: null})
  }

  editClicked = selectedMovie => {
    this.setState({editedMovie: selectedMovie});

  }
  newMovie = () => {
    this.setState({editedMovie: {title: "", description: ""}});
  }

  cancelForm = () => {
    this.setState({editedMovie: null});

  }

  addMovie = movie => {
    this.setState({movies: [...this.state.movies, movie]});

  }
  render() {
    return (
      <div className="App">
          <h1>
          <FontAwesome name="film"/>
          <span>Movie Rater</span></h1>
          <div className="layout">
            <MovieList movies={this.state.movies} movieClicked={this.loadMovie} token={this.state.token} movieDeleted={this.movieDeleted} editClicked={this.editClicked} newMovie={this.newMovie}/>
            <div>
              {!this.state.editedMovie ? 
              <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} token={this.state.token}/> 
              : <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm}
              newMovie={this.addMovie} editedMovie={this.loadMovie} token={this.state.token}/> }
              
            </div>
          </div>
      </div>
    )
  }
}
export default withCookies(App);
