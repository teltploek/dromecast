define(['facade', './view/accessorylist'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});