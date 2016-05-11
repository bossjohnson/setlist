$(document).ready(function() {
    var $addToMasterList = $('#addToMasterList');
    $addToMasterList.hide();
    $('#addNewSong').hide();
    $('#cancelAddSong').hide();

    var masterList = JSON.parse(localStorage.getItem('masterList'));
    if (masterList === null) {
        masterList = [];
        localStorage.setItem('masterList', JSON.stringify(masterList));
    }
    updateMasterSongList(masterList);

    $('#masterList').click(function(e) {
        e.preventDefault();
        $addToMasterList.show();
    });

    $('#addSongToMasterList').click(function() {
        $('#addNewSong').show();
        $('#cancelAddSong').show();
        $('#addNewSong').focus();
    });

    $('#cancelAddSong').click(function() {
      $(this).hide();
      $('#addNewSong').hide();
    });

    $('#closeMasterList').click(function() {
        $('#addToMasterList').hide();
    });

    $('#clearMasterList').click(function() {
        masterList = [];
        updateMasterSongList(masterList);
    });

    $('#addNewSong').keydown(function(key) {

        if (key.keyCode === 13) {
            var masterList = JSON.parse(localStorage.getItem('masterList'));
            masterList.push($('#addNewSong').val());
            localStorage.setItem('masterList', JSON.stringify(masterList));

            $('#addNewSong').val('');
            $('#addNewSong').hide();
            $('#cancelAddSong').hide();
            $('#masterSongList').empty();
            updateMasterSongList(masterList);
        } else if (key.keyCode === 27) {
            $('#addNewSong').val('');
            $('#addNewSong').hide();
            $('#cancelAddSong').hide();
        }
    });
});

function updateMasterSongList(list) {
    localStorage.setItem('masterList', JSON.stringify(list));
    $('#masterSongList').empty();
    for (var song of list) {
        $('#masterSongList').append($('<li>' + song + '</li>'));
    }
}
