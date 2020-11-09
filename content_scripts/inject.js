console.log("ROAD OH RRRRRRRRRRRRRRRRROOOOOOOLLLLLLLLLEEEEEEEEEEEER")
let DOM_loaded = false

document.addEventListener("DOMContentLoaded", ()=>{DOM_loaded=true});
// document.fonts.add(new FontFace("Noto Sans", "url('Reddit-Embed/css/fonts/Reddit-Noto-Sans.woff2')"))
// document.fonts.add(new FontFace("IBMPlexSans", "url('Reddit-Embed/css/fonts/Reddit-IBMPlexSans.woff2')"))

chrome.storage.sync.get(
  {
    'disabled': false,
    'dark-theme': false,
    'hide-cr-sidebar': true,
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
    'show-official':true,
  },
  function(settings) {
    console.log("Settings", settings)
    if(settings['disabled'])
      return
    if(settings['dark-theme']){
      chrome.runtime.sendMessage({dark: true}, function(response) {
        console.log("Dark Theme", response);
      });
    }
    if(DOM_loaded)
      onDOMLoaded(settings)
    else
      document.addEventListener("DOMContentLoaded", ()=>{onDOMLoaded(settings)});
  }
);



function onDOMLoaded(settings){
  DOM_loaded = true

  const titleElement = document.querySelector("h1[itemprop=itemListElement]")
  if(titleElement==null){
    console.log("Title Element not found")
    return
  }

  const show_element = titleElement.getElementsByTagName("a")[0]
  const show_name = show_element.children[0].innerText
  const show_link = show_element.getAttribute('href')

  let titleText = titleElement.innerText
  if(titleText.startsWith(show_name))
    titleText = titleText.slice(show_name.length)
  titleText = titleText.trim()

  const episode = {
    number: parseInt(titleText.split(" – ")[0].split(" ")[1]),
    name: titleText.split(" – ")[1]
  }



  const embed_div = document.createElement("div")
  embed_div.setAttribute("class", "reddit-embed center")

  const sidebar = document.getElementById("sidebar")
  const main_content = document.getElementById("main_content")
  main_content.style.width = (sidebar.offsetWidth + main_content.offsetWidth)+'px'
  const comment_div = main_content.getElementsByClassName("guestbook comments box")[0]
  main_content.insertBefore(embed_div, comment_div);
  comment_div.remove();
  sidebar.remove()

  const query = show_name + ' - Episode ' + episode.number + ' discussion'

  console.log("Query", query)

  reddit.search(query).sort("relevance").fetch(function(res) {
  	console.log(res);
  	for(post of res.data.children){
  		const cur = post.data
  		if(cur.link_flair_text == 'Episode' && cur.subreddit == 'anime'){
        console.log("FOUND POST")
        red.embed(cur.url+'about.json', embed_div,
  			{
          show_post_body:false,
          ignore_sticky_comments:true,
          show_comments_section_header:false,
  				post_author: 'AutoLovepon',
          initial_padding: 0,
  			})
  			console.log(cur.url+'about.json');
        break;
  		}
  	}
  });
}
