console.log("ROAD OH RRRRRRRRRRRRRRRRROOOOOOOLLLLLLLLLEEEEEEEEEEEER")

const titleElement = document.querySelector("h1[itemprop=itemListElement]")

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
embed_div.setAttribute("class", "reddit-embed")

const main_list = document.getElementById("main_content")
const comment_div = main_list.getElementsByClassName("guestbook comments box")[0]
main_list.insertBefore(embed_div, comment_div);

const query = show_name + ' - Episode ' + episode.number + ' discussion'

console.log("Query", query)

reddit.search(query).sort("relevance").fetch(function(res) {
	console.log(res);
	for(post of res.data.children){
		const cur = post.data
		if(cur.link_flair_text == 'Episode' && cur.subreddit == 'anime'){
      console.log("FOUND POST")
      red.embed(cur.url+'about.json', embed_div,
			{show_post_body:false, ignore_sticky_comments:true, show_comments_section_header:false,
				post_author: 'AutoLovepon',
			})
			console.log(cur.url+'about.json');
      break;
		}
	}
});
