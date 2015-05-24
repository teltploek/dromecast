define(['facade', 'backbone'], 
function (facade, Backbone) {

	var AppState;

  var AppStateModel = Backbone.Model.extend({
    defaults : {
      
    }
  });

  AppState = AppState ? AppState : new AppStateModel();

  // facade.subscribe('some-event', function (someprop) {
  // 	AppState.set();
  // });

  return AppState;
});