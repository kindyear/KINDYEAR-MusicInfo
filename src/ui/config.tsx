export function Config() {
    return (
        <div>
            <h1>KINDYEAR Music Info</h1>
            <p>本插件可以输出歌曲的名称、歌手名称至本地txt文件，封面保存为本地图片</p>
            <p>可在OBS等直播软件中读取本地文本或图片实现显示</p>
            <p>由于本插件使用了exec功能调用Windows本地的Wget程序下载图片，首次使用可能会弹出运行Wget的提示，请放心使用</p>
            <p>输出的信息目录为插件目录的plugins_runtime/KINDYEAR-MusicInfo/output</p>
        </div>
    );
}