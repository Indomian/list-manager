const {Content} = require('./include/Content');

function init() {
  let content = new Content();
  content.sendMessage('getList', '', function(error, answer) {
    if (error !== '') {
      return;
    }

    document.body.appendChild(document.createTextNode(answer));
  });
}

document.addEventListener('DOMContentLoaded', init);
