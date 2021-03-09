import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import './style.css';
import logo from '../assets/img/themoviepicker.png';

// Title styles
const title_style = { width: '70%', margin: '0 auto' };

export default class Title extends Component {

  //----------------- Render ------------------------
  render() {
    const { titlePage } = this.props;
    return (
      <Grid container direction='row' justify='center' style={title_style}>
        <Grid item className='title'>
          {titlePage}
        </Grid>
        <img alt='movie-picker-logo' src={logo} width='100' height='100' />
      </Grid>
    );
  }
}
