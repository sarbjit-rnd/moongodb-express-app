<template>

  <section class="test-login">
    <h1>test-login Component</h1>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'test-login',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      
      facebookLogin(response) {
    // handle Facebook login success
  },
  facebookError(error) {
    // handle Facebook login error
  },
  googleLogin(response) {
    // handle Google login success
  },
  googleError(error) {
    // handle Google login error
  }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .test-login {

  }
</style>
