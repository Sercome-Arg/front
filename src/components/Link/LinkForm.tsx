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
			margin: theme.spacing(1),
			minWidth: 450,
    },
	}),
);

export default function BasicTextFields(props: any) {
	const classes = useStyles();

	let courseList: any[] = []

	if(Array.isArray(props.courseList)){
		courseList = props.courseList 
	}

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<div className="form-row my-4">
				<div className="col-12 col-lg-6">
					<InputLabel> Nombre </InputLabel>
					<TextField onChange={props.getValue} name='name' id="name" label="Nombre" variant="outlined" size="small" fullWidth />
				</div>
				<div className="col-12 col-lg-6">
					<InputLabel> URL </InputLabel>
					<TextField onChange={props.getValue} name='url' id="url" label="URL " variant="outlined" size="small" fullWidth />
				</div>
				
				
			</div>
			<div className="form-row my-4">
				<div className="col-12 col-lg-6	">
					<InputLabel>Curso</InputLabel>
					<FormControl className={classes.formControl}>
					
						<Select  onChange={props.getValue} name='course' id="course">
						{
							courseList.map((course: {
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