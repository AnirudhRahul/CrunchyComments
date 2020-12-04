var Button ={
 Mal: (link)=>`
 <!--0-->
<a class="btn mal" href="${link}" target="_blank" role="button">
  <img src="${chrome.runtime.getURL('../../images/ui-icons/mal-icon.svg')}" class="icon"/>
</a>`,

AniList: (link)=>`
<!--1-->
<a class="btn anilist" href="${link}" target="_blank" role="button">
  <img src="${chrome.runtime.getURL('../../images/ui-icons/anilist-icon.png')}" class="icon"/>
  <div class="btn-title">
    AniList
  </div>
</a>`,

AniDB: (link)=>`
<!--3-->
<a class="btn anidb" href="${link}" target="_blank" role="button">
  <img src="${chrome.runtime.getURL('../../images/ui-icons/anidb-icon.svg')}" style="max-height: 17.6px;"/>
  <div class="btn-title">
    AniDB
  </div>
</a>`,


Kitsu: (link)=>`
<!--2-->
<a class="btn kitsu" href="${link}" target="_blank" role="button" style="height:24px; padding:1px 2px !important;">
<svg class="icon" width="50" height="200" viewBox="0 0 800 224"><g fill="none" fill-rule="evenodd"><g fill="#EDF0F1"><path d="M785.6 43.8c-9 0-14.4 6.4-14.4 14.4v83c0 11.4-6.9 20.6-20.6 20.6-13.6 0-20.6-9.2-20.6-20.6v-83c0-7.9-5.4-14.4-14.4-14.4s-14.4 6.4-14.4 14.4v83.1h.1c1 25.8 17.7 46.3 49.3 46.3 31.6 0 48.2-20.5 49.3-46.3h.1V58.2c0-7.9-5.4-14.4-14.4-14.4zM656.3 118.2C646.1 107.9 623 98 617 90.8c-3.7-4.1-4.2-10.4-.9-15.1 2-2.8 5-4.5 8.1-5.1 5.6-1 11.3-.2 15.8 1.6 5.9 2.3 10.2 5.7 14.8 6 4.2.3 8.5-1.5 11.2-5.3 3.4-4.9 2.8-11.5-1.1-15.7-11.1-13.3-33.9-14.6-45.1-12.8-11 1.8-21.6 7.2-28.2 16.6-10.9 15.5-8.8 36.3 3.5 49.7 9.3 10.6 23.4 16 34.2 22.9 2.3 1.5 5.2 3.6 6.7 5.2 4.6 4.7 5.3 12.1 1.5 17.6-2 2.8-4.8 4.6-7.8 5.4-2.8.8-6.3 1-8.4.9-9.3-.2-19.1-6.6-21.9-7.8-5.2-2.3-11.5-.7-14.9 4.2-2.9 4.1-2.8 9.2-.5 13.3 1.4 2.5 4 5.5 7.4 7.7 16.8 11.2 36.5 9.3 47.6 6.4 8.9-2.4 17.3-7.2 23-15.7 11.5-16.6 8.8-39.1-5.7-52.6zM550.2 45.8h-74.5c-7.2 0-13.1 4.2-13.1 13.1 0 8.9 5.9 13.1 13.1 13.1h23v101.2c0 7.9 4.6 14.4 14.4 14.4 9.7 0 14.4-6.4 14.4-14.4V72h22.7c7.2 0 13.1-4.2 13.1-13.1 0-8.8-5.8-13.1-13.1-13.1zM420.4 43.8c-9 0-14.4 6.4-14.4 14.4v115c0 7.9 4.6 14.4 14.4 14.4 9.7 0 14.4-6.4 14.4-14.4v-115c0-7.9-5.4-14.4-14.4-14.4zM370.5 166.6l-31.4-60.2c23.3-28.1 26.7-44.7 27.1-47.2.1-.7.2-1.5.2-2.3 0-7.2-5.8-13-13-13-5 0-9.3 2.9-11.9 6.9-2.5 4-7.1 15-20.8 34.1-8.3 11.5-17.4 20.9-20.7 24.2V58.3c0-7.9-5.4-14.4-14.4-14.4s-14.4 6.4-14.4 14.4v115c0 7.9 4.6 14.4 14.4 14.4 9.7 0 14.4-6.4 14.4-14.4v-27.8c3.1-3 10-9.6 17.7-17.6l27.1 52.1c3.7 7.1 11.9 9.3 19.4 6.6 7.6-3 10-13 6.3-20z"></path></g><g fill="#E75E45"><path d="M152.7 48.5c-6.8-2.5-14.1-4.1-21.8-4.4-12.7-.6-24.8 2.2-35.4 7.6-.6.3-1.3.6-2 1v36.4c0 .5 0 2.4-.3 4-.7 3.7-2.9 7-6 9.1-2.6 1.8-5.6 2.6-8.8 2.5-.6 0-1.3-.1-1.9-.2-1.6-.3-3.3-.9-3.8-1.1-1.4-.5-21.8-8.4-31.6-12.2-1.2-.5-2.2-.9-3-1.2-11.7 9.9-24 21.7-35.5 35.6-.1.1-.6.7-.7.8-1.5 2.1-1.6 5.1 0 7.4 1.2 1.7 3.1 2.7 5 2.8 1.3.1 2.7-.3 3.9-1.1.1-.1.2-.2.4-.3 12.2-8.8 25.6-15.9 39.8-21.6 1-.5 2.2-.8 3.3-.7 1.6.1 3.1.7 4.3 1.9 2.3 2.3 2.4 6 .5 8.5-.8 1.2-1.5 2.4-2.2 3.6-7.6 12.4-13.7 25.9-18.3 40-.1.4-.2.7-.3 1.1v.1c-.4 1.7-.1 3.5 1 5 1.2 1.7 3.1 2.7 5.1 2.8 1.4.1 2.7-.3 3.9-1.1.5-.4 1-.8 1.4-1.3.1-.2.3-.4.4-.6 5-7.1 10.5-13.8 16.4-20 26.3-28.2 61.2-48.1 100.3-55.9.3-.1.6-.1.9-.1 2.2.1 3.9 2 3.8 4.2-.1 1.9-1.4 3.3-3.2 3.7-36.3 7.7-101.7 50.8-78.8 113.4.4 1 .7 1.6 1.2 2.5 1.2 1.7 3.1 2.7 5 2.8 1.1 0 4.2-.3 6.1-3.7 3.7-7 10.7-14.8 30.9-23.2 56.3-23.3 65.6-56.6 66.6-77.7v-1.2c.9-31.4-18.6-58.8-46.6-69.2zm-56.5 165C91 198 91.5 183 97.6 168.7c11.7 18.9 32.1 20.5 32.1 20.5-20.9 8.7-29.1 17.3-33.5 24.3z"></path><path d="M1.1 50.6c.1.2.3.4.4.5 5.3 7.2 11.3 13.5 17.8 19.1.1.1.2.1.2.2 4.2 3.6 12.2 8.8 18 10.9 0 0 36.1 13.9 38 14.7.7.3 1.7.6 2.2.7 1.6.3 3.3 0 4.8-1s2.4-2.5 2.7-4.1c.1-.6.2-1.6.2-2.3V48.5c.1-6.2-1.9-15.6-3.7-20.8 0-.1-.1-.2-.1-.3-2.8-8.1-6.6-16-11.4-23.5l-.3-.6-.1-.1c-2-2.8-6-3.5-8.9-1.5-.5.3-.8.7-1.2 1.1-.3.4-.5.7-.8 1.1-6.4 9.3-9 20.6-7.3 31.7-3.3 1.7-6.8 4-7.2 4.3-.4.3-3.9 2.7-6.6 5.2-9.7-5.5-21.3-7.2-32.2-4.6-.4.1-.9.2-1.3.3-.5.2-1 .4-1.4.7-2.9 2-3.7 5.9-1.8 8.9v.2zm63.5-40.1c3.4 5.7 6.3 11.6 8.6 17.8-4.6.8-9.1 2-13.5 3.6-.6-7.5 1.1-14.9 4.9-21.4zM31.5 51.3c-3.2 3.5-5.9 7.3-8.3 11.3-4.9-4.3-9.4-9.2-13.5-14.4 7.5-1.3 15-.2 21.8 3.1z"></path></g></g></svg>
</a>`,

Reddit: (link)=>`
<!--5-->
<a class="btn reddit" href="${link}" target="_blank" role="button">
  <img src="${chrome.runtime.getURL('../../images/ui-icons/reddit-icon.svg')}" class="icon" style="max-height:16px"/>
  <div class="btn-title">
    Subreddit
  </div>
</a>`,

Official: (link)=>`
<!--4-->
<a class="btn official" href="${link}" target="_blank" role="button">
  <div class="btn-title" style="margin-left:0px">
    Official
  </div>
</a>`

}
