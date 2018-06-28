// ==UserScript==
// @name        Stuifmeel
// @namespace   http://nescia.nl/anna
// @description Verander het woord 'zaad' in 'stuifmeel' op plekken waar dat waarschijnlijk passender is.
// @version     1
// @grant       none
// @match        *://*/*
// @exclude     http://*seed*
// @exclude     http://*garden*
// @exclude     http://*tuin*
// @exclude     http://*zaad*
// @exclude     http://*zad*
// ==/UserScript==
var textNodes = document.evaluate('//text()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE_1 = new RegExp('(zijn |mijn |je |uw |hun |donor|mannelijk )zaad', 'gi');
var replace_1 = '$1stuifmeel';
var searchRE_2 = new RegExp('zaad(donor|bal|leider)', 'gi');
var replace_2 = 'stuifmeel$1';
var searchRE_3 = new RegExp('(sperma.+)zaad', 'gi');
var replace_3 = '$1stuifmeel';
var searchRE_3a = new RegExp('zaad(.+sperma)', 'gi');
var replace_3a = 'stuifmeel$1';
var searchRE_4 = new RegExp('(his |my |your |their |donor |male |manly )seed', 'gi');
var replace_4 = '$1 pollen';
var searchRE_5 = new RegExp('(sperm.+)seed', 'gi');
var replace_5 = '$1pollen';
var searchRE_5a = new RegExp('seed(.+sperm)', 'gi');
var replace_5a = 'pollen$1';

for (var i = 0; i < textNodes.snapshotLength; i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE_1, replace_1);
  node.data = node.data.replace(searchRE_2, replace_2);
  node.data = node.data.replace(searchRE_3, replace_3);
  node.data = node.data.replace(searchRE_3a, replace_3a);
  node.data = node.data.replace(searchRE_4, replace_4);
  node.data = node.data.replace(searchRE_5, replace_5);
  node.data = node.data.replace(searchRE_5a, replace_5a);
}
