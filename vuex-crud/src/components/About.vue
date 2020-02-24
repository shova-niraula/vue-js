<template>
    <div>
        <Header></Header>
        <h4 class="text-primary mt-3"> About</h4>
        <p> Simple CRUD designed using Vue, Bootstrap, Vuex and Vue route</p>
    </div>
</template>

<script>

    import Header from "./Header";

    export default {
        name: "About",
        created() {
            if (this.$store.state.isAuthenticated === false) {
                this.$router.push({name: 'login'})
            }
        },
        components: {Header},

    }
</script>

<style scoped>

</style>