<template>
    <main class="container">
      <header >
        <h1>Bem Vindo a lista de Tarefas</h1>
      </header>
      <section class="todoAdd">
        <form class="todoForm">
          <input type="text" placeholder="Digite uma tarefa" v-model="todoTitle">
          <button type="submit" @click.prevent="addTodo()">Adicionar</button>
        </form>
      </section>
      <section class="todoList">
        <ul>
            <li v-for="(todo,index) of todos" :key="todo.id" :class="{'completed' : todo.completed}">
              <input type="text" v-model="todos[index].title" @blur="updateTodo(todo)" :class="{'completed' : todo.completed}">
              <div class="optionsList">
                <button @click="toggleTodo(todo.id)" class="checkButton">Check</button>
                <button @click="removeTodo(todo.id)" class="removeButton">Remover</button>
              </div>
            </li>
        </ul>
      </section>
    </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {TodoService} from '@/model/TodoService'; 
import {TodoItem} from '@/model/TodoItem';

const todoTitle = ref('');
const todos = ref<TodoItem[]>([]);
const todoService = ref(new TodoService());

const addTodo = ()=>{
  if(!todoTitle.value) return alert('Digite uma tarefa');
  const todoItem: TodoItem = {
    id: Math.random(),
    title: todoTitle.value,
    completed: false
  }
  todoService.value.add(todoItem);
  todos.value = todoService.value.getAll();
  todoTitle.value = '';
}
const toggleTodo = (id:number)=>{
  todoService.value.togleCompleted(id);
  todos.value = todoService.value.getAll();
}
const removeTodo = (id:number)=>{
  todoService.value.remove(id);
  todos.value = todoService.value.getAll();
}

const updateTodo = (todo:TodoItem)=>{
  todoService.value.update(todo);
}
onMounted(()=>{
  todos.value = todoService.value.getAll();
})

</script>
<style s>

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: #f5f5f5;
}
header{
  display: flex;
  justify-content: center;
  text-align: center;
  color: #333;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.container{
  width: 100%;
}
input{
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}
.optionsList{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.todoList{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

}
.todoList li{
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

}
.todoList li input{
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
}
.todoList li input:focus{
  outline: none;
}
.todoList li.completed{
  background-color: green;
  color: white;
}
.todoList li input.completed{
  background-color: green;
  color: white;
}
.todoForm{
  display: flex;
  justify-content: center;
  align-items: center;
}
.todoForm button{
  background-color: #287e00;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
.todoAdd{
  display: flex;
  justify-content: center;
  align-items: center;
}
.completed{
  background-color: green;
  color: white;
}
.checkButton{
  background-color: #287e00;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
.removeButton{
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
</style>