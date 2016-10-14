export default {
    client: null,

    init() {
        gapi.load('auth2', () => {
            this.client = gapi.auth2.init({
                client_id: '367309930083-53pu80b66ua3jro4fdu0tv8cvsqceqhs.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
            });
        });
    }
}
