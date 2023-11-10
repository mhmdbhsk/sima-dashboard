import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id')

export const dateFormatter = (date: string) => {
  return dayjs(date).format('dddd, D MMMM YYYY')
}
