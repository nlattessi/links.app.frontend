// import EventEmmiter from 'events';

// class Store extends EventEmmiter {
//     constructor () {
//         super();
//     }
// }

// export default new Store();
import Vue from 'vue';
import auth from '../auth';

export default {
    state: {
        categories: null
    },

    getCategories: function () {
        // console.log('getCategories')
        Vue.http.get(process.env.API_URL_CATEGORIES, { headers: auth.getAuthHeader() })
            .then((response) => {
                this.state.categories = response.body.data
                console.log(this.state.categories);
            }, (response) => {
                this.state.categories = null;
            });
    }
}