import {Config} from "./ui/config";

plugin.onConfig(() => {
    const element = document.createElement("div");
    ReactDOM.render(Config(), element);
    return element;
});

console.log("[KMI] MutationObserver");

let musicInfoTitle:String = null;
let musicInfoArtist:String = null;
let musicInfoAlbum:String = null;
let musicInfoCoverUrl :String = null;

plugin.onLoad(async() => {
    console.log('[KMI] Start MutationObserver');
    new MutationObserver(() => {

        const titleElement:Element = document.querySelector("a.title");
        const artistElement:Element = document.querySelector("a.artist");
        //  const albumElement:Element = document.querySelector("a.f-thide.album");
        const coverElement:Element = document.querySelector("img.front.normal.j-cover");

        if (titleElement) {
            musicInfoTitle = titleElement.getAttribute("title");
        }
        if (artistElement) {
            musicInfoArtist = artistElement.textContent;
        }
        /*if (albumElement){
            musicInfoAlbum = albumElement.textContent;
        }*/
        if (coverElement){
            musicInfoCoverUrl = coverElement.getAttribute("src");
        }

        console.log(`[KMI] Music Info: ${musicInfoTitle} - ${musicInfoArtist} - ${musicInfoCoverUrl}`);
    }).observe(await betterncm.utils.waitForElement('.a.title'), {childList: true, subtree: true});
});
