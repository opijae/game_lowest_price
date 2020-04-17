var client=require('cheerio-httpcli');
var urlType = require('url');
var cheerio=require('cheerio');
var request=require('request');
var fs=require('fs');
var Youtube = require('youtube-node');
var youtube = new Youtube();
var game_titles=require('./server.js');
var tmp=game_titles.game_title();
youtube.setKey('-----youtube key---------');

var youtubeURL=new Array();
var youtubeTitle=new Array();
var keyword = tmp.replace('searchValue','');
var limit = 5;

youtube.addParam('order', 'relevance');
youtube.addParam('type', 'video');
youtube.search(keyword, limit, function(err, result) {
  if (err) { console.log(err); return; }


  var items = result["items"];
  for (var i in items) {
    var it = items[i];
    var title = it["snippet"]["title"];
    var video_id = it["id"]["videoId"];
    var url = "https://www.youtube.com/watch?v=" + video_id;
    youtubeURL.push(url);
    youtubeTitle.push(title);
    console.log("+ " + title);
    console.log("| " + url);
    console.log("----------------");
    }
    exports.youtubeURL = function(){
      return youtubeURL;
    }
    exports.youtubeTitle = function(){
      return youtubeTitle;
    }

});

var title=new Array();
var price=new Array();




var steamSearchValue=tmp.replace('searchValue','?term');
var directSearchValue=tmp.replace('searchValue','searchValue');
var crazydoxValue=tmp.replace('searchValue','');
var instancegamingValue=tmp.replace('searchValue','?q');

// 인스턴스게임즈
var InstancegamingUrl = "https://www.instant-gaming.com/en/search/"+instancegamingValue;
client.fetch(InstancegamingUrl,function(err, $, res){
var i=0;
var j=0;
        $('img').each(function (idx) {
            var gameName = $(this).attr('title');
            if (!gameName) return;
            i++;
            $('li').each(function (idx) {
                var gamePrice = $(this).attr('data-price');
                gamePrice=gamePrice*1256;
                gamePrice = gamePrice.toString().split('.');
                j++;
                var gameinfo=new Object();
                if(i==j){
                  title.push('인스턴스 게이밍 '+gameName);
                  price.push(gamePrice[0]);
                }
            });
          j=0;
        });
        /*
        Games.sort(function(a, b) {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        */
        for(var j=0;j<price.length;j++)
        {
          for(var k=0;k<price.length-1;k++)
          {
            if(price[k] >price[k+1])
            {
              var kk;
               kk = price[k];
               price[k]=price[k+1];
               price[k+1] = kk;
               var kkk;
               kkk = title[k];
               title[k]=title[k+1];
               title[k+1] = kkk;
             }
           }
         }
        for(var i=0;i<price.length;i++){
          console.log(title[i]+' '+price[i]);
        }
        exports.games_title = function(){
          return title;
        }
        exports.games_price = function(){
          return price;
        }
})
var SteamUrl = "http://store.steampowered.com/search/"+steamSearchValue;
request(SteamUrl, function(error, response, body) {
  if (error) throw error;
  var $ = cheerio.load(body);
  var gameElements = $("div.responsive_search_name_combined");

  gameElements.each(function() {
    var gameName = $(this).find("span.title").text().trim();
  var text = $(this).html();
  var gamePrice = text.substring(text.indexOf('&#x20A9; '));
      gamePrice = gamePrice.substring(0, gamePrice.indexOf('</div>')).trim();
      gamePrice = gamePrice.replace('&#x20A9; ','');
      gamePrice=gamePrice.replace(',','');
      //console.log(text);
  if(gamePrice.length>10)
    {
      gamePrice='0';
    }

  title.push('스팀: '+gameName);
  price.push(gamePrice);
});
});

//다이렉트 게임즈

var DirectGamesUrl="https://directg.net/game/game_search.html?"+directSearchValue;
request(DirectGamesUrl, function(error,response,body){
  if (error) throw error;

  var $ = cheerio.load(body);
  var gameElement=$("div.spacer");
  //var text=$(this).html();
  //console.log(text);
  gameElement.each(function(){
      var gameName=$(this).find("a").text().trim();
      var gamePrice=$(this).find("span.PricesalesPrice").text().trim();
      gamePrice=gamePrice.split('').reverse().join('');
      gamePrice=gamePrice.substring(0,7);//게임이 10만원 이상일수도 있으니
      gamePrice=gamePrice.split('').reverse().join('');
      gamePrice = gamePrice.replace('\t','');
      gamePrice = gamePrice.replace('\t','');
      gamePrice=gamePrice.replace(',','');

      title.push('다이렉트 게임즈: '+gameName);
      price.push(gamePrice);

      //console.log(gameName);
      //console.log("₩ "+DiscountgamePrice);
  });
});


//크레이지 독
var crazydoxValueUrl = "http://crazydok.com/shop/search.php?sfl=wr_subject%7C%7Cwr_content&sop=and&q"+crazydoxValue;
//console.log(crazydoxValueUrl);
request(crazydoxValueUrl, function(error, response, body) {
if (error) throw error;

var $ = cheerio.load(body);
var gameElements = $("div.product-description-in");
var zzz=gameElements.text().trim();
//console.log(zzz);
gameElements.each(function() {

  var text = $(this).html();
  var gameName = text.substring(text.indexOf('- '));
  gameName = gameName.substring(0, gameName.indexOf('</a>')).trim();
  gameName = gameName.replace('- ','');

  var gamePrice = text.substring(text.indexOf('&#x20A9; '));
  gamePrice = gamePrice.substring(0, gamePrice.indexOf('</span>')).trim();
  gamePrice = gamePrice.replace('&#x20A9; ','');
  gamePrice=gamePrice.replace(',','');

  title.push('크레이지 독: '+gameName);
  price.push(gamePrice);
 });
});
