// const Recommend = require('./models/recommend')
const axios = require('axios')
const promise = require('promise')
export const fetchItem = (page) => {
  // return new promise(function (res, rej) {
  //   Recommend.find()
  //     .sort('-create_dt')
  //     .skip((page - 1) * COUNT_PER_PAGE)
  //     .limit(COUNT_PER_PAGE)
  //     .select('type author title src create_dt')
  //     .exec((err, recommend) => {
  //       if (err) {
  //         rej(err);
  //       }
  //       else res(recommend);
  //     });
  // });
  return new promise(function (res, rej) {
    axios.get('http://localhost:3001/api/recommend/types?type=-1&page=1').then(result =>{
      res(JSON.stringify(result.data))
    }).catch(e => rej(e))
  })
}