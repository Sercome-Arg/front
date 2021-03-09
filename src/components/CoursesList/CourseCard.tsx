import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			// maxwidth: 550,
			marginTop: '0px', // 16:9
			
		},
		media: {
			height: 0	,
			paddingTop: '56.25%', // 16:9
			
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		avatar: {
			backgroundColor: red[500],
		},
	}),
);

export default function RecipeReviewCard(props: any) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	let color: string = '#5600c2'
	let letter: string = 'A'
	let name: string = 'name'
	let price: string = 'price'
	let start: string = 'start'
	let end: string = 'end'
	let description: string = 'description'
	let logo: string = process.env.REACT_APP_BASE_URL + '/image/defaultimage.png'

	if(props.color !== undefined) color = props.color
	if(props.letter !== undefined) letter = props.letter
	if(props.name !== undefined) name = props.name
	if(props.price !== undefined) price = props.price
	if(props.start !== undefined) start = props.start
	if(props.end !== undefined) end = props.end
	if(props.description !== undefined) description = props.description
	if(props.logo !== undefined) logo = process.env.REACT_APP_BASE_URL + '/image/' + props.logo
  
	return (

		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar style={{ backgroundColor: props.color }} aria-label="recipe" className={classes.avatar}>
						{ letter }
					</Avatar>
				}
				title={ name }
			/>
			<CardMedia
				className={classes.media}
        image={ logo }
        title={ name }
      />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{ description }
				</Typography>
				
			</CardContent>
			<CardActions disableSpacing>
 	  <IconButton aria-label="edit course">
 		<EditIcon />
 	  </IconButton>
 	  <IconButton aria-label="delete course">
 		<DeleteIcon />
 	  </IconButton>
	   
 	  <IconButton
		className={clsx(classes.expand, {
		  [classes.expandOpen]: expanded,
		})}
		onClick={handleExpandClick}
		aria-expanded={expanded}
		aria-label="show more"
	  >
		<ExpandMoreIcon />
	  </IconButton>
	</CardActions>
	{/* <Collapse in={expanded} timeout="auto" unmountOnExit>
 	  <CardContent>
		<Typography paragraph>Method:</Typography>
 		<Typography paragraph>
 		  Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
 		  minutes.
		</Typography>

	  </CardContent>
	</Collapse> */}
			
		</Card>


	);
}