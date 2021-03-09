import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search_value:''
    };
  }

  //------------ Get Results from search -----------------------
  getMovies = (movie_search) => {
    this.props.getDataMovies(movie_search);
  };

  //---------------- Render ------------------------------------
  render() {
    const { search_value } = this.state;
    const {searchPlaceholder} = this.props

    return (
        <Grid item xs={9} style={{ maxWidth: '70%' }}>
          <SearchBar
            placeholder={searchPlaceholder}
            value={search_value}
            onChange={(newValue) => this.setState({ search_value: newValue })}
            onRequestSearch={() => {
              this.getMovies(search_value);
            }}
            onCancelSearch={() => {
              this.getMovies();
            }}
          />
        </Grid>
    );
  }
}
