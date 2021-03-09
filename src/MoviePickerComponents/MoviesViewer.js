import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCart from '@material-ui/icons/AddShoppingCartOutlined';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCartOutlined';
import { no_results_text } from '../MoviePickerConfigs/config_file';
import { custom_orange, custom_blue } from '../MoviePickerConfigs/config_file';

//----- fix styles -----------
const card_content_style = {
  padding: 10,
  paddingBottom: 10,
  backgroundColor: custom_blue,
};
const card_style = { width: '100%', backgroundColor: custom_blue };
const card_media_style = { width: '100%' };
const typography_style = { color: 'white', fontWeight: 700 };
const button_style = { color: custom_orange, float: 'right' };

export default class MoviesViewer extends Component {
  constructor(props) {
    super(props);
  }

  //----------------- Make a movie card for every movie ------------------------
  getMovieCard = () => {
    const { movies, selectedMovies } = this.props;

    //add flag in order to track if movie is already in cart
    const new_movies_array = movies.map((movie) => ({
      ...movie,
      in_cart: false,
    }));

    //set flag accordin to selectedMovies
    new_movies_array.forEach((movie) => {
      movie.in_cart = selectedMovies.some(
        (doc) => doc.id === movie.id
      );
    });

    return new_movies_array.map((movie) => (
      <Grid key={movie.id} container item xs={2}>
        <Card style={card_style}>
          <CardMedia>
            <img
              style={card_media_style}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            {!movie.in_cart ? (
              <IconButton
                style={button_style}
                onClick={() => {
                  this.addToCart({ movie: movie.original_title, id: movie.id });
                }}
              >
                <ShoppingCart />
              </IconButton>
            ) : (
              <IconButton
                style={button_style}
                onClick={() => {
                  this.removeFromCart(movie.original_title);
                }}
              >
                <RemoveShoppingCart />
              </IconButton>
            )}
          </CardMedia>
          <CardContent style={card_content_style}>
            <Typography
              style={typography_style}
              variant='caption'
              align='center'
            >
              {movie.original_title}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  //-- Add Movie into Shopping Cart
  addToCart = (added_movie) => {
    this.props.onAddToCart(added_movie);
  };
  //-- Remove Movie via shopCart Button
  removeFromCart = (remove_movie) => {
    this.props.onRemoveFromCart(remove_movie);
  };
  //----------------- Show to user a message in case of no results--------------------
  getNoResultsMessage() {
    return <div style={{ padding: 20, color: 'white' }}>{no_results_text}</div>;
  }

  //--------------------------------- Render -----------------------------------------
  render() {
    const { movies } = this.props;
    return (
      <Grid container direction='row' spacing={1}>
        {movies.length ? this.getMovieCard() : this.getNoResultsMessage()}
      </Grid>
    );
  }
}
