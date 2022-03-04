import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

export default function ReadMeExampleSingle() {
  const [date, setDate] = React.useState('3/3/2022');
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <>
     <TextInput
            // style={nightMode? styles.textInput2 : styles.textInput1}
            mode="outlined"
            label="Property Location"
            // value={location}
            // onChangeText={(val) => setLocation(val)}
         />
      {/* <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Pick single date
      </Button>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        // validRange={{
          // startDate: new Date(2021, 1, 2),  // optional
          // endDate: new Date(), // optional
          // disabledDates: [new Date()] // optional
        // }}
        onChange={setDate('5/5/90900')} // same props as onConfirm but triggered without confirmed by user
        saveLabel="Save" // optional
        uppercase={false} // optional, default is true
        label="Select date" // optional
        animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      />*/}
    </> 
  );
}

// const formatDate = (date, time) => {
//   return `${date.getDate()}/${date.getMonth() +
//     1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
// };