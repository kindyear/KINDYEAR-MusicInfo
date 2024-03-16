
# KINDYEAR MusicInfo
本插件是一个基于BetterNCM的第三方插件

允许导出当前正在播放的歌曲信息至本地，包括歌曲名、歌手和封面图片

可用于OBS等软件直播用途

本插件依赖于BetterNCM网易云扩展加载器，请Github搜索安装，本插件目前暂不支持网易云音乐3.0版本

![](https://img.kindyear.cn/images/2024/03/16/20240316134528.png)

## 使用说明

歌曲播放时会保存歌曲名称，歌手名称和封面图片至``betterncm插件目录/plugins_runtime/KINDYEAR-MusicInfo/output``目录中
分别为``Title.txt``,``Artist.txt``和``Cover.png``

由于本插件使用了exec功能调用Windows本地的Wget程序来下载封面，首次运行时可能会弹出是否允许Wget运行的弹窗，请放心使用

在OBS等软件中添加来源即可，需要特别说明的时，封面图片分辨率并不是恒定不变，为了防止画面因为封面的分辨率变化造成干扰，建议在OBS中对其添加缩放滤镜

![image-20240316135138021](https://img.kindyear.cn/images/2024/03/16/image-20240316135138021.png)![image-20240316135315406](https://img.kindyear.cn/images/2024/03/16/image-20240316135315406.png)





