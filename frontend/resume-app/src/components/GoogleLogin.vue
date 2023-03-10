<template>

  <section class="google-login">
    <GoogleLogin :callback="callback"/>
  </section>
</template>

<script>
const callback = (response) => {
  console.log("Handle the response", response)
}
  export default  {
    name: 'google-login',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .google-login {

  }
</style>
