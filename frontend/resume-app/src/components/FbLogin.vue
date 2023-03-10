<template>

<div class="signup-buttons">
    <div id="fb-root"></div>
    <a href="#" class="facebook-signup" @click.prevent="loginWithFacebook">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#3578E5"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
      Facebook
    </a>
  </div>
</template>

<script lang="js">
import { initFbsdk } from '../../config/fb'
export default {
  name: 'fb-login',
  props: [],
  mounted() {
    initFbsdk()
  },
  data() {
    return {

    }
  },
  methods: {
    getUserData() {

    },
    onLogout() {

    },
    loginWithFacebook() {
      window.FB.login(response => {
        console.log('fb response', response)
      }, this.params)
    }
  },
  computed: {

  }
}


</script>

<style scoped lang="css">
.fb-login {}
</style>
