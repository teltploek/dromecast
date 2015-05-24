define(['facade', './view/picker'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});