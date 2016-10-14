export default {
    state: {
        alerts: []
    },

    addAlert: function(type, message, persist, timeout) {
        this.state.alerts.push({
            type: type,
            message: message,
            persist: persist || false,
            timeout: (timeout !== undefined) ? timeout : 3000
        });
    },

    removeAlert: function(alert) {
        const index = this.state.alerts.indexOf(alert);
        if (index > -1) {
            this.state.alerts.splice(index, 1);
        }
    },

    cleanAlerts: function() {
        this.state.alerts = this.state.alerts.filter((alert) => {
            return alert.persist === true;
        });
    }
}
