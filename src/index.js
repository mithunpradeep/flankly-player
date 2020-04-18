import FMPlayer from "./FMPlayer";

(function(FMPlayer) {
  var myPlayer = new FMPlayer.player(
    document.querySelector("#app"),
    "https://s3.amazonaws.com/frankly-news-web/test/playlist.json"
  );
  myPlayer.init();
})(FMPlayer);
