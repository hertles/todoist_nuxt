<template>
  <v-responsive class="mx-auto" width="1000">
    <form @submit.prevent="Send">
      <div class="inputsBlock">
        <v-text-field class="input"
                      label="Заголовок"
                      hide-details="auto"
                      v-model="form.title"
                      required
        />
        <v-text-field class="input subtitle"
                      label="Описание"
                      hide-details="auto"
                      v-model="form.content"
                      required
        />
        <v-select
            v-model="form.type"
            :items="types"
            item-title="title"
            item-value="value"
            label="Тип задачи"
            persistent-hint
            return-object
            single-line
            required
        />
      </div>
      <v-btn variant="tonal" type="submit" class="send">ОК</v-btn>
    </form>
  </v-responsive>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "today"
  }
})
const types = [
  {value: 'today', title: 'Текущая задача', icon: 'mdi-fire-circle'},
  {value: 'week', title: 'Задача на неделю'},
  {value: 'long', title: 'Отложенная задача'}
]
const form = ref({
  title: props.title,
  content: props.content,
  type: types.find(t => t.value === props.type)
})
const emit = defineEmits(['send'])
const Send = () => {
  emit('send', form.value)
  form.value.title = form.value.content = ""
}
</script>

<style scoped>
.inputsBlock {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.send {
  padding: 0 40px;
}
</style>
