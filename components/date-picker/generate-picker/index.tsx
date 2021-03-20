import * as React from 'react'
import { GenerateConfig } from '@geezee/rc-picker/lib/generate'
import {
  PickerBaseProps as RCPickerBaseProps,
  PickerDateProps as RCPickerDateProps,
  PickerTimeProps as RCPickerTimeProps,
} from '@geezee/rc-picker/lib/Picker'
import { SharedTimeProps } from '@geezee/rc-picker/lib/panels/TimePanel'
import {
  RangePickerBaseProps as RCRangePickerBaseProps,
  RangePickerDateProps as RCRangePickerDateProps,
  RangePickerTimeProps as RCRangePickerTimeProps,
} from '@geezee/rc-picker/lib/RangePicker'
import { PickerMode } from '@geezee/rc-picker/lib/interface'
import PickerButton from '../picker-button'
import PickerTag from '../picker-tag'
import generateSinglePicker from './generate-single-picker'
import generateRangePicker from './generate-range-picker'
import { InputColors, InputVariantTypes, NormalSizes } from '../../utils/prop-types'
import useDatePickerHandle from './../use-date-picker-handle'

export const Components = { button: PickerButton, rangeItem: PickerTag }

function toArray<T>(list: T | T[]): T[] {
  if (!list) {
    return []
  }
  return Array.isArray(list) ? list : [list]
}

export function getTimeProps<DateType>(
  props: { format?: string; picker?: PickerMode } & SharedTimeProps<DateType>,
) {
  const { format, picker, showHour, showMinute, showSecond, use12Hours } = props

  const firstFormat = toArray(format)[0]
  const showTimeObj: SharedTimeProps<DateType> = { ...props }

  if (firstFormat) {
    if (!firstFormat.includes('s') && showSecond === undefined) {
      showTimeObj.showSecond = false
    }
    if (!firstFormat.includes('m') && showMinute === undefined) {
      showTimeObj.showMinute = false
    }
    if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined) {
      showTimeObj.showHour = false
    }

    if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined) {
      showTimeObj.use12Hours = true
    }
  }

  if (picker === 'time') {
    return showTimeObj
  }

  return {
    showTime: showTimeObj,
  }
}

type InjectDefaultProps<Props> = Partial<
  Omit<
    Props,
    | 'generateConfig'
    | 'prevIcon'
    | 'nextIcon'
    | 'superPrevIcon'
    | 'superNextIcon'
    | 'hideHeader'
    | 'components'
    | 'locale'
  > & {
    locale?: string
    bordered?: boolean
    size?: NormalSizes
    color?: InputColors
    variant?: InputVariantTypes
    forwardedRef?: React.Ref<any>
    ref?: React.MutableRefObject<any>
  }
>

export type AdditionalPickerLocaleProps = {
  dateFormat?: string
  dateTimeFormat?: string
  weekFormat?: string
  monthFormat?: string
}

export type AdditionalPickerLocaleLangProps = {
  placeholder: string
  yearPlaceholder?: string
  quarterPlaceholder?: string
  monthPlaceholder?: string
  weekPlaceholder?: string
  rangeYearPlaceholder?: [string, string]
  rangeMonthPlaceholder?: [string, string]
  rangeWeekPlaceholder?: [string, string]
  rangePlaceholder?: [string, string]
}

// Picker Props
export type PickerBaseProps<DateType> = InjectDefaultProps<RCPickerBaseProps<DateType>>
export type PickerDateProps<DateType> = InjectDefaultProps<RCPickerDateProps<DateType>>
export type PickerTimeProps<DateType> = InjectDefaultProps<RCPickerTimeProps<DateType>>

export type PickerProps<DateType> =
  | PickerBaseProps<DateType>
  | PickerDateProps<DateType>
  | PickerTimeProps<DateType>

// Range Picker Props
export type RangePickerBaseProps<DateType> = InjectDefaultProps<RCRangePickerBaseProps<DateType>>
export type RangePickerDateProps<DateType> = InjectDefaultProps<RCRangePickerDateProps<DateType>>
export type RangePickerTimeProps<DateType> = InjectDefaultProps<RCRangePickerTimeProps<DateType>>

export type RangePickerProps<DateType> =
  | RangePickerBaseProps<DateType>
  | RangePickerDateProps<DateType>
  | RangePickerTimeProps<DateType>

function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  // Picker
  const {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker,
  } = generateSinglePicker(generateConfig)

  // Range Picker
  const RangePicker = generateRangePicker(generateConfig)

  // Picker type
  type MergedDatePicker = typeof DatePicker & {
    WeekPicker: typeof WeekPicker
    MonthPicker: typeof MonthPicker
    YearPicker: typeof YearPicker
    RangePicker: React.FC<RangePickerProps<DateType>>
    TimePicker: typeof TimePicker
    QuarterPicker: typeof QuarterPicker
    useDatePickerHandle: typeof useDatePickerHandle
  }

  const MergedDatePicker = DatePicker as MergedDatePicker
  MergedDatePicker.WeekPicker = WeekPicker
  MergedDatePicker.MonthPicker = MonthPicker
  MergedDatePicker.YearPicker = YearPicker
  MergedDatePicker.RangePicker = RangePicker as React.FC<RangePickerProps<DateType>>
  MergedDatePicker.TimePicker = TimePicker
  MergedDatePicker.QuarterPicker = QuarterPicker
  MergedDatePicker.useDatePickerHandle = useDatePickerHandle

  return MergedDatePicker
}

export default generatePicker
