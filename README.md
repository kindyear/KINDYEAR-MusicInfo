
# KINDYEAR MusicInfo
本插件是一个基于BetterNCM的第三方插件

允许导出当前正在播放的歌曲信息至本地，包括歌曲名、歌手和封面图片

可用于OBS等软件直播用途

本插件依赖于BetterNCM网易云扩展加载器，请Github搜索安装，本插件目前暂不支持网易云音乐3.0版本

![](https://raw.githubusercontent.com/kindyear/KINDYEAR-MusicInfo/master/docs/20240316134528.png)

## 使用说明

歌曲播放时会保存歌曲名称，歌手名称和封面图片至``betterncm插件目录/plugins_runtime/KINDYEAR-MusicInfo/output``目录中
分别为``Title.txt``,``Artist.txt``和``Cover.png``

在OBS等软件中添加来源即可，需要特别说明的时，封面图片分辨率并不是恒定不变，为了防止画面因为封面的分辨率变化造成干扰，建议在OBS中对其添加缩放滤镜

![image-20240316135138021](https://raw.githubusercontent.com/kindyear/KINDYEAR-MusicInfo/master/docs/image-20240316135138021.png)

![image-20240316135315406](https://raw.githubusercontent.com/kindyear/KINDYEAR-MusicInfo/master/docs/image-20240316135315406.png)





