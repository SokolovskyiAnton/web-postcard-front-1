import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function getCurrentDate() {
  let date = new Date()
  return format(date, 'Pp', { locale: ru })
}

export function doDatesMatch(dates) {
  const currentDate = format(new Date(), 'd.M', { locale: ru })
  return dates.some(el => el === currentDate)
}
