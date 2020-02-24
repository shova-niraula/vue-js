<template>
    <div v-show="!$store.getters.isAuthenticated">
        <form @submit.prevent="login">
            <div class="form-group">
                <label>Username</label>
                <input type="username"
                       class="form-control" placeholder="Enter username" v-model="username">
                <small id="usernameHelp" class="form-text text-muted">We'll never share your username with anyone
                    else.</small>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="password">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-right: 20px">Submit</button>
            <button type="button" class="btn btn-primary">Register</button>
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
            alert(this.$store.state.isAuthenticated)
            if (this.$store.state.isAuthenticated === true) {
                this.$router.push({name: 'posts'})
            }
        },
        methods: {
            login: function () {
                this.$store.dispatch(('findUser'), {
                    username: this.username,
                    password: this.password
                });
            }

        }
    }
</script>

<style scoped>

</style>