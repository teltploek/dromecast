define(['facade', './view/picture'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});