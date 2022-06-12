<template>
    <div>
        <h1>{{ $t("TITLE") }}</h1>
        <input v-model="input" @keyup.enter="newTodo" id="inputTodos" focus type="text" :placeholder="$t('INPUT_TODO')"
            required class="new-todo">
    </div>
</template>

<script>
export default {
    name: 'HeaderGoal',
    data() {
        return {
            input: '',
        }
    },
    mounted() {
        this.autofocus()
    },
    methods: {
        autofocus() {    //focus input seleccionado al cargar la pagina
            document.getElementById('inputTodos').focus()
        },
        newTodo() { // crea un nuevo todo
            if (this.input === '') {
                alert(this.$t('EMPTY_INPUT'))
            } else {
                this.$emit('new', this.input)
                this.input = ''
            }
        },
    }
}
</script>

<style>
</style>