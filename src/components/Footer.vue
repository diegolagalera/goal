<template>
    <div>
        <div class="todo-count">
            <strong>
                {{ count }}
            </strong>
            {{ $tc('ITEMS', count) }}
        </div>
        <div class="filters">
            <li>
                <a href="/all" :class="$store.state.filterTodos === $t('FILTER.ALL') ? 'selected' : null">
                    {{ $t("FILTER.ALL") }}
                </a>
            </li>
            <li>
                <a href="/active" :class="$store.state.filterTodos === $t('FILTER.ACTIVE') ? 'selected' : null">
                    {{ $t("FILTER.ACTIVE") }}
                </a>
            </li>
            <li>
                <a href="/completed" :class="$store.state.filterTodos === $t('FILTER.COMPLETE') ? 'selected' : null">
                    {{ $t("FILTER.COMPLETE") }}
                </a>
            </li>
        </div>
        <div v-if="showClearAll" class="clear-completed" @click="clearAll()">
            {{ $t("CLEAR_ALL") }}
        </div>
    </div>
</template>

<script>
import Api from '@/api/Api'

export default {
    name: 'FooterGoal',
    props: {
        todos: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            todosLocal: (JSON.parse(JSON.stringify(this.todos))),
            showClearAll: false
        }
    },
    watch: {
        todos(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.todosLocal = (JSON.parse(JSON.stringify(this.todos)))
                this.checkClearAll()
            }
        }
    },
    mounted() {
        this.checkClearAll()
    },
    computed: {
        count() {   //contador de elementos que faltan para completar
            return (this.todosLocal.filter(element => { return element.completed === false })).length
        },
    },
    methods: {
        clearAll() {
            let todosDeleted = []
            this.todosLocal.forEach(element => {
                if (element.completed) {
                    Api.deleteTodo(element.id).then(response => {   //eliminamos el elemto de la BD
                        if (response) {     //si tiene exito actualizamos la lista de todos y el store
                            todosDeleted.push(element)
                        }
                    }).catch(error => {     //en caso de error de api, mostamos el error por pantalla
                        alert(error.message);
                    })
                }
            })
            this.$store.dispatch('todos')
        },
        checkClearAll() {
            if (this.todosLocal.find(element => element.completed === true)) {
                this.showClearAll = true
            } else {
                this.showClearAll = false
            }
        }
    }

}
</script>

<style>
</style>