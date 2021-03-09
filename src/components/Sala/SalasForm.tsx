import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CourseSelect } from './../Sala'

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
    <div className="form-row">
    <div className="col-12 col-lg-4">
      <TextField id="outlined-basic" label="Meedting ID" variant="outlined" size="small" fullWidth /></div>
      <div className="col-12 col-lg-4">
      <TextField id="outlined-basic" label="Password" variant="outlined" size="small"  fullWidth /></div>
      <div className="col-12 col-lg-4">
      <CourseSelect /></div></div>
    </form>
  );
}