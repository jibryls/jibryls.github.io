(function(n,w,d){var g={};g.cid=7262;g.load_script=function(url){var e=d.createElement("script");e.type="text/javascript";e.referrerPolicy="no-referrer-when-downgrade";e.async=true;e.src=url;var st=d.getElementsByTagName("script")[0];st.parentNode.insertBefore(e,st);};g.make_remainder=function(id_str){var remainder=function(id_str){return(id_str.charCodeAt(id_str.length-2)+id_str.charCodeAt(id_str.length-1))%10;};try{if(id_str.match('THISISOPTEDOUTCOOKIEID')){return null;}
var uid_split=id_str.split('.')
if(uid_split.length===2&&uid_split[1].length>=2){return remainder(id_str);}
if(id_str.length===22){return remainder(id_str);}
return null;}catch(e){return null;}};var gp=n;w[n]=g;g.init=function(data){};})("_itm_",window,document);