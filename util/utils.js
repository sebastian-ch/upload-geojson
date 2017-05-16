function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    output.push(f.name, f.type, f.size);
  }

  document.getElementById('list').innerHTML = output; //.join('');

  var fr = new FileReader();

  fr.readAsText(files[0]);

  fr.onload = function(e) {
    //console.log(e);
    var result = JSON.parse(e.target.result);
    var formatted = JSON.stringify(result, null, 2);
    console.log(result);
    console.log('----------------------');
    console.log(e.target.result);
    console.log('----------------------');
    console.log(formatted);
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
