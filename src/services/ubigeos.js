var ubigeosService = (function () {

    function getUbigeos() {
        var defer = $.Deferred();
        return $.get('/api/ubigeos')
            .then(function (response) {
                return defer.resolve(response);
            })
            .catch(function (err) {
                return defer.reject(err);
            });
    }
    return {
        getUbigeos: getUbigeos
    }
})();

module.exports = ubigeosService;