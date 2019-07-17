<template>
  <v-app>
    <div class="korpus">
      <input type="radio" name="odin" checked="checked" id="vkl1"/>
      <label for="vkl1">1 screen</label><input type="radio" name="odin" id="vkl2"/>
      <label for="vkl2">2 screen</label><input type="radio" name="odin" id="vkl3"/>
      <div>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title class="title">
              <div>
                <h3 class="mat-h2 mb-0">Todo List</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <draggable
                :list="todos"
                :disabled="!enabled"
                class="list-group"
                ghost-class="ghost"
                :move="checkMove"
                @start="dragging = true"
                @end="dragging = false"
              >
                <TodoItem v-for="(todo, index) in paginatedData"
                          :key="index"
                          :todo="todo"
                >
                </TodoItem>
              </draggable>
              <InputField ref="inputFeild"></InputField>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="addTodo">Save Item</v-btn>
            </v-card-actions>
            <paginate
              v-model="page"
              :page-count="pageCount"
              :click-handler="pageChangeHandler"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination'"
              :page-class="'waves-effect'"
            >
            </paginate>
          </v-card>
        </v-flex>
      </div>
      <div>white screen</div>
    </div>
  </v-app>
</template>

<script>
import TodoItem from './components/TodoItem'
import InputField from './components/InputField'
import draggable from "vuedraggable"
import _ from 'lodash'

export default {
  name: 'App',
  components: {
    TodoItem,
    InputField,
    draggable
  },
  data () {
    return {
      enabled: true,
      dragging: true,
      page: 1,
      pageSize: 10,
      allItems: [],
      items: []
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
    pageCount(){
      let l = this.todos.length,
          s = this.pageSize;
      return Math.ceil(l/s);
    },
    paginatedData(){
      const start = (this.page - 1) * this.pageSize,
            end = start + this.pageSize;
      return this.todos.slice(start, end);
    }
  },
  methods: {
    addTodo () {
      this.$refs.inputFeild.addTodo()
    },
    replace: function() {
      this.todos = [{ title: todo.title, id: id++ }];
    },
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
    pageChangeHandler (page) {
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      if (!localStorage.getItem('todoKey')) {
        for (var i = 1, arr = []; i < 101; i++) {
          this.todos.push({ 'title': 'title ' + i })
        }
        window.localStorage.setItem('todoKey', JSON.stringify(this.todos))
      }
    })
  }
}
</script>

<style scoped>
  @import '~materialize-css/dist/css/materialize.min.css';
  .title {
    display: flex;
    justify-content: center;
  }
  .korpus > div, .korpus > input { display: none; }

  .korpus label { padding: 5px; border: 1px solid #aaa; line-height: 28px; cursor: pointer; position: relative; bottom: 1px; background: #fff; }
  .korpus input[type="radio"]:checked + label { border-bottom: 2px solid #fff; }

  .korpus > input:nth-of-type(1):checked ~ div:nth-of-type(1),
  .korpus > input:nth-of-type(2):checked ~ div:nth-of-type(2) { display: block; padding: 35px; border-top: 1px solid #aaa; }
</style>
