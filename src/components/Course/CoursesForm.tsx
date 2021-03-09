import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from '@material-ui/core';
import { CirclePicker } from 'react-color';
import { DatePicker } from '../Course';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	}),
);

export default function BasicTextFields(props: any) {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete="off">

			<div className="form-row my-4">
				<div className="col-12 col-lg-3">
					<InputLabel htmlFor="name">Nombre del curso</InputLabel>
					<TextField onChange={props.getValue} name='name' id="name" variant="outlined" size="small" fullWidth />
				</div>

				<div className="col-12 col-lg-3">
					<InputLabel htmlFor="price">Precio</InputLabel>
					<TextField onChange={props.getValue} name='price' id="price"  variant="outlined" size="small" fullWidth /></div>

				<div className="col-12 col-lg-6">
					{/* <InputLabel htmlFor="start">Periodo disponible</InputLabel> */}
					{/* <input onChange={props.getValue} name='start' type='date' /> */}
					<DatePicker/>

				</div>

				{/* <div className="col-12 col-lg-3">
					<InputLabel htmlFor="end">Finaliza</InputLabel>
					<input onChange={props.getValue} name='end' type='date' />
				</div> */}
			</div>

			<div className="form-row my-4">
				<div className="col-12">
					<InputLabel htmlFor="description">Descripción breve</InputLabel>
					<TextField
						id="description"
						name='description'
						multiline
						rows={4}
						placeholder='Descripción'
						variant="outlined"
						fullWidth
						onChange={props.getValue}
					/>
				</div>
			</div>


			<div className="form-row my-4">

				<div className="col-12 col-lg-4">
					<InputLabel>Elige una imagen de presentación de tu curso</InputLabel>

				<div className="d-flex align-items-center">
					<div className="my-1">
						<div className="box">
							<img width='160' src={process.env.REACT_APP_BASE_URL + '/image/' + props.caratula} />
						</div>
					</div>
					<div>
					<Button variant="contained" component="label">
						Subir una imagen
              <input name="caratula" onChange={props.getFile} type="file" hidden />
					</Button></div></div>
				</div>


				<div className=" col 12-lg-4 ">
				<InputLabel > Elige un color para la interfaz de tu curso.</InputLabel>
					<CirclePicker onChangeComplete={ colore => props.getColor(colore.hex) } className="mt-4 ml-1"/>
				</div>

				<div className="col 12 -lg-4">
					<InputLabel > Elige un logotipo que representará tu curso.</InputLabel>
					<div className="d-flex align-items-center">
					<div className="my-1 ">
						<div className="box">
							<img width='160' src={process.env.REACT_APP_BASE_URL + '/image/' + props.logo} />
						</div>
					</div>
					<Button variant="contained" component="label">
						Subir una imagen
						<input onChange={ props.getFile } name="logo" type="file" hidden />
					</Button>
				</div></div>
				

			</div>
		</form>
	);
}