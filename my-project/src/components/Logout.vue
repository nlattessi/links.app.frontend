<script>
    export default {
        route: {
            activate: function (transition) {
                this.$dispatch('userLoggedOut');
                transition.redirect('/');
            }
        }
    }
</script>