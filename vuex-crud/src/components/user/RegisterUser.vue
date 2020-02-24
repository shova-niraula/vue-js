<template>
    <div class="register">
        <form @submit.prevent="register">
            <div class="form-group">
                <label>Enter your username</label>
                <input type="username"
                       id="input-username"
                       class="form-control" placeholder="Enter username" v-model="username">
                <small id="usernameHelp" class="form-text text-muted">We'll never share your username with anyone
                    else.</small>
            </div>
            <div class="form-group">
                <label>Enter your password</label>
                <input type="password" id="input-password" class="form-control" placeholder="Password"
                       v-model="password">
            </div>
            <div class="form-group">
                <label>Enter your password again</label>
                <input type="password" id="input-password-again" class="form-control" placeholder="Password"
                       v-model="password_again">
            </div>
            <button type="submit" class="btn btn-primary" style="margin-right: 20px">Register</button>
            <button type="reset" class="btn btn-primary">Reset</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "RegisterUser",
        data() {
            return {
                username: '',
                password: '',
                password_again: ''
            }
        },
        methods: {
            register: function () {


            }
        }
    }
</script>

<style scoped>
    .register {
        margin: 30px;
    }
</style>