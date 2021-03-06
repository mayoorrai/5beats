'use strict';

angular.module('5BeatsApp')
  .controller('UploadCtrl', ['$scope', 'Songs', function ($scope, Songs) {
    $scope.message = 'Hello';
    
    $scope.fileNameChanged = function() {
            console.log("*********");
        
        var file = $('input[type="file"]')[0].files[0];
        
          var reader = new FileReader();

          reader.onload = function(e) {
            var dv = new jDataView(this.result);

            // "TAG" starts at byte -128 from EOF.
            // See http://en.wikipedia.org/wiki/ID3
            if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
              var title = dv.getString(30, dv.tell());
                console.log(title);
              var artist = dv.getString(30, dv.tell());
              var album = dv.getString(30, dv.tell());
              var year = dv.getString(4, dv.tell());
                
                var songURL = "media/music/" + file.name;
                // Post new upload to database
                Songs.postUpload(songURL, title, artist, "554e5dc1ffc17f2666ba527b", true).success(function(data){
                    console.log(data.message);
                })
                .error(function(data){
                    console.log(data.message);
                });
                
            } else {
              // no ID3v1 data found.
            }
          };

          reader.readAsArrayBuffer(file);
        };
  }]);