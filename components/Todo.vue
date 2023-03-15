<template>

  <v-list-item
      v-if="!editing"
      class="todo"
      :class="task.done && 'done'"
      @click="$emit('done')"
  >
    <template v-slot:title>
      <div class="todo__item">
        <v-icon class="todo__logo" size="50">{{ icons.get(task.type) }}</v-icon>
        <div class="todo__text">
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-subtitle>{{ task.descr }}</v-card-subtitle>
        </div>
      </div>
    </template>

    <template v-slot:append>
      <v-btn
          icon="mdi-close"
          variant="text"
          @click="Delete"
      ></v-btn>
      <v-btn
          icon="mdi-pencil"
          variant="text"
          @click="toggleEditing"
      ></v-btn>
      <v-btn
          icon="mdi-check"
          variant="text"
      ></v-btn>
    </template>
  </v-list-item>


  <v-list-item
      v-else
      class="todo"
      :class="task.done && 'done'"
  >
    <template v-slot:title>
      <div class="todo__item">
        <v-icon class="todo__logo" size="50">{{ icon }}</v-icon>
        <v-responsive class="mx-auto" width="500">
          <v-text-field class="input"
                        label="Заголовок"
                        hide-details="auto"
                        v-model="form.title"
          >
          </v-text-field>
          <v-text-field class="input subtitle"
                        label="Описание"
                        hide-details="auto"
                        v-model="form.descr">
          </v-text-field>
        </v-responsive>
      </div>
    </template>

    <template v-slot:append>
      <v-btn
          icon="mdi-cancel"
          variant="text"
          @click="toggleEditing"
      ></v-btn>
      <v-btn
          icon="mdi-check"
          variant="text"
          @click="SendForm"
      ></v-btn>
    </template>
  </v-list-item>
</template>


<script setup>
const props = defineProps({
  task: {
    required: true,
    type: Object
  }
})
const form = ref({
  title: props.task.title,
  descr: props.task.descr
})

const setIcon = (type) => {
  switch (type) {
    case "today":
      return "mdi-fire-circle"
    case "week":
      return "mdi-clock-time-eight"
    case "long":
      return "mdi-calendar-month"
    default:
      return "mdi-calendar-month"
  }
}
const icons = new Map([
  ["today", "mdi-fire-circle"],
  ["week", "mdi-clock-time-eight"],
  ["long", "mdi-calendar-month"]])


const icon = ref(setIcon(props.task.type))
const editing = ref(false)
const emit = defineEmits(['edit','delete'])
const toggleEditing = (event) => {
  event.preventDefault()
  editing.value = !editing.value
}
const Delete = () => {
  event.preventDefault()
  emit('delete')
}
const SendForm = () => {
  event.preventDefault()
  editing.value = !editing.value
  emit('edit', form.value)
}
</script>

<style scoped lang="scss">
.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #fff;

  &.done {
    background-color: #eee;
    color: gray;

    & .todo__text {
      text-decoration: line-through;
    }
  }

  &:hover {
    filter: brightness(0.9);
  }
}


.todo__logo {
  margin: 10px 0 -3px 0;
}

.todo__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

</style>
