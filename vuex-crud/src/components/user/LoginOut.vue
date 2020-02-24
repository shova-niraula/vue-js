<template>
    <div>Successfully Logged Out</div>
</template>

<script>
    export default {
        name: "LoginOut",
        created() {
            this.$store.state.token = '';
            this.$store.state.isAuthenticated = false;
            localStorage.setItem('token', '');
            this.$router.push({name: 'login'})
        }
    }
</script>

<style scoped>

</style>