<template>
  <modal name="login" transition="pop-out">
    <div class="box">
      <div class="auth-form">
        <form autocomplete="false">
          <div class="autocomplete-fix">
            <input type="password" disabled />
          </div>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div class="button-set">
            <button id="goto-login-btn" @click="logIn">Log in</button>
            <button id="sign-up-btn" @click="signUp">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  name: "login",
  methods: {
    logIn() {
      alert("Log in");
    },
    signUp() {
      alert("Sign up");
    }
  }
};
</script>

<style>
.box {
  background: white;
  overflow: hidden;
  width: 656px;
  height: 400px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;
  font-size: 0;
}
</style>