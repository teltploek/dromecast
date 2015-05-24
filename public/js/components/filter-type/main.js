define(['facade', './view/filter'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});