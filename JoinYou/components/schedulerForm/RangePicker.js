import * as React from 'react'
import { Button } from 'react-native-paper'
import { DatePickerModal } from 'react-native-paper-dates'

export default function RangeDatePage() {
  const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onChange = React.useCallback(({ startDate, endDate }) => {
    setVisible(false)
    console.log({ startDate, endDate })
  }, [])

  return (
    <>
      <DatePickerModal
        mode="range"
        visible={visible}
        onDismiss={onDismiss}
        startDate={undefined}
        endDate={undefined}
        onConfirm={onChange}
        saveLabel="Save" // optional
        label="Select period" // optional
        startLabel="From" // optional
        endLabel="To" // optional
        animationType="slide" // optional, default is slide on ios/android and none on web
      />
      <Button onPress={()=> setVisible(true)}>
        Pick range
      </Button>
    </>
  )
}