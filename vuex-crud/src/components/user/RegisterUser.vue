<template>
    <div class="register">
        <div v-if="errors.length" class="error-div">
            <b>Please correct the following errors</b>
            <ul>
                <li :key="error.id" v-for="error in errors" class="error.id">{{error.text}}</li>
            </ul>
        </div>
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
            <button type="reset" class="btn btn-primary" @click="reset">Reset</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "RegisterUser",
        data() {
            return {
                errors: [],
                username: '',
                password: '',
                password_again: ''
            }
        },
        watch: {},
        computed: {},
        methods: {
            register: function (event) {
                this.validateForm();
                if (this.errors.length !== 0) {
                    return false;
                }
                this.$store.dispatch(('addUser'), {
                    username: this.username,
                    password: this.password
                });
                this.username = '';
                this.password = '';
                event.preventDefault();
            },
            reset: () => {
                this.errors = [];
                this.username = '';
                this.password = '';
                this.password_again = '';
            },
            validateForm: function () {
                this.errors = [];
                if (!this.username) {
                    this.errors.push({id: 'error1', text: 'Name required.'});
                }
                if (!this.password) {
                    this.errors.push({id: 'error2', text: 'Password required.'});
                }

                if (!this.password_again) {
                    this.errors.push({id: 'error3', text: 'Second password is also require.'});
                }
                if (this.password != this.password_again) {
                    this.errors.push({id: 'error4', text: 'Password did not match'});
                }
            }
        }
    }
</script>

<style scoped>
    .register {
        margin: 30px;
    }

    .error-div ul li {
        color: red;
    }
</style>