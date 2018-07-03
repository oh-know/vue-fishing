<template>
    <div class="navgation">
        <!-- 接收到位置信息后 通过 iframe 嵌入位置标注组件 -->
        <iframe id="markPage" width="100%" height="100%" frameborder="0" scrolling="no" src="http://apis.map.qq.com/tools/poimarker?marker=coord:undefined,undefined;title:我的位置;addr:undefined&amp;referer=myapp&amp;key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"></iframe>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                city: '',
                addr: '',
                lat: '',
                lng: ''
            }
        },
        mounted() {
            window.addEventListener('message', function (event) {
                // 接收位置信息
                /*console.log(event);
                var loc = event.data;*/

                var loc = {
                    "module": "geolocation",
                    "name": "鹏创钓场",
                    "city": "深圳市",
                    "addr": "深圳大学杜鹃山(白石路北250米)",
                    "lat": '22.530001',  // 纬度 [火星坐标(gcj02)，腾讯、Google、高德通用]
                    "lng": '113.935364', //经度
                    "accuracy": 13     //误差范围，以米为单位
                }
                var markUrl = 'http://apis.map.qq.com/tools/poimarker?marker=coord:' + loc.lat + ',' + loc.lng + ';title:钓场：鹏创钓场;addr:' + (loc.addr || loc.city) + '&referer=myapp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77';

                document.getElementById('markPage').src = markUrl;
            }, false);
        }
    }

</script>

<style lang="css" scoped>
    body {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    #map-info {
        display: none;
    }

    .navgation {
        width: 100%;
        height: 18rem;
    }
</style>
