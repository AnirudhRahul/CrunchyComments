// Set Listeners to save options
for(const element of document.getElementsByTagName("input")){
  element.addEventListener('change', function(){
    const obj = {}
    obj[this.id]=this.checked
    chrome.storage.sync.set(obj, console.log);
  })
}

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
    function(items) {
      for(id in items){
        document.getElementById(id).checked = items[id]
        if(id=='show-post')
          disableChildren(post_children, items[id])
        else if(id=='show-external-links')
          disableChildren(link_children, items[id])
    }
  });



function disableChildren(children, checked){
  for(const c of children){
    const element = document.getElementById(c)
    if(checked)
      element.removeAttribute("disabled")
    else
      element.setAttribute("disabled", '')
  }
}

const post_children = ['show-post-title', 'show-post-header', 'show-post-body']
document.getElementById("show-post").addEventListener('change', function() {
  disableChildren(post_children, this.checked)
});

const link_children = ['show-mal', 'show-anidb', 'show-anilist', 'show-kitsu', 'show-official']
document.getElementById("show-external-links").addEventListener('change', function() {
  disableChildren(link_children, this.checked)
});
