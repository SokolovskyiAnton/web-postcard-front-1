<template>
  <q-dialog
    ref="dialogRef"
    persistent
  >
    <q-card class="modal full-width full-height">
      <q-card-section>
        <q-icon
          @click="playSong"
          class="song-btn"
          :name="isPlaying ? 'pause' : 'music_note'"
          size="30px"
        />
        <h2 class="text-center">Раечка!</h2>
        <div class="text-center text-h4">С днём рождения!</div>
        <p class="modal-text q-mt-md">
          <strong>24 года!</strong> Когда мы с тобой познакомились, тебе было 19 лет и я сразу подметил в тебе притягательную энергетику, чувство юмора, милый женский взгяд на мир (не сексизм), а также эдакую лихачку, которая готова сорваться с места и что-то чудить.
        </p>
        <p class="modal-text">
          И вот взрослея, я все чаще убеждаюсь в том, что чем страше становятся люди, тем более сильно костенеют в них эти живые качества.
        </p>
        <p class="modal-text">
          Я желаю тебе, чтобы ты всегда оставалась такой рок-н-ролльной, истощающей гигаваты энерегии и чтобы это приносило тебе радость!
        </p>
        <p class="modal-text">
          Возможно ты немножко удивишься подарку, но именно его я обещал подарить тебе в 2021 году. К сожалению тогда не получилось, но лучше поздно чем никогда!
          Надеюсь он будет в тему и послужит тебе верой и правдой!
        </p>
        <p class="modal-text">
          Обнимаю
          <q-icon name="keyboard_double_arrow_down"/>
        </p>
        <q-btn class="bg-amber-4 text-h4 full-width q-mt-lg" @click="closeModal">
          <q-icon name="img:raya-success.png" size="60px"/>
          NEXT
          <q-icon name="img:raya-success.png" size="60px"/>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

defineEmits([
  ...useDialogPluginComponent.emits
])
const { dialogRef, onDialogOK } = useDialogPluginComponent()
const song = ref('https://cdn2.deliciouspears.com/load/116467937/Valerijj_Meladze_-_Salyut_Vera_(musmore.com).mp3')
const isPlaying = ref(false)
let newSong = ref(null)


function playSong() {
  isPlaying.value = !isPlaying.value
  if (!newSong.value) {
    newSong.value = new Audio(song.value)
  }
  if (!newSong.value.paused) {
    newSong.value.pause()
  } else {
    newSong.value.play()
  }
}
function closeModal() {
  if (newSong.value) {
    newSong.value.pause()
  }
  onDialogOK()
}
</script>

<style scoped>

</style>
