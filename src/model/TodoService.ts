import { TodoItem } from "./TodoItem";

export class TodoService {
    private KeyString = 'todos';  

    getAll(){
        try {
            const todos = localStorage.getItem(this.KeyString);
            if(todos){
                return JSON.parse(todos);
            }
            return [];
        } catch (error) {
             return []
        }
    }
    saveTodos(todos:TodoItem[]){
        localStorage.setItem(this.KeyString,JSON.stringify(todos))
    }
    add(todo:TodoItem){
        let todos = this.getAll();
        todos.push(todo);
        this.saveTodos(todos);
    }

    remove(id:number){
        let todos = this.getAll().filter((todo)=> todo.id !== id);
        this.saveTodos(todos);
    }
    update(newTodo:TodoItem){
        const todos = this.getAll();
        const index = todos.findIndex((todo)=> todo.id === newTodo.id)
        if(index !== -1){
            todos[index] = newTodo;
            this.saveTodos(todos);
        }
    }
    togleCompleted(id:number){
        const todos = this.getAll();
        const todo = todos.find((todo)=> todo.id === id)
        if(todo){
            todo.completed = !todo.completed;
            this.saveTodos(todos);
        }
    }
}