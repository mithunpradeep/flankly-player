# Frankly-Player

Frankly-Player is a library to embed a video player in customer website and load videos that are hosted in FranklyMedia.

## Getting Started

To embed this player in 3rd part site, import "FMPlayer" module in your site.

```javascript
import FMPlayer from "./FMPlayer";
```

### Usage

FMPlayer can be created by calling the `player()` methiod. This method takes in two arguments and reutuns a `player` object

1. A html element on to where the player has to be embedded.
2. Playlist URL - URL to fetch frankly playlist data.

Once the player object is created, player can be instantiated by calling `init()` method.

Example:

```javascript
var myPlayer = new FMPlayer.player(
  document.querySelector("#app"),
  "https://s3.amazonaws.com/frankly-news-web/test/playlist.json"
);
myPlayer.init();
```

In the above example, FMPlayer is created, instantiated and attached to an element in HTML.

# Major concepts used

1. Modular design pattern.
2. Event Delegation.
3. Throttling.
4. Asynchronus programming using async/await and fetch.
5. Reponsive website using flexbox and media query.
