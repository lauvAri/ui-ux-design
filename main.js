new Vue({
    el: '#app',
    data() {
        return {
            visible: true,
            currentMenu: '',
            currentView: '',
        }
    },
    methods : {
        toggleView(view) {
            console.log('toggleView', view);
            this.currentView = view;
        }
    },
})