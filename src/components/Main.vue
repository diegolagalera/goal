<template>
    <div>
        <div>
            <input id="label" type="checkbox" class="toggle-all" v-model="selectAll">
            <label for="label"></label>
        </div>
        <div>
            <ul class="todo-list">
                <li :class="editing === todo.id ? 'editing' : (todo.completed ? 'completed' : '')"
                    v-for="(todo, index) in todosLocal" :key="todo.id">
                    <input v-if="todo.id === editing" class="edit" v-model="todo.title"
                        @keyup.esc="discardChanges(index)" @focusout="edit(todo)">

                    <div v-else v-on:dblclick="editing = todo.id">
                        <input class="toggle" :id="todo.id" :value="todo.id" name="todo" type="checkbox"
                            v-model="todo.completed"
                            v-on:click="update({ 'id': todo.id, 'title': todo.title, 'completed': !todo.completed })" />
                        <label :for="todo.id">{{ todo.title }}</label>
                    </div>
                    <button v-show="!editing" class="destroy" v-on:click="destroy(index, todo)"></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Api from '@/api/Api'
export default {
    name: 'MainGoal',
    props: {
        todos: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            selectAll: false,
            editing: null,
            todosLocal: (JSON.parse(JSON.stringify(this.todos))),
        }
    },
    mounted() {
        this.checkSelects()
    },
    watch: {
        selectAll(newValue) {   //selector global=true seleccionamos todos los elementos en caso contrario los deseleccionamos
            let todosCompleteLength = (this.todosLocal.filter(element => element.completed === true)).length
            this.todosLocal.forEach(element => {
                if (newValue) {
                    if (!element.completed) { //actualizamos los elementos que esten en false a true
                        element.completed = true
                        this.update(element)
                    }
                } else {
                    if (this.todosLocal.length === todosCompleteLength) {
                        if (element.completed) {    //actualizamos los elementos que esten en true a false
                            element.completed = false
                            this.update(element)
                        }
                    }
                }
            });
        },
        todosLocal: {
            handler() {
                this.checkSelects()
            },
            deep: true
        },
        todos(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.todosLocal = (JSON.parse(JSON.stringify(this.todos)))
            }
        }
    },
    methods: {
        edit(todo) {
            if (this.editing !== null) {    // si estamos en modo edicion escuchamos el evento "keyup"
                var self = this;
                document.addEventListener("keyup", function listen(event) {
                    if (event.code === 'Enter') {
                        if (todo.title === '') {    //si la entrada esta vacia eliminamos el todo de la lista de todos
                            let index = self.todosLocal.indexOf(todo)
                            self.destroy(index, todo)
                        } else {        // en caso contrario actualizamos el todo
                            self.update(todo)
                            self.editing = null
                        }
                    }
                    this.removeEventListener("keyup", listen)

                });
            }
        },
        discardChanges(index) { //al estar en modo edicion y apretar esc descarta los canvios y cierra el modo edicion
            this.todosLocal[index] = this.todos[index]
            this.editing = null
        },
        checkSelects() {    // activa y desactiva el select global en funcion de si tenem algun todo por hacer
            if (this.todosLocal.find(element => element.completed === false)) {
                this.selectAll = false
            } else {
                this.selectAll = true
            }
        },
        update(todo) {
            Api.editTodo(todo).then(element => {
                if (element) {  //si la actualizacion tiene exito actualizo el store con los nuevos datos
                    this.$store.commit('todos', this.todosLocal)
                }
            }).catch(error => {
                if (error) {    //en caso de tener un error de la llamada api, volvemos al estado anteriro
                    let index = this.todosLocal.indexOf(todo)
                    this.todosLocal[index].completed = !todo.completed
                }
            })
        },
        destroy(index, element) {
            if (element.id) {
                Api.deleteTodo(element.id).then(response => {   //eliminamos el elemto de la BD
                    if (response) {     //si tiene exito actualizamos la lista de todos y el store
                        this.todosLocal.splice(index, 1)
                        this.$store.commit('todos', this.todosLocal)
                    }
                }).catch(error => {     //en caso de error de api, mostamos el error por pantalla
                    alert(error.message);
                })
            }
        },


    }
}
</script>

<style>
</style>