var setSong = function(songNumber){
    if(arguments.length === 0 || arguments.length === undefined){
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
    }
    
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength){
    var template = 
        '<tr class="album-view-song-item">'
    +   '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber
    +   '   </td>'
    +   '   <td class="song-item-title">' + songName + '</td>'
    +   '   <td class="song-item-duration">' + songLength + '</td>'
    +   '</tr>'
    ;
    
    var $row = $(template);
    
    var clickHandler = function(){
    
        var songNum = parseInt($(this).attr('data-song-number'));
       
        if(currentlyPlayingSongNumber !== null){
            var currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingSongElement.html(currentlyPlayingSongNumber);
        }
        if(currentlyPlayingSongNumber !== songNum){
            $(this).html(pauseButtonTemplate);
            setSong(songNum);
            updatePlayerBarSong();
        }
        else if(currentlyPlayingSongNumber === songNum){
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            setSong();
        }
    };
    
    var onHover = function(event){
        
        var songNumCell = $(this).find('.song-item-number');
        var songNum = parseInt(songNumCell.attr('data-song-number'));
        
        if(songNum !== currentlyPlayingSongNumber){
            songNumCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function(event){
        var songNumCell = $(this).find('.song-item-number');
        var songNum = parseInt(songNumCell.attr('data-song-number'));
        
        if(songNum !== currentlyPlayingSongNumber){
            songNumCell.html(songNum);
        }
        console.log("songNumber type is " + typeof songNum + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};


var setCurrentAlbum = function(album){
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + '' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    
    for(var i=0; i<album.songs.length; i++){
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }  
};


var trackIndex = function(album, song){
    return album.songs.indexOf(song);
};

var nextSong = function(){
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
    
    if(currentSongIndex >= currentAlbum.songs.length){
        currentSongIndex = 0;
    }
    
    var previousSongNumber = currentlyPlayingSongNumber;
    
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    updatePlayerBarSong();
    
    var $newSongCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $prevSongCell = getSongNumberCell(previousSongNumber);
    
    $newSongCell.html(pauseButtonTemplate);
    $prevSongCell.html(previousSongNumber);
};

var previousSong = function(){
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    
    if(currentSongIndex < 0){
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    var previousSongNumber = currentlyPlayingSongNumber;
    
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    updatePlayerBarSong();
    
    var $newSongCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $prevSongCell = getSongNumberCell(previousSongNumber);
    
    $newSongCell.html(pauseButtonTemplate);
    $prevSongCell.html(previousSongNumber);
};

var updatePlayerBarSong = function(){
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-name').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum= null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');




$(document).ready(function(){
    setCurrentAlbum(albumPicasso);
    $nextButton.click(nextSong);
    $previousButton.click(previousSong);
    
});