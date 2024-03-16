/*
    @Author: KINDYEAR
    @Description: KINDYEAR Music Info
    @Date: 2024/3/16
    @Version: 1.0.1
*/

import {Config} from "./ui/config";

plugin.onConfig(() => {
    const element = document.createElement("div");
    ReactDOM.render(Config(), element);
    return element;
});

//  定义元素变量
let musicInfoTitle:string = null;
let musicInfoArtist:string = null;
let musicInfoCoverUrl:string = null;

let oldMusicInfoTitle:string = null;
let oldMusicInfoArtist:string = null;
let oldMusicInfoCoverUrl:string = null;

const dev = betterncm_native.fs.exists('plugins_dev/KINDYEAR-MusicInfo/');

plugin.onLoad(async () => {
    console.log("[KMI] KMI Loaded,Dev mode:",dev);
    legacyNativeCmder.appendRegisterCall('Load','audioplayer',()=>{


        //  开始observer元素监听
        const observer = new MutationObserver(async () => {
            const titleElement = document.querySelector("a.title");
            const artistElement = document.querySelector("a.artist");
            const coverElement = document.querySelector("img.front.normal.j-cover");

            if (titleElement) {
                musicInfoTitle = titleElement.getAttribute("title");
            }
            if (artistElement) {
                musicInfoArtist = artistElement.textContent;
            }
            if (coverElement) {
                musicInfoCoverUrl = coverElement.getAttribute("src");
            }

            await saveMusicInfo(musicInfoTitle, musicInfoArtist, musicInfoCoverUrl);
        });

        const titleElement = document.querySelector("a.title.f-oh.j-title");
        if (titleElement) {
            observer.observe(document.body, {childList: true, subtree: true});
        } else {
            console.error("Title element not found!");
        }
    })

    //  等待页面加载完毕
    window.addEventListener("DOMContentLoaded", () => {

    });
});

function checkMusicInfo(title: string | null, artist: string | null, coverUrl: string | null) {
    // 检查音乐信息是否发生变化
    return title !== oldMusicInfoTitle || artist !== oldMusicInfoArtist || coverUrl !== oldMusicInfoCoverUrl;
}

async function saveMusicInfo(title: string | null, artist: string | null, coverUrl: string | null) {
    const imageUrl = coverUrl?.match(/https:\/\/[^/]+\/[^?]+/)?.[0];

    if (checkMusicInfo(title, artist, imageUrl)) {
        //  获取BetterNCM插件目录
        let dataPath = await betterncm.app.getDataPath();

        if(dev === true){
            // @ts-ignore
            const titleSaveResult = betterncm_native.fs.writeFileText(`${dataPath}\\plugins_dev\\KINDYEAR-MusicInfo\\output\\Title.txt`, `${title}`)
            // @ts-ignore
            const artistSaveResult = betterncm_native.fs.writeFileText(`${dataPath}\\plugins_dev\\KINDYEAR-MusicInfo\\output\\Artist.txt`, `${artist}`)
            const outputPath = `${dataPath}\\plugins_dev\\KINDYEAR-MusicInfo\\output\\Cover.png`;
            const coverSaveResult = await betterncm.app.exec(`powershell.exe Invoke-WebRequest -Uri "${imageUrl}" -OutFile "${outputPath}"`);

            if (coverSaveResult === true){
                //  打印保存情况
                console.log(`[KMI] Save Result: Title:${titleSaveResult} - Artist:${artistSaveResult} - Cover:${coverSaveResult}`);
            } else {
                console.error(`[KMI] Save Result: Title:${titleSaveResult} - Artist:${artistSaveResult} - Cover:${coverSaveResult}`);
            }
        }
        else{
            // @ts-ignore
            const titleSaveResult = betterncm_native.fs.writeFileText(`${dataPath}\\plugins_runtime\\KINDYEAR-MusicInfo\\output\\Title.txt`, `${title}`)
            // @ts-ignore
            const artistSaveResult = betterncm_native.fs.writeFileText(`${dataPath}\\plugins_runtime\\KINDYEAR-MusicInfo\\output\\Artist.txt`, `${artist}`)
            const outputPath = `${dataPath}\\plugins_runtime\\KINDYEAR-MusicInfo\\output\\Cover.png`;
            const coverSaveResult = await betterncm.app.exec(`powershell.exe Invoke-WebRequest -Uri "${imageUrl}" -OutFile "${outputPath}"`);

            console.log(`[KMI] Music Info: ${title} - ${artist} - ${imageUrl},info is different, save.`);

            if (coverSaveResult === true){
                //  打印保存情况
                console.log(`[KMI] Save Result: Title:${titleSaveResult} - Artist:${artistSaveResult} - Cover:${coverSaveResult}`);
            } else {
                console.error(`[KMI] Save Result: Title:${titleSaveResult} - Artist:${artistSaveResult} - Cover:${coverSaveResult}`);
            }
        }

        // 更新旧的音乐信息
        oldMusicInfoTitle = title;
        oldMusicInfoArtist = artist;
        oldMusicInfoCoverUrl = imageUrl;
    }
}

plugin.onAllPluginsLoaded(() => {
   // TODO 歌词加载插件
});
