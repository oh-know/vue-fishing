<template>
    <div class="userAgreeMent">
        <header-item title='渔乐家用户协议'></header-item>
        <div class="inner" v-html="agreement.content">
            {{agreement.content}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                agreement: ''
            }
        },
        mounted() {
            let param = new URLSearchParams()
            param.append('type', 'protocol')
            this.axios.post('http://yulejia.pnnnc.com/api/getinfo', param)
                .then(res => {
                    this.agreement = res.data.data;
                    console.log(this.agreement);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

</script>

<style lang="css" scoped>
    .userAgreeMent {
        width: 100%;
        height: 100%;
        padding: 0 .4rem;
    }

    .inner {
        margin-top:1.8rem;
    }
    .inner p{
        text-indent: 28px;
        font-size: 14px;
    }
</style>
