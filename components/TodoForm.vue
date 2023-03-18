<template>
  <v-responsive class="mx-auto" width="1000">
    <form @submit.prevent="$emit('send',form)">
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
      <v-btn variant="tonal" type="submit" class="addTask">ОК</v-btn>
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
    default: {value: 'today', title: 'Задача на сегодня'}
  }
})
const types = [
  {value: 'today', title: 'Задача на сегодня'},
  {value: 'week', title: 'Задача на неделю'},
  {value: 'long', title: 'Задача на долгосрок'}
]
const form = ref({
  title: props.title,
  content: props.content,
  type: types.find(t => t.value === props.type)
})
</script>

<style scoped>
.inputsBlock {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
