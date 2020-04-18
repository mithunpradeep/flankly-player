var FMPlayer = {};

(function(FMPlayer) {
  function player(rootElm, playlistLink) {
    var rootElement = rootElm;
    var playlistURL = playlistLink;
    var playlist = [];
    var selectedVideoId = -1;
    // var isPlaying = false;
    // var self = this;
    this.init = function() {
      initialize();
    };

    async function initialize() {
      var rootTemplate = createPlayerContainer();
      rootElement.appendChild(rootTemplate);
      await getPlaylist();
      var playListTemplate = createPlaylistContainer(playlist);
      document.querySelector("#playlist").appendChild(playListTemplate);
      var playerTemplate = createPlayer(playlist[0]);
      document.querySelector("#player").appendChild(playerTemplate);
      var video = document.querySelector("video");
      video.pause();
      attachEvents();
    }

    async function getPlaylist() {
      playlist = await fetch(playlistURL, {
        method: "GET",
        mode: "cors"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          return data["playlist"];
        });
    }

    function createPlayerContainer() {
      var template =
        '<div id="FMPlayer">' +
        '<div id="player"></div>' +
        '<div id="playlist"></div>' +
        "</div>";
      return FMPlayer.toHTML(template);
    }

    function createPlayer(toPlay) {
      var playerContainer = document.querySelector("#player");
      while (playerContainer.firstChild) {
        playerContainer.firstChild.remove();
      }
      var contentUrl = toPlay.content_url;
      var title = toPlay.title;
      var autoplay = "autoplay";
      selectedVideoId = toPlay.platform_id;
      var template =
        '<div class="video_player">' +
        "<video controls " +
        autoplay +
        ">" +
        '<source src="' +
        contentUrl +
        '" type="video/mp4">' +
        "</video>" +
        "<h3>" +
        title +
        "</h3>" +
        "</div>";
      highLight(toPlay.platform_id);
      return FMPlayer.toHTML(template);
    }

    function createPlaylistContainer(playlist) {
      var playlistContainer = document.querySelector("#playlist");
      while (playlistContainer.firstChild) {
        playlistContainer.firstChild.remove();
      }
      var template = '<div class="video_playlist">';
      var imgSize = window.innerWidth > 768 ? 150 : 100;
      for (var video of playlist) {
        template +=
          '<div id="' +
          video.platform_id +
          '" class="video">' +
          '<img src="' +
          video.image_url +
          "?width=" +
          imgSize +
          '"/>' +
          "<h6 class='title'>" +
          video.title +
          "</h6>" +
          "</div>";
      }
      template += "</div>";
      return FMPlayer.toHTML(template);
    }

    function highLight(id) {
      var currentHighLight = document.querySelector(".highlight");
      if (currentHighLight) {
        currentHighLight.classList.remove("highlight");
      }
      var selectedVideo = document.getElementById(id);
      selectedVideo.classList.add("highlight");
    }

    function attachEvents() {
      var selectPlaylistHandler = document.querySelector(".video_playlist");
      selectPlaylistHandler.addEventListener("click", handlePlay);
      var videoPlayer = document.querySelector(".video_player").firstChild;
      videoPlayer.addEventListener("ended", loadNextVideo);
    }

    function handlePlay(event) {
      var selectedVideo = event.target.parentElement;
      if (selectedVideo.classList.contains("highlight")) {
        event.stopPropagation();
      } else {
        var videoId = selectedVideo.id;
        highLight(videoId);
        loadVideo(videoId);
      }
    }

    function loadVideo(id) {
      var toPlay = playlist.filter(function(play) {
        return play.platform_id == id;
      });
      selectedVideoId = toPlay[0].platform_id;
      var contentUrl = toPlay[0].content_url;
      var player = document.querySelector(".video_player").firstChild;
      var title = document.querySelector(".video_player").lastChild;
      // title.innerHTML = "";
      title.innerHTML = toPlay[0].title;
      player.firstChild.remove();
      var source = document.createElement("source");
      player.appendChild(source);
      source.setAttribute("src", contentUrl);
      player.load();
      player.play();
    }

    function loadNextVideo() {
      var index = playlist.findIndex(function(play) {
        return play.platform_id == selectedVideoId;
      });
      if (index === playlist.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
      highLight(playlist[index].platform_id);
      loadVideo(playlist[index].platform_id);
    }
  }

  FMPlayer.toHTML = function(template) {
    var templateHolder = document.createElement("div");
    templateHolder.innerHTML = template;
    return templateHolder.firstChild;
  };
  FMPlayer.player = player;
})(FMPlayer);

export default FMPlayer;
