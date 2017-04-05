var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs:[
        {title: 'Blue', duration: '4:26'},
        {title: 'Green', duration: '3:14'},
        {title: 'Red', duration: '5:01'},
        {title: 'Pink', duration: '3:21'},
        {title: 'Magenta', duration: '2:15'}
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielo Marconi',
    label: 'EM',
    year: '1990',
    albumArtUrl: 'assets/images/album_covers/02.png',
    songs:[
        {title: 'Hello, Operator?', duration: '1:01'},
        {title: 'Ring, ring, ring', duration: '5:01'},
        {title: 'Fits in you pocket', duration: '3:21'},
        {title: 'Can you hear me now?', duration: '3:14'},
        {title: 'Wrong phone number', duration: '2:15'}
    ]
};

var albumNarcos = {
    title: 'Pablo Escobar',
    artist: 'Pablo Escobar',
    label: 'Narcos Productions',
    year: '2017',
    albumArtUrl: 'assets/images/album_covers/03.png',
    songs:[
        {title: 'The high', duration: '1:01'},
        {title: 'White heaven', duration: '5:01'},
        {title: 'Powder king', duration: '3:21'},
        {title: 'What', duration: '3:14'},
        {title: 'Wrong number', duration: '2:15'}
    ]
};

var createSongRow= function(songNumber, songName, songLength){
    var template = 
        '<tr class="album-view-song-item">'
    +   '   <td class="song-item-number">' + songNumber + '</td>'
    +   '   <td class="song-item-title">' + songName + '</td>'
    +   '   <td class="song-item-duration">' + songLength + '</td>'
    +   '</tr>'
    ;
    
    return template;
}

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumRelaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album){
    
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumRelaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    albumSongList.innerHTML = '';
    
    for(var i=0; i<album.songs.length; i++){
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

window.onload = function(){
    setCurrentAlbum(albumPicasso);

    var albumsList = [albumPicasso, albumMarconi, albumNarcos];
    var index = 1;

    albumImage.addEventListener("click", function(event){
        setCurrentAlbum(albumsList[index]);
        index ++;
        if(index == albumsList.length){
        index = 0;
        }
    });
};