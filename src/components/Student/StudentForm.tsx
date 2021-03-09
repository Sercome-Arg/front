import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from '@material-ui/core';
import { CirclePicker } from 'react-color';

import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		formControl: {
			width: '100%',
    },
	}),
);

export default function BasicTextFields(props: any) {
	const classes = useStyles();

	const imageRender = (route: string) => {
		return <img width='70px' src={'http://localhost:3040/image/' + route} />
	}


	return (
		<form className={classes.root} noValidate autoComplete="off">

			<div className="form-row my-4">
				<div className="col-12 col-lg-6">
					<InputLabel> Nombre</InputLabel>
					<TextField onChange={props.getValue} name='name' id="name"  variant="outlined" size="small" fullWidth />
				</div>
				<div className="col-12 col-lg-6	">
					<InputLabel>Usuario</InputLabel>
					<TextField onChange={props.getValue} name='user' id="user"  variant="outlined" size="small" fullWidth />
				</div>
			</div>

			<div className="form-row my-4">
				<div className="col-12 col-lg-6">
					<InputLabel> E-mail</InputLabel>
					<TextField onChange={props.getValue} name='mail' id="mail"  variant="outlined" size="small" fullWidth />
				</div>
				<div className="col-12 col-lg-6">
					<InputLabel> Contraseña </InputLabel>
					<TextField onChange={props.getValue} name='pass' id="pass"  variant="outlined" size="small" fullWidth />
				</div>			
			</div>

		<div className="form-row my-4">
			<div className="col-12 col-lg-6">
			
			<InputLabel> Curso al que se asignará: </InputLabel>
			<FormControl className={classes.formControl} size="small">
				<Select onChange={props.getValue} name='course'  id="course" variant="outlined" placeholder="Seleccionar una opción...">
				{
					props.courseList.map((course: {
						_id: string,
						name: string,
					}) => {
						return <MenuItem value={course._id || ''}>{ course.name || '' }</MenuItem>
					})
				}	
				</Select>
      		</FormControl>

			</div>
		</div>
		</form>
	);
}