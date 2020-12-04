// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.onInstalled.addListener(function() {
  pollGithub()
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: 'crunchyroll.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request == 'dark-theme'){
      chrome.tabs.insertCSS(sender.tab.id, {
        file: "Reddit-Embed/css/dark-theme.css"
      });
      chrome.tabs.insertCSS(sender.tab.id, {
        file: "content_scripts/dark-buttons.css"
      });
      sendResponse("DARK MODE ACTIVATED")
    }
    else if(request == 'light-theme'){
      chrome.tabs.insertCSS(sender.tab.id, {
        file: "Reddit-Embed/css/light-theme.css"
      });
      sendResponse("LIGHT MODE ACTIVATED")
    }
    else if(request == 'poll-gh'){
      pollGithub()
      sendResponse("Polled GH")
    }

    sendResponse("Did nothing");
});

const urls = {
  streamsMap: 'https://raw.githubusercontent.com/AnirudhRahul/Holo-Mirror/main/streams_map.json',
  infoMap: 'https://raw.githubusercontent.com/AnirudhRahul/Holo-Mirror/main/info_map.json',
  hash: 'https://raw.githubusercontent.com/AnirudhRahul/Holo-Mirror/main/map-sha.txt'
}

// Poll at most every 30 minutes
const poll_frequency = 30 * 60 * 1000

function pollGithub(){
  chrome.storage.local.get({last_checked:0}, (resp)=>{
      if(Date.now()-resp.last_checked>poll_frequency){
        chrome.storage.local.set({last_checked:Date.now()})
        // Check the hash to see if anything has changed
        fetch(urls.hash)
        .then((response) => response.text())
        .then((cur_hash) => {
          chrome.storage.local.get({hash:''}, (local)=>{
            console.log("Local Storage", local.hash)
            if(local.hash!=cur_hash){
              console.log("Map content has changed")
              chrome.storage.local.set({hash:cur_hash})
              saveMap('streamsMap', urls.streamsMap)
              saveMap('infoMap', urls.infoMap)

            }
          })
        })
      }
  })
}

function saveMap(map_name, url){
  fetch(url)
  .then((response) => response.json())
  .then((json_map) => {
    const obj = {}
    obj[map_name] = json_map
    chrome.storage.local.set(obj, console.log);
  })

}
