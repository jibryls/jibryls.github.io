function renderCmnHeader ( textColor, bgColor, logoImg, hasAffiliateRegulation) {

var _blog_url= 'https://blog.seesaa.jp';
var _tag_url = 'https://blog.seesaa.jp/tag';
var _affiliate_regulation = '';
if (hasAffiliateRegulation != '0') {
  _affiliate_regulation = '<div class="aff-notice">アフィリエイト広告を利用しています</div>';
}

var css=document.createElement('link');
css.setAttribute('rel','stylesheet');
css.setAttribute('type','text/css');
css.setAttribute('href',_blog_url+'/css/site/common-header.css');
document.getElementsByTagName('head')[0].appendChild(css)

var bg = bgColor.replace('#', ''), tc = textColor.replace('#', '');

document.write(''
+ '<div id="seesaa-cmn-header" style="background: '+ bgColor +';">'
+ '<div class="seesaa-cmn__inner">'
+ '<div class="seesaa-cmn__logo">'
+ '<a href="https://blog.seesaa.jp"><img src="https://blog.seesaa.jp/img/common_header/logo/'+logoImg+'"/></a>'
+ '</div>'
+ '<div class="seesaa-cmn__content" style="background:' + bgColor +';">'
+ _affiliate_regulation
+ '</div>'
+ '</div>'
+ '</div>'
+ '');
}

