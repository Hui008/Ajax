$(function () {
  function padZero(n) {
    return n < 10 ? '0' + n : n
  }
  template.defaults.imports.dateFormat = function (date) {
    let dt = new Date(date)
    let y = padZero(dt.getFullYear())
    let m = padZero(dt.getMonth() + 1)
    let d = padZero(dt.getDate())

    let hh = padZero(dt.getHours())
    let mm = padZero(dt.getMinutes())
    let ss = padZero(dt.getSeconds())

    return (y + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss)
  }

  function getNewsList() {
    $.get('http://www.liulongbin.top:3006/api/news', function (res) {
      if (res.status !== 200) {
        alert('获取数据失败')
        return
      }
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].tags = res.data[i].tags.split(',')
      }
      let htmlStr = template('tpl-news', res)
      $('#news-list').html(htmlStr)
    })
  }
  getNewsList()
})