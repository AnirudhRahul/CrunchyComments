$(function() {
  $('#theme-toggle').change(function() {
    chrome.storage.sync.set({'dark-theme': !$(this).prop('checked')}, console.log)
    if($(this).prop('checked')){
      chrome.tabs.insertCSS({file:"themes/light.css"});
    }
    else{
      chrome.tabs.insertCSS({file:"themes/dark.css"});
    }
  })

  chrome.storage.sync.get({'dark-theme': false}, function(resp) {
    if(resp['dark-theme']){
      $('#theme-toggle').bootstrapToggle('off')
    }
    else{
      $('#theme-toggle').bootstrapToggle('on')
    }

  })

})
