function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files, // FileList object.
    file_ext,
    ref,
    file_type,
    // get name, type, size
    output = [];

  for (var i = 0, f; f = files[i]; i++) {
    file_type = f.type;
    if (file_type === '') {
      ref = f.name.split('.');
      file_ext = ref[ref.length - 1];
      if (file_ext === 'json') {
        file_type = 'application/json';
      }
    }

    output.push(f.name, file_type, f.size);
  }

  //read file and send to server
  var fr = new FileReader();

  fr.readAsText(files[0]);

  fr.onload = function(e) {
    //console.log(e.target.result);

    var result = e.target.result;

    //var result = JSON.parse(e.target.result);

    var validatGeoJson = geojsonhint.hint(result);

    if (validatGeoJson.length > 0) {

      var message = validatGeoJson.map(function(error) {
        return 'Line ' + error.line + ': ' + error.message;
      });
      $('#error-header').show();
      $('#error-message').html(message);
    } else {
      var formatted = JSON.stringify(result, null, 2);
      console.log(result);

      $.ajax({
        type: 'POST',
        url: '/upload',
        json: true,
        data: {
          'fileName': output[0],
          'fileInput': result
        },
        success: function(data) {
          console.log(result);
          console.log('upload successful!');
        }
      });
    }
    document.getElementById('list').innerHTML = output.join(',<br> ');
  };
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  $("#drop_zone").css("background-color", '#AA0000');
}

function handleDragLeave(evt) {

  evt.stopPropagation();
  evt.preventDefault();
  $("#drop_zone").css("background-color", '');
}

function addInputToMap(result) {

}
