'use strict';
const {Content} = require('./include/Content');

function init() {
  let content = new Content();
  if (content.isCommunitySearchPage) {
    console.log('CommunitySearchPage');
    content.initCommunitySearchPage();
  }
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init, true);
}

