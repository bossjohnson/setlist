$(document).ready(function() {
    var $addToMasterList = $('#addToMasterList');
    $addToMasterList.hide();
    $('#addNewSong').hide();
    $('#cancelAddSong').hide();
    $('#newSetListScreen').hide();

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

    $('#newSetList').click(function() {
        $('#newSetListScreen').show();
        $('#newSetListName').focus();
        $('#newSetListName').val('');
        $('#songsSelected').children().first().text('New Setlist');
        $('#songsSelected ul').empty();
        var masterList = JSON.parse(localStorage.getItem('masterList'));
        $('#songsAvailable ul').empty();
        for (var song of masterList) {
            var $songLi = $('<li>' + song + '</li>')
            $('#songsAvailable ul').append($songLi);
        }
        $('#songsAvailable ul li').click(function() {
            // console.log(!$(this).selected);

            if (!$(this).attr('selected')) {
                console.log($(this).attr('selected'));
                $(this).attr('selected', 'true');
                $('#songsSelected ol').append($(this));
            } else {
                $(this).removeAttr('selected');
                $('#songsAvailable ul').append($(this));
            }
        });

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

    $('.goHome').click(function() {
        $('#addToMasterList').hide();
        $('#newSetListScreen').hide();
    });

    $('#clearMasterList').click(function() {
        masterList = [];
        updateMasterSongList(masterList);
    });

    $('.removeSong').click(function() {
        var songName = $(this).parent().text();
        var index = masterList.indexOf(songName);
        masterList.splice(index, 1);
        localStorage.setItem('masterList', JSON.stringify(masterList));
        $(this).parent().remove();
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

    $('#newSetListName').change(function() {
        $('#songsSelected').children().first('span').text($(this).val());
        $(this).blur();
    });

    $('#saveNewList').click(function() {
        console.log('save playlist');

        $('#newSetListName').val('');
        $('#newSetListScreen').hide();
    });

});

function updateMasterSongList(list) {

    localStorage.setItem('masterList', JSON.stringify(list));
    $('#masterSongList').empty();
    for (var song of list) {
        $('#masterSongList').append($('<li>' + song + '<button class="removeSong fa fa-times-circle-o"></button></li>'));
    }
    $('.removeSong').click(function() {
        var songName = $(this).parent().text();
        var index = list.indexOf(songName);
        list.splice(index, 1);
        localStorage.setItem('masterList', JSON.stringify(list));
        $(this).parent().remove();
    });
}
