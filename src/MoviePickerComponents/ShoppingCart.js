import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { custom_orange, custom_blue } from '../MoviePickerConfigs/config_file';

const cart_title_style = { color: 'white' };
const dialog_style = { width: '100%', padding: 0 };
const buy_button_style = { backgroundColor: custom_orange, color: custom_blue };
const delete_list_button = { color: custom_orange };
const list_text = { color: 'white' };
const list_height = { height: 500, overflowY: 'auto' };

export default class ShoppingCart extends Component {
  //----------------- Purchase Movies -----------------------------------------
  purchaseMovies = () => {
    this.props.onPurchaseCart();
  };
  //----------------- Inform User about the purschase -------------------------
  getAlertDialog = () => {
    const { response, responseType, openDialog } = this.props;
    const success_text = 'Your purchase completed successfully';
    const fail_text = 'Oops! An error occured, Please try again';
    let info_text = response ? success_text : fail_text || '';
    return (
      <Dialog
        open={openDialog}
        onClose={() => {
          this.handleDialogOnClose();
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent style={dialog_style}>
          <Alert severity={responseType}>{info_text} </Alert>
        </DialogContent>
      </Dialog>
    );
  };

  // After successfull purchase we need to have empty cart
  handleDialogOnClose = () => {
    this.props.getClearCart();
  };

  //-------------------------- Remove Movies from cart ------------------------
  removeFromCart = (remove_movie) => {
    this.props.onRemoveFromCart(remove_movie);
  };

  //------------------------------ Render -------------------------------------
  render() {
    const { totalPurchasedMovies, selectedMovies } = this.props;

    return (
      <Grid container item direction='row' justify='center'>
        <Grid item>
          <Typography style={cart_title_style}>Your Shopping Cart</Typography>
        </Grid>
        <Grid item xs={12} style={list_height}>
          <ListItem>
            <ListItemText
              style={list_text}
              primary={`You have ${totalPurchasedMovies} movies in your Cart`}
            />
          </ListItem>
          {selectedMovies.map((item, index) => (
            <ListItem key={index}>
              <ListItemText style={list_text} primary={item.movie} />
              <IconButton
                style={delete_list_button}
                edge='end'
                onClick={() => {
                  this.removeFromCart(item.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </Grid>
        <Grid item xs={5}>
          <Button
            style={buy_button_style}
            disabled={selectedMovies.length === 0}
            variant='contained'
            onClick={this.purchaseMovies}
          >
            BUY MOVIES
          </Button>
          {this.getAlertDialog()}
        </Grid>
      </Grid>
    );
  }
}

ShoppingCart.defaultProps = {
  open_dialog: false
};
