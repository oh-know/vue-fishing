const state = {
  fans_list: [
    {
      id: 0,
      nick: '领跑者',
      attentions: 555,
      fans: 580,
      src: './static/images/list01.jpg',
      sex: '男',
      sex_src: './static/images/male.jpg'
    },
    {
      id: 1,
      nick: '鱼',
      attentions: 343,
      fans: 560,
      src: './static/images/list02.jpg',
      sex: '女',
      sex_src: './static/images/female.jpg'
    },
    {
      id: 2,
      nick: '嗨嗨',
      attentions: 78,
      fans: 780,
      src: './static/images/list03.jpg',
      sex: '女',
      sex_src: './static/images/female.jpg'
    },
    {
      id: 3,
      nick: '想的鱼',
      attentions: 76,
      fans: 5380,
      src: './static/images/list04.jpg',
      sex: '男',
      sex_src: './static/images/male.jpg'
    },
    {
      id: 4,
      attentions: 530,
      fans: 580,
      nick: '钓鱼爱好者',
      src: './static/images/list05.jpg',
      sex: '男',
      sex_src: './static/images/male.jpg'
    },
    {
      id: 5,
      attentions: 560,
      fans: 580,
      nick: '悲情歌',
      src: './static/images/list06.jpg',
      sex: '男',
      sex_src: './static/images/male.jpg'
    },
    {
      id: 6,
      attentions: 340,
      fans: 580,
      nick: '鱼吧',
      src: './static/images/list07.jpg',
      sex: '男',
      sex_src: './static/images/male.jpg'
    },
    {
      id: 7,
      attentions: 750,
      fans: 586,
      nick: '你谁',
      src: './static/images/list08.jpg',
      sex: '男',
      sex_src: './static/images/male.jpg'
    }
  ]
}

const getters = {
  fans_list: state => state.fans_list
}

export default {
  state,
  getters
}
