var cheerio=require('cheerio');
var request=require('request');

var OriginUrl="https://www.origin.com/kor/ko-kr/store/browse?fq=price:on-sale&sort=rank%20desc";
request(OriginUrl, function(error,response,body){
  if (error) throw error;

  var $ = cheerio.load(body);

//  var gameElement=$();
  var text=$('li[class=origin-tilelist-item l-browsegrid-flexitem]').html();
  console.log(text);
  gameElement.each(function(){
    var gameNameOrigin=$(this).find("h2.otktitle-4 origin-storegametile-title").text().trim();
    console.log(gameNameOrigin);
  })
})
