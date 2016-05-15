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
    var setLists = JSON.parse(localStorage.getItem('setLists'));
    if (setLists === null) {
        setLists = {};
        localStorage.setItem('setLists', JSON.stringify(setLists));
    }
    updateMasterSongList(masterList);
    updateSetLists();

    $('#masterList').click(function(e) {
        e.preventDefault();
        $addToMasterList.show();
    });

    $('#newSetList').click(function() {
        $('#newSetListScreen').show();
        $('#newSetListName').focus();
        $('#newSetListName').val('');
        $('#songsSelected').children().first().text('New Setlist');
        $('#songsSelected ol').empty();
        var masterList = JSON.parse(localStorage.getItem('masterList'));
        $('#songsAvailable ul').empty();
        for (var song of masterList) {
            var $songLi = $('<li>' + song + '</li>')
            $('#songsAvailable ul').append($songLi);
        }
        $('#songsAvailable ul li').click(function() {
            // console.log(!$(this).selected);

            if (!$(this).attr('selected')) {
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
        var masterList = JSON.parse(localStorage.getItem('masterList'));
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
        var setLists = JSON.parse(localStorage.getItem('setLists'));
        var listName = $('#newSetListName').text();
        var newList = [];
        var $songs = $('#songsSelected ol').children();
        var listLength = $('#songsSelected ol').children().length;
        for (var i = 0; i < listLength; i++) {
            newList.push($songs[i].innerText);
        }
        setLists[listName] = newList;
        localStorage.setItem('setLists', JSON.stringify(setLists));
        $('#newSetListName').val('');
        $('#newSetListScreen').hide();
        updateSetLists();
    });

    $('#setLists li').click(handleSetListClick);
    $('#deleteThisList').click(function() {
        var setLists = JSON.parse(localStorage.getItem('setLists'));
        delete setLists[$(this).prev().text()];
        localStorage.setItem('setLists', JSON.stringify(setLists));
        $('#songsWrapper').empty();
        $('#songsHeader span').empty();
        $(this).hide();
        $('#editThisList').hide();
        updateSetLists();
    });

    $('#hideNav').click(function () {
      $('nav').hide();
      $('#showNav').show();
      // $('#songs').css('width', '100%');
    });

    $('#showNav').click(function () {
      $('nav').show();
      $(this).hide();
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

function updateSetLists() {
    var setLists = JSON.parse(localStorage.getItem('setLists'));
    $('#setLists ul').empty();
    for (var setList in setLists) {
        $('#setLists ul').append($('<li>' + setList + '</li>'));
    }
    $('#setLists li').click(handleSetListClick);
}

function handleSetListClick() {
    $('#editThisList').show();
    $('#deleteThisList').show();
    $('.save').remove();
    var setListName = $(this).text();
    var setLists = JSON.parse(localStorage.getItem('setLists'));
    $('#songsHeader span').empty();
    $('#songsHeader span').append(setListName);

    $('#songsWrapper').empty();
    $('#songsWrapper').append($('<hr><div class="smallText">tap songs to toggle strikethrough</div><ol></ol>'));
    for (var song of setLists[setListName]) {
        $('#songs ol').append($('<li>' + song + '</li>'));
    }
    $('#songsWrapper li').click(function() {
        $(this).toggleClass('strikeThrough');
    });

    $('#editThisList').off('click');
    $('#editThisList').click(editList);
}

function editList() {
    $(this).off('click');
    $('#songsWrapper .smallText').hide();
    $('#songsWrapper li').off('click');
    $('#songsWrapper li').removeClass('strikeThrough');
    var $saveThisList = $('<button class="save fa fa-save"></button>');
    $(this).after($saveThisList);

    $('.save').click(function() {

        $('#songsWrapper .smallText').show();
        $('.setListEditControls').remove();
        $('#songsWrapper li').css('border', 'none');
        $('#songsWrapper li').click(function() {
            $(this).toggleClass('strikeThrough');
        });

        var setLists = JSON.parse(localStorage.getItem('setLists'));
        var setListName = $('#songsHeader span').text();
        var $songs = $('#songsWrapper ol').children();
        var newList = [];


        for (var i = 0; i < $songs.length; i++) {
            newList.push($songs[i].innerText);
        }
        console.log(newList);
        setLists[setListName] = newList;
        localStorage.setItem('setLists', JSON.stringify(setLists));



        $('#editThisList').click(editList);
        $(this).remove();
    });

    $('#songsWrapper li').css({
        'border': '6px outset gray',
        'border-radius': '8px'
    });
    var $controlDiv = $('<div class="setListEditControls"></div>')
    var $removeSong = $('<button class="removeSong fa fa-times-circle-o"></button>');
    var $moveSongUp = $('<button class="moveSongUp fa fa-arrow-circle-o-up"></button>')
    var $moveSongDown = $('<button class="moveSongDown fa fa-arrow-circle-o-down"></button>')

    $('#songsWrapper li').append($controlDiv);
    $('.setListEditControls').append($moveSongUp);
    $('.setListEditControls').append($moveSongDown);
    $('.setListEditControls').append($removeSong);

    $('#songsWrapper .removeSong').click(function() {
        $(this).parent().parent().remove();
    });
    $('#songsWrapper .moveSongUp').click(function (e) {
      e.stopPropagation();
      $(this).parent().parent().prev().before($(this).parent().parent());
    });
    $('#songsWrapper .moveSongDown').click(function (e) {
      e.stopPropagation();
      $(this).parent().parent().next().after($(this).parent().parent());
    });
}

function saveEditedList() {

}
