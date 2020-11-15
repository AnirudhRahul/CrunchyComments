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
    if(settings['dark-theme']){
      chrome.runtime.sendMessage('dark-theme', (resp)=>{
        console.log(resp)
        document.documentElement.style.setProperty('--tab-shader', '#ffffff1A')
        document.documentElement.style.setProperty('--tab-bg', '#1b1b1b')
      });
    }

    getRedditQuery(location.href, (query)=>{
      console.log("Query", query)
      reddit.search(query).sort("relevance").fetch((res) => {
        for(post of res.data.children){
          const cur = post.data
          if(cur.link_flair_text == 'Episode' && cur.subreddit == 'anime'){
            console.log("FOUND POST")
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
            console.log(cur.url+'about.json');
            break;
          }
        }
      })
    })

    //Not sure if this is neccessary
    if(DOM_loaded)
      onDOMLoaded(settings)
    else
      document.addEventListener("DOMContentLoaded", ()=>{onDOMLoaded(settings)});
  }
);

function getRedditQuery(url, callback){
  url = url.substring(url.indexOf('://')+3)
  url_components = url.split('/')
  console.log(url_components)


  console.log("URL:", url)
  const query = 'JUJUTSU KAISEN' + ' - Episode ' + 6 + ' discussion'
  callback(query)
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
    Crunchyroll <img id="cr-icon" src="${chrome.runtime.getURL('../images/crunchyroll-icon.svg')}"/>
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
