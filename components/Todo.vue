<template>

  <v-list-item
      v-if="!editing"
      :class="['todo',{'done': todo.done}]"
      @click="Done"
  >
    <template v-slot:title>
      <div class="todo__item">
        <v-icon
            class="todo__logo"
            size="50">
          {{ icons[todo.typeId] }}
        </v-icon>
        <div class="todo__text">
          <v-card-title>{{ todo.title }}</v-card-title>
          <v-card-subtitle>{{ todo.content }}</v-card-subtitle>
        </div>
      </div>
    </template>
    <template v-slot:append>
      <v-btn
          icon="mdi-close"
          variant="text"
          @click.stop="Delete"
      />
      <v-btn
          icon="mdi-pencil"
          variant="text"
          @click.stop="toggleEditing"
      />
      <v-btn
          icon="mdi-check"
          variant="text"
          @click.stop="Done"
      />
    </template>
  </v-list-item>


  <v-list-item
      v-else
      :class="['todo',{'done': todo.done}]"
  >
    <template v-slot:title>
      <div class="todo__item">
        <TodoForm
            :title="props.todo.title"
            :content="props.todo.content"
            :typeId="props.todo.typeId"
            @send="(editingForm)=>Edit(editingForm)"
        />
      </div>
    </template>
    <template v-slot:append>
      <v-btn
          icon="mdi-cancel"
          variant="text"
          @click.stop="toggleEditing"
      />
    </template>
  </v-list-item>
</template>


<script setup>
import TodoForm from "./TodoForm.vue";

const props = defineProps({
  todo: {
    required: true,
    type: Object
  }
})
const icons = [
  "",
  "mdi-fire-circle",
  "mdi-clock-time-eight",
  "mdi-calendar-month"]
const editing = ref(false)
const emit = defineEmits(['edit', 'delete'])
const toggleEditing = () => {
  editing.value = !editing.value
}
const Edit = (form) => {
  editing.value = !editing.value
  emit('edit', {...form, id: props.todo.id})
}
const Done = () => {
  emit('done', props.todo.id)
}
const Delete = () => {
  emit('delete', props.todo.id)
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
  gap: 10px;
}
</style>
