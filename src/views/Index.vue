<template>
    <div class="todoapp">
        <Header @new="newTodo($event)"></Header>
        <Main v-if="show" class="main" :todos="todosLocal"></Main>
        <Footer v-if="show" class="footer" :todos="todosLocal"></Footer>
    </div>
</template>

<script>
import Main from '@/components/Main.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Api from '@/api/Api';

export default {
    components: { Main, Footer, Header },
    name: 'IndexGoal',
    data() {
        return {
            show: false,
            todosLocal: null
        }
    },
    mounted() {
        this.$store.dispatch('todos')
        this.getTodos()
    },
    watch: {
        '$store.state.todos'(newValue, oldValue) {
            // como la lista filtrada se guarda en el store al cambiar todos los objetos a otro estado se quitan de la lista y la lista se queda a 0,
            // por este motivo si la lista esta a 0 se hace una peticion de todos
            if (newValue.length === 0 && oldValue.length !== 0) {
                this.$store.dispatch('todos')
            } else if (newValue) {
                this.checkTodos()
                this.getTodos()
            }
        }
    },
    methods: {
        checkTodos() {  //si no hay tareas pendientes main y footer ocultos 
            if (this.$store.state.todos.length !== 0) {
                this.show = true
            } else {
                this.show = false
            }
        },
        newTodo(item) { //crear un todo
            let data = {
                "title": item,
                "completed": false
            }
            Api.createTodo(data).then(response => {
                if (response.data) {    //Actualizamos la lista de todos del Store
                    this.$store.commit('todos', this.$store.state.todos.concat(response.data))
                }
            })
        },
        getTodos() {    //filtramos los todos a mostrar
            switch (this.$store.state.filterTodos) {
                case this.$t('FILTER.ALL'):
                    this.todosLocal = this.$store.state.todos
                    break;
                case this.$t('FILTER.ACTIVE'):
                    this.todosLocal = this.$store.state.todos.filter(element => element.completed === false)
                    break;
                case this.$t('FILTER.COMPLETE'):
                    this.todosLocal = this.$store.state.todos.filter(element => element.completed === true)
                    break;
                default:
                    this.todosLocal = this.$store.state.todos
                    break;
            }
            // this.checkTodos()
        },
    }

}
</script>
