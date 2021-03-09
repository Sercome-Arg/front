import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      minWidth:'100%',
      backgroundColor: 'theme.palette.background.paper',
    },
  }),
);

export default function CheckboxList(props: any) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  let answerList: any[] = []

  if(
		props.answerList !== undefined &&
		Array.isArray(props.answerList) &&
		props.answerList.length > 0
	) {
		answerList = props.answerList
	}

  return (
    <List className={classes.root} >
      {answerList.map((value: {
        answer: string,
        calification: string
      }, index: number) => {
        const labelId = `checkbox-list-label-${value.answer}`;

        return (
          <ListItem key={index} role={undefined} dense button onClick={handleToggle(index)} >
            <ListItemText id={labelId} primary={ value.answer } />
            <ListItemSecondaryAction>
              { value.calification }
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}