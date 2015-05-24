define(['facade', './view/title-block'], function(facade, View) {
    return function (rootEl) {
        new View({
            el: rootEl
        });
    };
});