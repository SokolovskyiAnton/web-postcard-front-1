<template>
  <q-card class="card q-ma-sm">
    <q-card-section>
      <h5 class="text-center">App for meets</h5>
      <q-form @submit.prevent="createMeet">
        <q-select
          outlined
          v-model="form.city"
          :options="options"
        >
          <template #selected>
            <template v-if="form.city">
              {{ form.city }}
            </template>
            <template v-else>
              Выбери город
            </template>
          </template>
        </q-select>
        <q-input
          class="q-mt-sm"
          v-model="form.date"
          outlined
          placeholder="Выбери дату"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="form.date"
                  mask="DD.MM.YYYY"
                  first-day-of-week="1"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Закрыть" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          class="q-mt-sm"
          type="textarea"
          v-model="form.text"
          outlined
          placeholder="Пожелания (необязательное поле)"
        />

        <q-btn
          class="q-mt-sm full-width"
          color="primary"
          type="submit"
          :loading="isRequest"
        >
          Yep
        </q-btn>
        <div
          v-if="isError"
          class="error-block"
        >
          <q-img src="raya-negative.png" width="60px"/>
          <span class="error-block__text">
            плиз заполни еще поля
          </span>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
  <div
    @click="showFlowersModal"
    class="flowers"
  >
    <q-img
      class="flowers-img"
      :class="{ 'flowers-active': showFlowersBlock }"
      src="raya-flowers.png"
      width="200px"
    />
    <div
      class="flowers-text"
      :class="{ 'flowers-active': showFlowersBlock }"
    >
      тыкни!
    </div>
  </div>
</template>

<script setup>
import PostcardModal from 'components/PostcardModal'
import FlowersModal from 'components/FlowersModal'
import { api } from 'boot/axios'
import { required } from '@vuelidate/validators'
import { ref, onBeforeMount, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useQuasar } from 'quasar'
import { showNegativeMessage, showSuccessMessage } from 'src/helpers/notify'
import { getCurrentDate, doDatesMatch } from 'src/helpers/checkDates'

const form = ref({
  city: '',
  date: '',
  text: ''
})
const showFlowersBlock = ref(false)
const isError = ref(false)
const isRequest = ref(false)
const rules = computed(() => ({
  city: {
    required
  },
  date: {
    required
  }
}))
const q$ = useQuasar()
const v$ = useVuelidate(rules.value, form.value)

const options = ['Каменское', 'Днепр', 'Запорожье', 'Киев', 'Харьков', 'Одесса', 'Львов', 'Варшава', 'Берлин', 'Керчь']

async function createMeet() {
  if (v$.value.$invalid) {
    isError.value = true
    return;
  }
  try {
    isError.value = false
    isRequest.value = true
    const payload = {
      city: form.value.city,
      date: form.value.date,
      text: form.value.text
    }
    await api.post('/mail/create', payload)

    showSuccessMessage('E рок!! Скоро получу сообщение!')
    resetDataForm()
  } catch (e) {
    showNegativeMessage()
  } finally {
    isRequest.value = false
  }
}

function sendDateInfo() {
  const payload = {
    date: getCurrentDate()
  }
  api.post('/mail/date', payload)
}
function resetDataForm() {
  form.value.city = ''
  form.value.date = ''
  form.value.text = ''
}

function showModal() {
  q$.dialog({
    component: PostcardModal,
  }).onOk(() => {
    showFlowersBlock.value = true
  })
}
function showFlowersModal() {
  q$.dialog({
    component: FlowersModal,
  }).onOk(() => {
    showFlowersBlock.value = false
    showSuccessMessage('Курьер уже едет! С Днём рождения!')
  })
}

onBeforeMount(() => {
  if (doDatesMatch(['24.5', '13.6'])) {
    showModal()
  }
  sendDateInfo()
})
</script>
