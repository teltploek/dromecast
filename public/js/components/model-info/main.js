define(['facade', './view/description-block'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});