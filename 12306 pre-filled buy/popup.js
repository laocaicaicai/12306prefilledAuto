let intervalId0; // 第一个定时器的引用
let intervalId;  // 第二个定时器的引用

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
  intervalId0 = setInterval(() => {
    // const targetButtonSelector = 'a[href="javascript:;"][class="btn btn-hollow btn-sm w120 buy-ticket-button"]';
    // //当有多种座位类型时，会有多个按钮，只有第一个按钮是被选中【硬座-软座-硬卧】
    // const targetButton = document.querySelector(targetButtonSelector);
    // if (targetButton && window.getComputedStyle(targetButton).display !== 'none') {
    //   targetButton.click();
    //   console.log('yushou, clicking...');
    //   clearInterval(intervalId0); // 停止检查
    // }else{
    //   console.log('Not found the yushou button, waiting...');
    // }

    //当有多种座位类型时，选贵的，哈哈
    const targetButtonSelector = 'a[href="javascript:;"][class="btn btn-hollow btn-sm w120 buy-ticket-button"]';
    const targetButtons = document.querySelectorAll(targetButtonSelector);
    
    let maxSeatNoButton = null;
    let maxSeatNo = -Infinity; // 初始化一个比任何可能的座位号都小的值
  
    // 遍历所有匹配的按钮，找到具有最大data-seatno值的按钮
    targetButtons.forEach(button => {
      const seatNo = parseInt(button.getAttribute('data-seatno'), 10); // 获取data-seatno属性的值，并转换为整数
      if (!isNaN(seatNo) && seatNo > maxSeatNo && window.getComputedStyle(button).display !== 'none') {
        maxSeatNo = seatNo;
        maxSeatNoButton = button;
      }
    });
  
    // 如果找到了具有最大data-seatno值的按钮，并且它是可见的，则点击它
    if (maxSeatNoButton) {
      maxSeatNoButton.click();
      console.log('Clicked the button with the highest data-seatno:', maxSeatNo);
      clearInterval(intervalId0); // 停止检查
    } else {
      console.log('Not found yushou button, waiting...');
    }

  }, 3); // 每隔10毫秒检查一次


  intervalId = setInterval(() => {
    const submitButton = document.querySelector('a[href="javascript:;"][class="btn btn-primary ok"]');
    if (submitButton) {
      submitButton.click();
      console.log('Found the submit button, clicking...');
      clearInterval(intervalId); // 停止检查
    }else{
      console.log('Not found the submit button, waiting...');
    }
  }, 2); // 每隔10毫秒检查一次

}


document.getElementById('stopTimers').addEventListener('click', function() {


  // 首先获取当前活动标签页的ID
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tabId = tabs[0].id;
    
    // 使用获取到的tabId来执行脚本
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      func: buttonlistener2
    }, function() {
      console.log('stop enabled in tab:', tabId);
    });
  });



});

function buttonlistener2() {
  console.log('stop ...');
  // 停止两个定时器
  if (intervalId0 !== undefined) {
    clearInterval(intervalId0);
    console.log('first yushou timer stop');
  }else{
    console.log('first yushou timer undefined');
  }
  if (intervalId !== undefined) {
    clearInterval(intervalId);
    console.log('second submit timer stopped');
  }else{
    console.log('second submit timer undefined');
  }
 
  // 可选：重置定时器引用以避免潜在的内存泄漏
  intervalId0 = undefined;
  intervalId = undefined;
}