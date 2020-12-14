import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SavedList from './Movies/SavedList';

import { Route, Link, Switch } from 'react-router-dom'
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'
//TO ADD ROUTES, MAYBE we should import them like in GP?
const defaultMovieData =
{director: "George P. Cosmatos",
id: 5,
metascore: 89,
title: "Tombstone"}
export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([defaultMovieData]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          console.log("App.Js response",response)
          console.log("App.Js response",response.data)
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data)
          console.log(movieList)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <div>
      <SavedList list={[ /* This is stretch */]} />

      <Switch>
        <Route path='/movies/:id' >
          <Movie  />
        </Route>

        <Route path="/">
          <MovieList movies = {movieList} />
        </Route>


      </Switch>
    </div>
  );
}
