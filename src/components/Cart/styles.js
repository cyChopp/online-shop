import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: '5%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
    borderRadius:'0px'
  },
  checkoutButton: {
    minWidth: '150px',
    borderRadius:'0px'

  },

  link: {
    textDecoration: 'none',
  },
  cartDetails: {
    display: 'flex',
    flexDirection:'row',
    marginTop: '7%',
   width: '100%',
   justifyContent: 'space-between',
  },
  
}));