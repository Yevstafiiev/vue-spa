<template>
  <v-app>
    <div class="korpus">
      <input type="radio" name="odin" checked="checked" id="vkl1"/><label for="vkl1">1 screen</label><input type="radio" name="odin" id="vkl2"/><label for="vkl2">2 screen</label><input type="radio" name="odin" id="vkl3"/>
      <div>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title class="title">
              <div>
                <h3 class="mat-h2 mb-0">Todo List</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <TodoItem v-for="(todo, index) in todos"
                        :key="index"
                        :todo="todo">
              </TodoItem>
              <InputField ref="inputFeild"></InputField>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="addTodo">Save Item</v-btn>
            </v-card-actions>
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

export default {
  name: 'App',
  components: {
    TodoItem,
    InputField
  },
  data () {
    return {
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    }
  },
  methods: {
    addTodo () {
      this.$refs.inputFeild.addTodo()
    }
  }
}
</script>

<style scoped>
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
