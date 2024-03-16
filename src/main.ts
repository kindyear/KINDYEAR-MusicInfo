/*
    @Author: KINDYEAR
    @Description: KINDYEAR Music Info
    @Date: 2024/3/16
    @Version: 1.0.2
*/

import {Config} from "./ui/config";

plugin.onConfig(() => {
    const element = document.createElement("div");
    ReactDOM.render(Config(), element);
    return element;
});

//  定义元素变量
let musicInfoTitle: string = null;
let musicInfoArtist: string = null;
let musicInfoCoverUrl: string = null;

let oldMusicInfoTitle: string = null;
let oldMusicInfoArtist: string = null;
let oldMusicInfoCoverUrl: string = null;

const dev = betterncm_native.fs.exists("plugins_dev/KINDYEAR-MusicInfo/");

plugin.onLoad(async () => {
    console.log("[KMI] KMI Loaded,Dev mode:", dev);
    legacyNativeCmder.appendRegisterCall("Load", "audioplayer", () => {
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
        observer.observe(document.body, {childList: true, subtree: true});
    });
});

async function saveMusicInfo(title: string, artist: string, coverUrl: string) {

    //  获取BetterNCM插件目录
    let dataPath = await betterncm.app.getDataPath();
    let pluginPath: string;
    let pluginLogMode: string;

    if (dev === true) {
        pluginLogMode = "DEV";
        pluginPath = `${dataPath}\\plugins_dev\\KINDYEAR-MusicInfo\\output`;
    } else {
        pluginLogMode = "RUNTIME";
        pluginPath = `${dataPath}\\plugins_runtime\\KINDYEAR-MusicInfo\\output`;
    }

    //  检查是否为null
    if (title === null || artist === null || coverUrl === null) {
        return;
    }
    //  检查是否为undefined
    if (title === undefined || artist === undefined || coverUrl === undefined) {
        return;
    }

    const coverDLUrl = coverUrl?.match(/https:\/\/[^/]+\/[^?]+/)?.[0];

    if (title !== oldMusicInfoTitle || artist !== oldMusicInfoArtist || coverDLUrl !== oldMusicInfoCoverUrl) {
        console.log(`[KMI][${pluginLogMode}] Info is different, start to save.`);

        //  更新比较变量
        oldMusicInfoTitle = title;
        oldMusicInfoArtist = artist;
        oldMusicInfoCoverUrl = coverDLUrl;

        // @ts-ignore
        const titleSaveResult = betterncm_native.fs.writeFileText(`${pluginPath}\\Title.txt`, `${title}`);
        // @ts-ignore
        const artistSaveResult = betterncm_native.fs.writeFileText(`${pluginPath}\\Artist.txt`, `${artist}`);

        const coverOutputPath = `${pluginPath}\\Cover.png`;
        const coverDeleteResult = await betterncm.app.exec(`powershell.exe rm "${coverOutputPath}\\Cover.png"`);
        console.log(`[KMI][${pluginLogMode}] Old Cover Delete Result: ${coverDeleteResult}`);

        const coverSaveResult = await betterncm.app.exec(`powershell.exe Invoke-WebRequest -Uri "${coverDLUrl}" -OutFile "${coverOutputPath}"`);

        console.log(`[KMI][${pluginLogMode}] Music Info: ${title} - ${artist} - ${coverDLUrl} .`);

        if (coverSaveResult === true) {
            //  打印保存情况
            console.log(`[KMI][${pluginLogMode}] Save Result: Title:${titleSaveResult} - Artist:${artistSaveResult} - Cover:${coverSaveResult}`);
        } else {
            console.error(`[KMI][${pluginLogMode}] Save Result: Title:${titleSaveResult} - Artist:${artistSaveResult} - Cover:${coverSaveResult}`);
        }
        return;

    } else {
        console.log(`[KMI][${pluginLogMode}] Info is same, no need to save.`);
        return;
    }
}

plugin.onAllPluginsLoaded(() => {
    // TODO 歌词加载插件
});
