let DOM_loaded = false

const embed_div = document.createElement("div")
embed_div.setAttribute("class", "reddit-embed center")

document.addEventListener("DOMContentLoaded", ()=>{DOM_loaded=true});

chrome.runtime.sendMessage('poll-gh', console.log)

chrome.storage.sync.get(
  {
    'disabled': false,
    'dark-theme': false,
    'hide-cr-sidebar': true,
    'show-sticky-comments': false,
    'show-comment-header': false,
    'show-post': true,
    'show-post-title': true,
    'show-post-header': false,
    'show-post-body': false,
    'show-external-links': true,
    'show-mal': true,
    'show-anidb':true,
    'show-anilist':true,
    'show-kitsu':true,
    'show-official':true,
  },
  function(settings) {
    console.log("Settings", settings)
    if(settings['disabled'])
      return
    if(settings['dark-theme'])
      chrome.runtime.sendMessage('dark-theme', console.log);

    getRedditQuery(location.href, redEmbedCallback(settings), buttonAppendCallback(settings))

    //Not sure if this is neccessary
    if(DOM_loaded)
      onDOMLoaded(settings)
    else
      document.addEventListener("DOMContentLoaded", ()=>{onDOMLoaded(settings)});
  }
);

function redEmbedCallback(settings){
return (query) => {
  reddit.search(query).sort("relevance").fetch((res) => {
    for(post of res.data.children){
      const cur = post.data
      console.log(cur)
      const modern_requirement = cur.title.startsWith(query) && cur.link_flair_text == 'Episode' && cur.subreddit == 'anime'  && cur.author == 'AutoLovepon'
      const legacy_requirement = cur.title.startsWith('[Spoilers] '+query) && cur.subreddit == 'anime'
      if(modern_requirement || legacy_requirement){
        red.embed(cur.url+'about.json', embed_div,
        {
          show_post: settings['show-post'],
          show_post_title: settings['show-post-title'],
          show_post_header: settings['show-post-header'],
          show_post_body: settings['show-post-body'],
          ignore_sticky_comments: !settings['show-sticky-comments'],
          show_comments_section_header:settings['show-comment-header'],
          post_author: 'AutoLovepon',
          initial_padding: 0,
        })
        console.log("FOUND POST")
        console.log(cur.url+'about.json');
        break;
      }
    }
  })
  }
}

function buttonAppendCallback(settings){
  return (show_name)=>{
    if(settings['show-external-links'])
    chrome.storage.local.get({'infoMap':{}}, (resp) =>{
      if(show_name in resp.infoMap){
        console.log(show_name, 'found in', 'infoMAP')
        console.log(resp.infoMap)
        const html_buttons = []
        const info = resp.infoMap[show_name]
        for(const [key, url] of Object.entries(info)){
          console.log(key,url)
          if(key=='official'){
            html_buttons.push(Button.Official(url))
          }
          // else if(key=='subreddit'){
          //   html_buttons.push(Button.Reddit('https://reddit.com'+url))
          // }
          else if(url.includes('anidb.net')){
            html_buttons.push(Button.AniDB(url))
          }
          else if(url.includes('anilist.co')){
            html_buttons.push(Button.AniList(url))
          }
          else if(url.includes('kitsu.io')){
            html_buttons.push(Button.Kitsu(url))
          }
          else if(url.includes('myanimelist.net')){
            html_buttons.push(Button.Mal(url))
          }
        }
        html_buttons.sort();

        console.log(html_buttons)
        if(DOM_loaded)
          addButtons(html_buttons)
        else
          document.addEventListener("DOMContentLoaded", ()=>{addButtons(html_buttons)})
      }
    })
  }

}

function addButtons(HTML_list){
  const row = document.getElementsByClassName("showmedia-submenu white-wrapper cf container-shadow small-margin-bottom")[0]
  let rowHTML = `<div class="btn-container">\n` + HTML_list.join('\n')
  for(element of row.getElementsByClassName("right")){
    element.style.marginLeft ='auto'
    rowHTML += element.outerHTML
  }
  rowHTML += `\n</div>`
  row.innerHTML = rowHTML
}

// Checks if string is an integer
function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function getRedditQuery(url, embed_callback, button_callback){
  const url_components = url.substring(url.indexOf('://')+3).split('/')

  let episode_number = undefined
  for(word of url_components[2].split('-'))
    if(word.length<6 && isNumeric(word)){
      episode_number = parseInt(word)
      break
    }

  chrome.storage.local.get({'streamsMap':{}}, (resp) =>{
    let stream_url = url_components[0] + '/' + url_components[1]
    if(stream_url.startsWith('www.'))
      stream_url = stream_url.substring(4)
    console.log('stream url:', stream_url)
    if(resp.streamsMap.length==0){
      console.log("Stream map not found")
    }
    else if(stream_url in resp.streamsMap){
      console.log("Found Map Entry", resp.streamsMap[stream_url])
      let possible_titles = getPossibleTitles(episode_number, resp.streamsMap[stream_url])
      function resolveIndex(index){
        console.log("RESOLVING INDEX",index)
        const show_name = resp.streamsMap[stream_url][index].title
        console.log("BUTTON CALLBACK", show_name)
        button_callback(show_name)
        episode_number -= resp.streamsMap[stream_url][index].offset
        const query = show_name + ' - Episode ' + episode_number + ' discussion'
        console.log(query)
        embed_callback(query)
        console.log("FINISHED embed_callback")
      }

      if(possible_titles.length==1){
        resolveIndex(possible_titles[0].index)
      }
      else{
        document.addEventListener("DOMContentLoaded", ()=>{
          const cr_title =   document.getElementsByClassName('showmedia-header cf')[0].querySelectorAll('span[itemprop=name]')[1].innerText
          console.log('CR TITLE', cr_title)
          const bestMatch_index = getBestMatch(cr_title, episode_number, resp.streamsMap[stream_url])
          resolveIndex(bestMatch_index)
        })
      }

    }
    else{
      console.log("No r/anime post found for this show")
    }
  })

}

function onDOMLoaded(settings){
  DOM_loaded = true

  const tab_div = document.createElement("div")
  tab_div.setAttribute("class","tab-view")
  tab_div.innerHTML = `
  <input type="radio" name="tabs" id="tab1" checked />
	<label for="tab1">
    r/anime <img id="ranime-icon" src="${chrome.runtime.getURL('../images/ranime-icon-mask.png')}"/>
  </label>

	<input type="radio" name="tabs" id="tab2" />
	<label for="tab2">
    Crunchyroll <img id="cr-icon" src="${chrome.runtime.getURL('../images/ui-icons/crunchyroll-icon.svg')}"/>
  </label>
  `

  const tab1 = document.createElement("div")
  tab1.setAttribute("class","tab content1")
  tab1.appendChild(embed_div)
  tab_div.appendChild(tab1)

  const tab2 = document.createElement("div")
  tab2.setAttribute("class","tab content2")
  const sidebar = document.getElementById("sidebar")
  const comment_div = document.getElementsByClassName("guestbook comments box")[0]
  comment_div.setAttribute('class', 'left guestbook comments box')
  const main_content = document.getElementById("main_content")
  comment_div.style.width = main_content.offsetWidth+'px'
  main_content.style.width = (sidebar.offsetWidth + main_content.offsetWidth + 20)+'px'
  if(settings['hide-cr-sidebar']){
    //Centers the comment div
    comment_div.style['margin-left'] = 'auto'
    comment_div.style['margin-right'] = 'auto'
    comment_div.style['float'] = 'none'
    comment_div.style['width'] = '900px'
    tab2.innerHTML = comment_div.outerHTML
  }
  else
    tab2.innerHTML = comment_div.outerHTML + '\n' + sidebar.outerHTML

  tab_div.appendChild(tab2)

  main_content.appendChild(tab_div);

  comment_div.remove();
  sidebar.remove()

  const classes_to_change = {
    'xsmall-margin-bottom player-container player-container-16-9': 'wide-player-container wide-player-container-16-9',
  }

  for(const [key, value] of Object.entries(classes_to_change)){
    const list = document.getElementsByClassName(key)
    if(list.length>0)
      list[0].setAttribute('class', value)
  }
}
