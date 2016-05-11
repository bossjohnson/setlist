$(document).ready(function() {
    var $addToMasterList = $('#addToMasterList');
    $addToMasterList.hide();
    $('#addNewSong').hide();

    var masterList = JSON.parse(localStorage.getItem('masterList'));
    if (masterList === null) {
        masterList = [];
        localStorage.setItem('masterList', JSON.stringify(masterList));
    }
    populateMasterSongList(masterList);

    $('#masterList').click(function(e) {
        e.preventDefault();
        $addToMasterList.show();
    });

    $('#addSongToMasterList').click(function() {
        $('#addNewSong').show();
        $('#addNewSong').focus();
    });

    $('#closeMasterList').click(function() {
        $('#addToMasterList').hide();
    });

    $('#clearMasterList').click(function() {
        masterList = [];
        populateMasterSongList(masterList);
    });

    $('#addNewSong').keydown(function(key) {

        if (key.keyCode === 13) {
            var masterList = JSON.parse(localStorage.getItem('masterList'));
            masterList.push($('#addNewSong').val());
            localStorage.setItem('masterList', JSON.stringify(masterList));

            $('#addNewSong').val('');
            $('#addNewSong').hide();
            $('#masterSongList').empty();
            populateMasterSongList(masterList);
        } else if (key.keyCode === 27) {
            $('#addNewSong').val('');
            $('#addNewSong').hide();
        }
    });
});

function populateMasterSongList(list) {
    localStorage.setItem('masterList', JSON.stringify(list));
    $('#masterSongList').empty();
    for (var song of list) {
        $('#masterSongList').append($('<li>' + song + '</li>'));
    }
}
