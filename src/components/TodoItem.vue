<template>
  <draggable
        :list="list"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
  >
    <v-layout sm6 align-start justify-space-between row sm10>
      <v-flex align-center xs10>
        <v-textarea :value = "title"
                    ref = "input"
                    v-bind:class = "[todo.done ? 'is-done' : '']"
                    @blur = "editingCompleted"
                    @keydown.enter.prevent = "editingCompleted"
                    @dblclick= "edit"
                    :readonly = "isReadOnly"
                    solo
                    :rules="[rules.minLength]"
                    :rows = "1"
                    auto-grow>
        </v-textarea>
      </v-flex>
      <v-layout row>
        <v-btn icon @click="edit()">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon @click="deleteTodo(todo)">
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </v-layout>
    </v-layout>
  </draggable>
</template>

<script>
  import { mapActions } from 'vuex'
  import draggable from "vuedraggable"
  
  const MIN_LENGTH_VALIDATION = 3

  export default {
    name: 'TodoItem',
    props: ['todo'],
    components: {
      draggable
    },
    data () {
      return {
        pageNumber: 0,
        isReadOnly: true,
        rules: {
          minLength: value => {
            return (value.length >= MIN_LENGTH_VALIDATION) || `Required having at least ${MIN_LENGTH_VALIDATION} characters.`
          }
        }
      }
    },
    props:{
      todo:{
        type:Array,
        required:true
      },
      size:{
        type:Number,
        required:false,
        default: 10
      }
    },
    computed: {
      title () {
        return this.todo.title
      },
      draggingInfo() {
        return this.dragging ? "under drag" : "";
      }
    },
    methods: {
      ...mapActions([
        'editTodo',
        'deleteTodo'
      ]),
      edit () {
        this.isReadOnly = this.todo.done
        this.$refs.input.focus()
      },
      editingCompleted (e) {
        const newTitle = e.target.value
        const validation = (newTitle.length >= MIN_LENGTH_VALIDATION)

        if (!this.isReadOnly && validation) {
          this.editTodo({ todo: this.todo, title: newTitle })
          this.isReadOnly = true
        }
      },
      replace: function() {
        this.todo = [{ title: todo.title, id: id++ }];
      },
      checkMove: function(e) {
        window.console.log("Future index: " + e.draggedContext.futureIndex);
      }
    }
  }
</script>

<style>
.is-done {
  text-decoration: line-through;
}
</style>
