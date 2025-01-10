document.getElementById('goHome').addEventListener('click', function() {
  // 首先获取当前活动标签页的ID
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tabId = tabs[0].id;
    
    // 使用获取到的tabId来执行脚本
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      func: buttonlistener
    }, function() {
      console.log('button listener enabled in tab:', tabId);
    });
  });
});

function buttonlistener() {
  console.log('listening start...');
  const intervalId0 = setInterval(() => {
    const targetButtonSelector = 'a.buy-ticket-button[style*="display: inline-block;"]';
    const targetButton = document.querySelector(targetButtonSelector);
    if (targetButton && window.getComputedStyle(targetButton).display !== 'none') {
      targetButton.click();
      console.log('yushou, clicking...');
      clearInterval(intervalId0); // 停止检查
    }else{
      console.log('Not found the yushou button, waiting...');
    }
  }, 3); // 每隔10毫秒检查一次


  const intervalId = setInterval(() => {
    const submitButton = document.querySelector('a[href="javascript:;"][class="btn btn-primary ok"]');
    if (submitButton) {
      submitButton.click();
      console.log('Found the submit button, clicking...');
      clearInterval(intervalId); // 停止检查
    }else{
      console.log('Not found the submit button, waiting...');
    }
  }, 5); // 每隔10毫秒检查一次

}



