import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off"> 
    <div className="form-row my-4">
      <div className="col-12 col-lg-8">
        <TextField id="outlined-basic" label="Buscar por nombre" variant="outlined" size="small" fullWidth /></div>
      <div className="col-12 col-lg-4">
   				<button  className="btn btn-primary rounded-buttons"> Buscar curso</button>
    </div>
    </div>

    </form>
  );
}