import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    height: 130,
    maxWidth:100
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    display:'flex',
    justifyContent: 'space-around',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  emptyButton:{
    borderRadius:'0px',
    marginLeft: "auto !important"

  },
  itemWrapper:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
}));