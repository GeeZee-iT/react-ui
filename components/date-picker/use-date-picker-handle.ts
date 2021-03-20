import { RangeValue } from '@geezee/rc-picker/lib/interface'
import { PickerRefConfig } from '@geezee/rc-picker/lib/Picker'
import { Dayjs } from 'dayjs'
import { useRef } from 'react'

export default () => {
  const ref = useRef<PickerRefConfig<Dayjs>>(null)
  return {
    focus: () => ref.current?.focus(),
    blur: () => ref.current?.blur(),
    setValue: (val: Dayjs | null | RangeValue<Dayjs>) => ref.current?.setValue(val),
    getValue: () => ref.current?.getValue(),
    ref,
  }
}
