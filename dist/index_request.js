my.request({
  url: 'test.php',
  //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  headers: {
    'content-type': 'application/json' // 默认值

  },

  success(result) {
    result.status = result.statusCode;
    delete result.statusCode;
    var obj = {
      statusCode: 100
    };
    console.log(obj.statusCode);
    const b = result;

    if (b.statusCode === 200) {
      console.log('success');
    }
  }

}); // my.request({
//     url: 'test.php', //仅为示例，并非真实的接口地址
//     data: {
//       x: '',
//       y: ''
//     },
//     headers: {
//       'content-type': 'application/json' // 默认值
//     },
//     success (res) {
//       if (res.status === 200) {
//           console.log('success')
//       }
//     }
// })