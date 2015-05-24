define(['facade', './view/modal'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});