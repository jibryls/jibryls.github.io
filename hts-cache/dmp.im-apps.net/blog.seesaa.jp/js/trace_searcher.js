function setupTraceSearcher(server, linksStr) {
  if (linksStr == '') return;

  linksStr = linksStr.replace(/naver?,/,'');
  linksStr = linksStr.replace(/searchjp?,/,'');
  linksStr = linksStr.replace(/yahoo?,/,'');

  var links = linksStr.split(',');

  function include(item) {
    for (var i = 0; i < links.length; i++) {
      if (links[i] == item) return true;
    }
    return false;
  }

  var hasLinks = {
    'amazon'   : include('amazon'),
    'twitter'  : include('twitter'),
    'blog'     : include('blog')
  };

  function has() {
    var ret = false;
    for (var i = 0; i < arguments.length; i++) {
      var type = arguments[i];
      ret = ret || hasLinks[type]; // || include(type);
    }
    return ret;
  }

  function getSearcherHtml() {
    var searcherHtml = '<div id="trace-searcher" class="seesaaNazoru">';
    searcherHtml += '<div id="trace-searcher-word" class="seesaaNazoruWord"></div>';
    searcherHtml += '<div class="seesaaNazoruWrap">';
    if (has('amazon')) { 
      searcherHtml += '<div id="trace-searcher-search-title" class="seesaaNazoruSearch">検索する</div>';
      searcherHtml += '<ul id="trace-searcher-search-list" class="seesaaNazoruSearchList">';
      if (has('amazon')) { searcherHtml += '<li class="seesaaNazoruSearchAmazon"><a id="floating-amazon-keyword" target="_blank">Amazonで検索</a></li>'; }
      searcherHtml += '</ul>';
    }
    if (has('twitter', 'blog')) { 
      searcherHtml += '<div class="seesaaNazoruPost">投稿する</div><ul class="seesaaNazoruPostList">'; 
      if (has('twitter')) { searcherHtml += '<li id="floating-twitter-kyeword-item" class="seesaaNazoruPostTwitter"><a id="floating-twitter-keyword" target="_blank">Twitterに投稿</a></li>'; }
      if (has('blog')) { searcherHtml += '<li class="seesaaNazoruPostBlog"><a id="floating-blog-keyword" target="_blank">Seesaaブログに投稿</a></li>'; }
      searcherHtml += '</ul>';
    }
    searcherHtml += '</div>';
    searcherHtml += '</div>';
    return searcherHtml;
  }

  document.write('<link rel="stylesheet" type="text/css" href="' + server + '/css/trace_searcher.css"></link>');
  if (window.ActiveXObject) {
    document.write('<link rel="stylesheet" type="text/css" href="' + server + '/css/trace_searcher_ie.css"></link>');
  }
  document.write(getSearcherHtml());

  // http://liosk.blog103.fc2.com/blog-entry-61.html
  function observe(target, type, listener) {
    if (target.addEventListener) target.addEventListener(type, listener, false);
    else if (target.attachEvent) target.attachEvent('on' + type, function() { listener.call(target, window.event); });
    else                         target['on' + type] = function(e) { listener.call(target, e || window.event); };
  }

  // prototype.js
  function pointerX(event) {
    return event.pageX || (event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft));
  }

  // prototype.js
  function pointerY(event) {
    return event.pageY || (event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop));
  }

  function getSelectedText() {
    if (document.getSelection) { // Firefox, IE9
      return document.getSelection().toString();
    }
    else { // IE
      return document.selection.createRange().text;
    }
  }

  var traceSercher = document.getElementById('trace-searcher');
  var linkTags = {};
  
  observe(document.body, 'mouseup', function(evt) {
    function getLinkTag(type) {
      if (!linkTags[type]) {
        linkTags[type] = document.getElementById('floating-' + type + '-keyword');
      }
      return linkTags[type];
    }

    function getLink(type, selection) {
      if (type == 'amazon') {
        return 'http://www.amazon.co.jp/gp/associates/link-types/searchbox.html?tag=seesaashoppin-22&creative=2131&adid=1WS3VRBYMNFJ639XNSCW&campaign=483&__mk_ja_JP=カタカナ&mode=blended&keyword=' + 
          selection;
      }
      else if (type == 'twitter') {
        return 'http://twitter.com/?status=' + 
          encodeURIComponent('「' + selection + '」 ' + window.location);
      }
      else if (type == 'blog') {
        var tbUrl = document.getElementById('trackback') ?
        document.getElementById('trackback').innerHTML.match(/http:\/\/.+?\/tb\/\d+/m) : '';
        return server + '/pages/my/home/to_article?body=%3Cblockquote%3E' + encodeURIComponent(selection) + 
          '%3C/blockquote%3E&ping_url=' + encodeURIComponent(tbUrl);
      }
    }

    function hideFloatingSearchBox() {
      traceSercher.style.display = 'none';
      for (var i = 0; i < links.length; i++) {
        getLinkTag(links[i]).href = '';
      }
    }
    window._hideFloatingSearchBox = hideFloatingSearchBox;

    function showFloatingSearchBox(selection, event) {
      if (traceSercher.style.display != 'block') {
        document.getElementById('trace-searcher-word').innerHTML =
          selection.length < 10 ? selection : selection.substring(0, 9) + '...';
        for (var i = 0; i < links.length; i++) {
          getLinkTag(links[i]).href = getLink(links[i], selection);
        }
        traceSercher.style.left = pointerX(event) + 'px';
        traceSercher.style.top = (pointerY(event) + 20) + 'px';
        traceSercher.style.display = 'block';
      }
    }
  
    var selection = getSelectedText();
    if (selection == '' || 300 < selection.length) {
      hideFloatingSearchBox();
    }
    else {
      var searchTitleElm = document.getElementById('trace-searcher-search-title');
      var searchListElm = document.getElementById('trace-searcher-search-list');
      var twitterItemElm = document.getElementById('floating-twitter-kyeword-item');
      if (30 < selection.length) {
        if (has('twitter', 'blog')) { 
          if (searchListElm) searchListElm.style.display = 'none';
	  if (100 < selection.length) {
	    if (has('blog')) {
	      if (twitterItemElm) twitterItemElm.style.display = 'none';
	    }
	    else {
	      return;
	    }
	  }
	  else {
	    if (twitterItemElm) twitterItemElm.style.display = 'block';
	  }
        }
        else {
          return;
        }
      }
      else {
        if (searchListElm) searchListElm.style.display = 'block';
      }

      showFloatingSearchBox(selection, evt);
    }
  });
};
