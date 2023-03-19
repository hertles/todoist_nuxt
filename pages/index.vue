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
        @update:selected="(selectedFilter) => filterNumber = selectedFilter[0]"
    >
    </v-list>
    <v-text-field label="Поиск" v-model="searchString"/>
  </v-navigation-drawer>
  <v-container fluid>
    <div class="main__todolist">
      <TodoForm
          @send="(addingForm)=>AddTodo(addingForm)"
      />
      <v-divider
          class="todolist__divider"
      />
      <Todo
          v-for="todo in filteredAndSearchedTodos"
          :key="todo.id"
          :todo="todo"
          @done="(id)=>Done(id)"
          @delete="(id)=>Delete(id)"
          @edit="(editingForm) => Edit(editingForm)"/>
    </div>
  </v-container>
</template>
<script setup>
import {useAsyncData} from "nuxt/app";

let todos = await useAsyncData(`todo`, () => $fetch(`/api/todo/`, {
  method: "GET",
})).data
const getTodos = async () => {
  todos.value = await useAsyncData(`todo`, () => $fetch(`/api/todo/`, {
    method: "GET",
  })).data
}

const Done = async (id) => {
  await useFetch(`todo`, () => $fetch(`/api/todo/${id}/done`, {
    method: "PUT",
  }))
  await getTodos()
  //todos.value[todos.value.find(thisTodo=>thisTodo.id===id)]=updatedTodo
}
const Delete = async (id) => {
  await useAsyncData(`todo`, () => $fetch(`/api/todo/${id}`, {
    method: "DELETE",
  }))
  await getTodos()
}
const Edit = async (form) => {
  await useAsyncData(`todo`, () => $fetch(`/api/todo/${form.id}`, {
    method: "PUT",
    body: {
      title: form.title,
      content: form.content,
      typeId: form.type.value
    }
  }))
  await getTodos()
}
const AddTodo = async (form) => {
  await useAsyncData(`todo`, () => $fetch(`/api/todo/`, {
    method: "POST",
    body: {
      title: form.title,
      content: form.content,
      typeId: form.type.value
    }
  }))
  await getTodos()
}
const filters = [
  {title: "Текущие задачи", value: 1, props: {prependIcon: "mdi-fire-circle"}},
  {title: "Задачи на неделю", value: 2, props: {prependIcon: "mdi-clock-time-eight"}},
  {title: "Отложенные", value: 3, props: {prependIcon: "mdi-calendar-month"}}
]
const filterNumber = ref(0)
const searchString = ref("")
const filteredTodos = computed(() => {
  return filterNumber.value === 0 || filterNumber.value === undefined
      ? [...todos.value]
      : todos.value.filter(todo => todo.typeId === filterNumber.value)
})
const filteredAndSearchedTodos = computed(() => {
  return filteredTodos.value.filter(todo => todo.title.includes(searchString.value))
})

</script>
<style scoped>
.main__todolist {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todolist__divider {
  margin: 10px 0;
}
</style>
