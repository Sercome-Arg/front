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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 550,
			
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
		
		if(props.boton !== undefined){
			props.boton(props.cardNumber)

		}
	};


	let color: string = '#5600c2'
	let letter: string = 'A'
	let title: string = 'title'
	let description: string = 'description'

	if(props.color !== undefined) color = props.color
	if(props.letter !== undefined) letter = props.letter
	if(props.title !== undefined) title = props.title
	if(props.description !== undefined) description = props.description

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar style={{ backgroundColor: props.color }} aria-label="recipe" className={classes.avatar}>
						{ letter }
					</Avatar>
				}
				title={ title }
			/>
			
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{ description }
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
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
			
		</Card>
	);
}