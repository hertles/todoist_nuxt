<template>
  <v-navigation-drawer

      permanent
  >
    <v-list
        density="compact"
        nav
    >
      <v-card-title>Фильтры</v-card-title>
      <v-list-item prepend-icon="mdi-fire-circle" title="Текущие задачи" value="today"
                   @click="setFilter('today')"></v-list-item>
      <v-list-item prepend-icon="mdi-clock-time-eight" title="Задачи на неделю" value="week"
                   @click="setFilter('week')"></v-list-item>
      <v-list-item prepend-icon="mdi-calendar-month" title="Отложенные" value="long"
                   @click="setFilter('long')"></v-list-item>
      <v-text-field label="Поиск" v-model="searchString"/>
    </v-list>
  </v-navigation-drawer>
  <v-container fluid>
    <div class="main__tasklist">
      <v-form>
        <v-text-field aria-required="true" label="Заголовок" v-model="form.title"/>
        <v-text-field aria-required="true" label="Описание" v-model="form.descr"/>
        <v-select
            v-model="form.type"
            :items="types"
            item-title="title"
            item-value="value"
            label="Тип задачи"
            persistent-hint
            return-object
            single-line
        ></v-select>
        <v-btn class="addTask" @click="addTask">Добавить задачу</v-btn>
      </v-form>
      <div v-for="todo in filteredAndSearchedTodos" :key="todo.id">
        <Todo :task="todo" @done="Done(todo.id)" @delete="todos=todos.filter(thisTodo=>thisTodo.id!==todo.id)"
              @edit="(editingForm)=>Edit(todo.id,editingForm)"/>
      </div>
    </div>
  </v-container>
</template>
<script setup>
const todos = ref([
  {
    id: 0,
    title: "Приготовить яичницу с хлебом",
    descr: "Щедро посыпать приправами и жарить, жарить",
    type: "today",
    done: false
  },
  {
    id: 1,
    title: "Написать тест по математике",
    descr: "Списать у одноклассника",
    type: "today",
    done: false
  },
  {
    id: 2,
    title: "Прогуляться по парку",
    descr: "Послушать птиц",
    type: "week",
    done: true
  },
  {
    id: 3,
    title: "Завершить проект",
    descr: "Отправить его заказчику",
    type: "long",
    done: false
  },
  {
    id: 4,
    title: "Выучить песню на гитаре",
    descr: "Потренировать баррэ",
    type: "week",
    done: true
  },
  {
    id: 5,
    title: "Прочитать книгу",
    descr: "Рэй Бредбери \"Вино из одуванчиков\"",
    type: "week",
    done: true
  },
  {
    id: 6,
    title: "Устроиться на работу",
    descr: "В маленькую уютную IT компанию",
    type: "long",
    done: false
  },
])

const Done = (id) => {
  todos.value.find(todo => todo.id === id).done = !todos.value.find(todo => todo.id === id).done
}
const Edit = (id, form) => {
  console.log(form)
  const todo = todos.value.find(todo => todo.id === id)
  todo.title = form.title
  todo.descr = form.descr
}


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
const addTask = () => {
  if (form.value.title !== "" && form.value.descr !== "") {
    todos.value.push({...form.value, type: form.value.type.value, id: todos.value.length, done: false})
    form.value.title = form.value.descr = ""
  }
}

const types = [
  {value: 'today', title: 'Задача на сегодня'},
  {value: 'week', title: 'Задача на неделю'},
  {value: 'long', title: 'Задача на долгосрок'}
]
const form = ref({
  title: "",
  descr: "",
  type: {value: 'today', title: 'Задача на сегодня'}
})

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
