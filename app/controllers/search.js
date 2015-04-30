var express = require('express'),
  _ = require('lodash'),
  request = require('request'),
  Q = require('q'),
  router = express.Router();

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/search', function (req, res, next) {
  // build the url for the search query
  var url = 'https://www.dr.dk/mu/search/programcard?FreeText="'+req.query.query+'"';

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);

      // filter for entries that has the 'Assets'-key wherein there is at least one VideoResource.
      var filtered = _.filter(json.Data, function(result){
        if (result.Assets && 
            result.Assets.length && 
            typeof _.findWhere(result.Assets, { 'Kind': 'VideoResource' } !== 'undefined')
          ) {
          return result; 
        }
      });

      // Now we need to build our own data objects with the data that we're 
      // interested in. Also we need to fetch the video uris for the videoresource
      // assets. They're located at another address, so we need to fetch them.
      var buildDataObjects = function () {
        var fulfilled;
        var deferreds = [];

        _.forEach(filtered, function(result) {
          _.forEach(result.Assets, function(asset) {
            if (asset.Kind !== 'VideoResource') return;

            var deferred = Q.defer();

            // if there's an image for this entry, we should get the uri for it
            var imgUrl = _.findWhere(result.Assets, { 'Kind' : 'Image' });

            if (imgUrl) {
              imgUrl = imgUrl.Uri;
            }
      
            request({
                url : asset.Uri
            }, function(error, response, body) {
              var json = JSON.parse(body);
              
              // we need to get the link where target says HLS
              var hdsObj = _.findWhere(json.Links, { 'Target' : 'HLS' });

              // and this is where we build the object with the data we're interested in
              deferred.resolve({
                CreatedTime: result.CreatedTime,
                Title: result.Title,
                Description: result.Description,
                ImageUrl : imgUrl,
                Slug: result.Slug,
                CastUrl: hdsObj.Uri
              });
            });
            
            deferreds.push(deferred.promise);
          });
        });

        return Q.all(deferreds);
      }

      // now all we need to do is wait for all our fetching
      Q.fcall( buildDataObjects ).then(function(data) {
        // so let's sort for created time by descending order
        var data = _.sortByOrder(data, 'CreatedTime', false);

        // and make sure that we only have unique entries
        data = _.uniq(data, 'Title');

        // and present them for our caller
        res.json(data);
      }).catch(function (error) {
        console.log(error);
      }).done();

    }
  });

});