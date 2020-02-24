<template>
    <div v-show="!$store.getters.isAuthenticated" class="login">

        <form @submit.prevent="login">
            <div class="form-group">
                <label>Username</label>
                <input type="username"
                       id="input-username"
                       class="form-control" placeholder="Enter username" v-model="username">
                <small id="usernameHelp" class="form-text text-muted">We'll never share your username with anyone
                    else.</small>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="input-password" class="form-control" placeholder="Password"
                       v-model="password">
            </div>
            <button type="submit" class="btn btn-primary" style="margin-right: 20px">Submit</button>
            <button type="button" class="btn btn-primary" @click="register">Register</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        created() {
            if (localStorage.getItem('token')) {
                this.$store.state.token = localStorage.getItem('token');
                this.$store.state.isAuthenticated = true;
                this.$router.push({name: 'posts'})
            }
            if (this.$store.state.isAuthenticated === true) {
                this.$router.push({name: 'posts'})
            }
        },
        methods: {
            login: function (event) {
                event.preventDefault();
                this.$store.dispatch(('findUser'), {
                    username: this.username,
                    password: this.password
                }).then(() => {
                    this.$router.push({name: 'posts'})
                });
            },
            register: function () {
                this.$router.push({name: 'register'})
            }

        }
    }
</script>

<style scoped lang="scss">
    .login {
        margin: 30px;
    }
</style>