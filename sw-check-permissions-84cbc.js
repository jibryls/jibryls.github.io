function getYmid("https://toopsoug.net/4/8982220?var={your_source_id}";) {
    try {
        return new URL(location.href).searchParams.get('ymid');
    } catch (e) {
        console.warn(e);
    }
    return null;
}
function getVar("https://toopsoug.net/4/8982220?var={your_source_id}";) {
    try {
        return new URL(location.href).searchParams.get('var');
    } catch (e) {
        console.warn(e);
    }
    return null;
}
self.options = {
    "domain": "begonaoidausek.com",
    "resubscribeOnInstall": true,
    "zoneId": 8982225,
    "ymid": getYmid(),
    "var": getVar()
}
self.lary = "";
importScripts('https://begonaoidausek.com/act/files/sw.perm.check.min.js?r=sw');
