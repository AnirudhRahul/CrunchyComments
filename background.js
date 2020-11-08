// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    'show-sticky-comments': false,
    'show-comment-header': true,
    'show-post': true,
    'show-post-title': true,
    'show-post-header': false,
    'show-post-body': false,
    'show-external-links': true,
    'show-mal': true,
    'show-anidb':true,
    'show-anilist':true,
    'show-kitsu':true,
    'show-official':true
  }, ()=>{console.log("Finished init")});

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: 'crunchyroll.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
