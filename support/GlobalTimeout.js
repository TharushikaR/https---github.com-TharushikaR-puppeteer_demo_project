function setGlobalTimeout(timeout) {
    before(function () {
        this.timeout(timeout);
    });
}

export default setGlobalTimeout;