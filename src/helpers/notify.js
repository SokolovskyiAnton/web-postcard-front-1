import { Notify } from 'quasar'

export function showSuccessMessage(message) {
  Notify.create({
    type: 'positive',
    icon: 'img:raya-success.png',
    iconSize: '60px',
    position: 'top',
    timeout: '10000',
    message: message,
    classes: 'notify-class'
  })
}

export function showNegativeMessage() {
  Notify.create({
    type: 'negative',
    icon: 'img:raya-negative.png',
    iconSize: '60px',
    position: 'top',
    timeout: '10000',
    message: 'Упс.. Видимо сервер уснул. Отправь запрос еще раз. Если не помогает, то телега',
    classes: 'notify-class'
  })
}
