<template>
  <q-dialog
    ref="dialogRef"
  >
    <q-card class="modal full-width full-height">
      <q-card-section>

        <h4 class="text-center">ДР без цветов ?</h4>
        <h5 class="text-center">Та не, бред какой-то</h5>
        <p class="text-h6">Единственное, что нужно сделать - это написать адрес, подъезд и удобное время доставки.</p>
        <p class="text-h6">Курьер сказал, что может вроде как с 7 до 20</p>
        <p class="text-center">
          <q-icon @click="startTalking" class="song-btn" name="campaign" size="30px"/>
        </p>
        <q-form @submit.prevent="sendData">
          <q-input
            v-model="flowersInfo"
            class="text-h5"
            outlined
          />
          <q-btn
            type="submit"
            class="full-width q-mt-md text-h6"
            color="primary"
            :loading="isRequest"
          >
            Давай-Давай!
          </q-btn>
        </q-form>
        <div class="text-center q-mt-md">
          <q-img src="raya-select.png" width="180px"/>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref, computed } from 'vue'
import { api } from 'boot/axios'
import { showNegativeMessage } from 'src/helpers/notify'

defineEmits([
  ...useDialogPluginComponent.emits
])
const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent()
const flowersInfo = ref('')
const isRequest = ref(false)

async function sendData() {
  const payload = {
    flowers: flowersInfo.value
  }
  try {
    isRequest.value = true
    await api.post('/mail//flowers', payload)
    onDialogOK()
  } catch (e) {
    onDialogHide()
    showNegativeMessage()
  } finally {
    isRequest.value = false
  }
}

function startTalking() {
  const text = 'Даже не думай отказываться, а иначе по жопке'
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}
</script>

<style scoped>

</style>
