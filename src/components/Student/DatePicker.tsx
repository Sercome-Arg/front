import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
				{/* <KeyboardDatePicker
					// disableToolbar
					// variant="inline"
					// format="MM/dd/yyyy"
					// margin="normal"
					// id="date-picker-inline"
					// label="Disponible desde"
					value={selectedDate}
					onChange={handleDateChange}
					// KeyboardButtonProps={{
					// 	'aria-label': 'change date',
					// }}
				/> */}
				{/* <KeyboardDatePicker
					disableToolbar
					variant="inline"
					format="MM/dd/yyyy"
					margin="normal"
					id="date-picker-inline"
					label="Disponible hasta"
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/> */}
   
      </Grid>
    </MuiPickersUtilsProvider>
  );
}