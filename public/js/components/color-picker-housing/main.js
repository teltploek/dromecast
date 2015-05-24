define(['facade', './view/picker', './collection/colors'], function(facade, View, Colors) {
    return function (rootEl) {
        new View({
            el: rootEl,
            collection: Colors
        });
    };
});