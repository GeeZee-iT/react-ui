import { Dayjs } from 'dayjs'
import generateConfig from '@geezee/rc-picker/lib/generate/dayjs'
import generatePicker, {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps,
} from './generate-picker'
import useDatePickerHandle from './use-date-picker-handle'

export type DatePickerProps = PickerProps<Dayjs>
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>
export type RangePickerProps = BaseRangePickerProps<Dayjs>

// TODO Fix range picker start week class name bug - @geezee/rc-picker
// TODO Mobile Compatibility:
//      It's acceptable now, but the experience is not excellent.
//      Think about `<input type="date/time" />`

const DatePicker = generatePicker<Dayjs>(generateConfig)
DatePicker.useDatePickerHandle = useDatePickerHandle

export { DatePicker }

export default DatePicker

export { useDatePickerHandle }
