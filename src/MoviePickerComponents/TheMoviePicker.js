import React, { Fragment, Component } from 'react';
import { Grid, LinearProgress, Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Title from './Title';
import Search from './Search';
import MoviesViewer from './MoviesViewer';
import ShoppingCart from './ShoppingCart';
import { urlQuery } from '../MoviePickerConfigs/config_file';
import { custom_orange } from '../MoviePickerConfigs/config_file';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import './style.css';

const select_button_style = { minWidth: 300, backgroundColor: custom_orange };

export default class TheMoviePicker extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.getDataMovies = this.getDataMovies.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.purchaseMovies = this.purchaseMovies.bind(this);

    this.search_placeholder_text = 'Type your movie and press enter...';
    this.sort_options = [
      { label: 'Highest average vote', value: 'desc' },
      { label: 'Lowest average vote', value: 'asc' },
    ];
    this.state = {
      movies: [],
      isLoading: true,
      order_by: '',
      sortDirection: 0,
      selected_movies: [],
      movies_purchased: 0,
      response: null,
      response_type: 'success',
      open_dialog: false,
    };
  }

  //------- Get default Movies or the result of the searched value -------------------------
  getDataMovies(query) {
    const url = urlQuery(query);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movies: data.results,
        });
      });
  }

  //----------- Buy movies added to cart| Make the post api Call --------------
  purchaseMovies = async () => {
    const { selected_movies } = this.state;
    const movies = [];
    selected_movies.forEach((datum) => {
      movies.push(datum.id);
    });
    let data = { data: { movies } };
    let options = {
      headers: {
        'X-Mocklets-PublicKey': 'txmovies',
        'X-Mocklets-Checksum': '830c7cd4a70be6540a4898441ca02951',
      },
    };

    try {
      const response = await axios.post(
        'https://api.mocklets.com/mock68075/',
        data,
        options
      );
      this.setState({
        response: response.data.success,
        response_type: 'success',
        open_dialog: true,
      });
    } catch (error) {
      this.setState({
        response: false,
        response_type: 'error',
        open_dialog: true,
      });
    }
  };

  //------------- Sort Data according to highest/lowest vote_average key --------
  getSortingButton = () => {
    const { order_by } = this.state;
    return (
      <Grid item xs={3} style={{ maxWidth: '30%' }}>
        <FormControl>
          <Select
            value={order_by}
            style={select_button_style}
            onChange={this.handleChangeSelect}
            displayEmpty
            variant='outlined'
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value='' disabled>
              Order Movies By
            </MenuItem>
            {this.sort_options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  //Get Ordering status from select button and order data
  getOrdering = (order_status) => {
    const { movies } = this.state;
    const filter_value = 'vote_average';
    if (order_status === 'asc') {
      return movies.sort((a, b) => a[filter_value] - b[filter_value]);
    } else {
      return movies.sort((a, b) => b[filter_value] - a[filter_value]);
    }
  };

  // Select asc or desc movies order
  handleChangeSelect = (event) => {
    const order_by = event.target.value;
    const movies = this.getOrdering(order_by);
    this.setState({
      movies,
      order_by,
    });
  };

  //---------------- Update Items in Shopping Cart -------------------------
  addToCart = (movie_add) => {
    const { selected_movies } = this.state;
    const new_selected_movies = [...selected_movies, movie_add];
    const movies_purchased = new_selected_movies.length;
    this.setState({ selected_movies: new_selected_movies, movies_purchased });
  };

  removeFromCart = (movie_remove) => {
    const { selected_movies } = this.state;
    if (selected_movies.some((elem) => elem.id === movie_remove)) {
      let new_selected_movies = selected_movies.filter(
        (item) => item.id !== movie_remove
      );
      let movies_purchased = new_selected_movies.length;
      this.setState({ selected_movies: new_selected_movies, movies_purchased });
    }
  };

  // If the response is successfull then clear cart, and close dialog,
  // else just close dialog in order user to try again
  clearCart = () => {
    if (this.state.response) {
      this.setState({
        selected_movies: [],
        movies_purchased: 0,
        open_dialog: false,
      });
    } else {
      this.setState({ open_dialog: false });
    }
  };
  //------------------------- Render -----------------------------------------
  render() {
    const {
      movies,
      isLoading,
      selected_movies,
      movies_purchased,
      open_dialog,
      response,
      response_type,
    } = this.state;
    return (
      <Fragment>
        <div className='container'>
          <Grid className='title-container'>
            <Title titlePage={'TheMoviePicker'} />
          </Grid>
          <Grid className='searchfield-container'>
            <Grid className='search-container'>
              <Grid container direction='row' spacing={4} alignItems='center'>
                <Search
                  movies={movies}
                  searchPlaceholder={this.search_placeholder_text}
                  getDataMovies={this.getDataMovies}
                  getDefaultMovies={this.getDefaultMovies}
                />
                {this.getSortingButton()}
              </Grid>
            </Grid>
          </Grid>
          <Grid className='movies-cart-container'>
            <Grid className='movies-container'>
              {isLoading ? (
                <LinearProgress />
              ) : (
                <MoviesViewer
                  movies={movies}
                  selectedMovies={selected_movies}
                  onAddToCart={(movie_add) => {
                    this.addToCart(movie_add);
                  }}
                  onRemoveFromCart={(movie_remove) => {
                    this.removeFromCart(movie_remove);
                  }}
                />
              )}
            </Grid>
            <Grid className='cart-container'>
              <ShoppingCart
                openDialog={open_dialog}
                response={response}
                responseType={response_type}
                onPurchaseCart={this.purchaseMovies}
                getClearCart={this.clearCart}
                selectedMovies={selected_movies}
                totalPurchasedMovies={movies_purchased}
                onRemoveFromCart={(movie_remove) => {
                  this.removeFromCart(movie_remove);
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }

  //--------------------- Lifecycle of Component -------------------------------
  componentDidMount() {
    this.getDataMovies();
    //perform a delay in order to show linear bar
    this.timer = setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
}
