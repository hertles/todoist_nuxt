<template>
  <v-navigation-drawer

      permanent
  >
    <v-card-title>Фильтры</v-card-title>
    <v-list
        density="compact"
        nav
        :items="filters"
        item-title="title"
        item-value="value"
        @update:selected="filterName"
    >
    </v-list>
    <v-text-field label="Поиск" v-model="searchString"/>
  </v-navigation-drawer>
  <v-container fluid>
    <div class="main__tasklist">
      <TodoForm
          @send="(addingForm)=>AddTodo(addingForm)"
      />
      <Todo
          v-for="todo in filteredAndSearchedTodos"
          :key="todo.id"
          :todo="todo"
          @done="(id)=>Done(id)"
          @delete="(id)=>Delete(id)"
          @edit="(editingForm)=>Edit(editingForm)"/>
    </div>
  </v-container>
</template>
<script setup>
const todos = ref([
  {
    id: 0,
    title: "Приготовить яичницу с хлебом",
    content: "Щедро посыпать приправами и жарить, жарить",
    type: "today",
    done: false
  },
  {
    id: 1,
    title: "Написать тест по математике",
    content: "Списать у одноклассника",
    type: "today",
    done: false
  },
  {
    id: 2,
    title: "Прогуляться по парку",
    content: "Послушать птиц",
    type: "week",
    done: true
  },
  {
    id: 3,
    title: "Завершить проект",
    content: "Отправить его заказчику",
    type: "long",
    done: false
  },
  {
    id: 4,
    title: "Выучить песню на гитаре",
    content: "Потренировать баррэ",
    type: "week",
    done: true
  },
  {
    id: 5,
    title: "Прочитать книгу",
    content: "Рэй Бредбери \"Вино из одуванчиков\"",
    type: "week",
    done: true
  },
  {
    id: 6,
    title: "Устроиться на работу",
    content: "В маленькую уютную IT компанию",
    type: "long",
    done: false
  },
])

const Done = (id) => {
  todos.value.find(todo => todo.id === id).done = !todos.value.find(todo => todo.id === id).done
}
const Delete = (id) => {
  todos.value = todos.value.filter(thisTodo => thisTodo.id !== id)
}
const Edit = (form) => {
  const todo = todos.value.find(todo => todo.id === form.id)
  todo.title = form.title
  todo.content = form.content
  todo.type = form.type.value
}
const filters = [
  {title: "Текущие задачи", value: "today", props: {prependIcon: "mdi-fire-circle"}},
  {title: "Задачи на неделю", value: "week", props: {prependIcon: "mdi-clock-time-eight"}},
  {title: "Отложенные", value: "long", props: {prependIcon: "mdi-calendar-month"}}
]
const filterName = ref("")
const setFilter = (type) => {
  filterName.value = filterName.value === type ? "" : type
}
const searchString = ref("")
const filteredTodos = computed(() => {

  return filterName.value === ""
      ? [...todos.value]
      : todos.value.filter(todo => todo.type === filterName.value)
})
const filteredAndSearchedTodos = computed(() => {
  return filteredTodos.value.filter(todo => todo.title.includes(searchString.value))
})
const AddTodo = (form) => {
  todos.value.push({...form.value, type: form.value.type.value, id: Date.now(), done: false})
  form.value.title = form.value.content = ""
}

</script>
<style scoped>
.main__tasklist {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.addTask {
  margin-bottom: 20px;
}
</style>
