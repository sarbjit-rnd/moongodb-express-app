<template>

  <section class="pages-users">
    <div>
    <h1>Users List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }} <p> {{ user.email }}</p></li>
    </ul>
  </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'pages-users',
    props: [],
    mounted () {
      this.fetchUsers();
    },
    data () {
      return {
        users: [],
      }
    },
    methods: {
      async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error(error);
      }
    },

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .pages-users {

  }
</style>
