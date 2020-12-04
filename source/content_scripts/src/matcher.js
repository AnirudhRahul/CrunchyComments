
function getBestMatch(title, episode_number, resp_list){
  if(resp_list.length==1)
    return 0

  title = normalize(title)
  console.log("NORMED TITLE", title)

  const possible_titles = getPossibleTitles(episode_number, resp_list)
  console.log(possible_titles)

  const title_extracted_nums = extract_nums(title)
  console.log('EXTRACTED NUMS', title_extracted_nums)
  const filtered_list = possible_titles.filter(item => arraysEqual(item.nums, title_extracted_nums))
  console.log("FILTERD LIST", filtered_list)
  if(filtered_list.length == 1){
    return filtered_list[0].index
  }
  else if(filtered_list.length > 1){
    return filtered_list[stringMatch(title, filtered_list)].index
  }
  else{
    title_extracted_nums.sort()
    const unordered_filter = possible_titles.filter(item => arraysEqual(item.nums.sort(), title_extracted_nums))
    if(unordered_filter.length == 1){
      return unordered_filter[0].index
    }

    return possible_titles[stringMatch(title, possible_titles)].index

  }

}

function getPossibleTitles(episode_number, resp_list){
  const possible_titles = []
  let resp_index = 0
  for(const item of resp_list){
    if(episode_number > item.offset){
      const normed_title = normalize(item.title)
      possible_titles.push({
        title: normed_title,
        nums: extract_nums(normed_title),
        index: resp_index
      })
    }
    resp_index++
  }
  return possible_titles
}

function stringMatch(title, list){
  console.log("RESORTED TO STRING MATCHING")
  const ratios = []
  for(item of list){
    ratios.push(fuzzball.ratio(title, item.title))
  }
  console.log(title, list)
  console.log(ratios)
  return indexOfMax(ratios)
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    let max = arr[0];
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

function normalize(title){
  //Removes all special characters other than ' '
  title = title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').trim();
  const words_to_replace = {
    'one':'1',     'i':'1',     '1st':'1',    'first':'1',
    'two':'2',     'ii':'2',    '2nd':'2',    'second':'2',
    'three':'3',   'iii':'3',   '3rd':'3',    'third':'3',
    'four':'4',    'iv':'4',    '4th':'4',    'fourth':'4',
    'five':'5',    'v':'5',     '5th':'5',    'fifth':'5',
    'six':'6',     'vi':'6',    '6th':'6',    'sixth':'6',
    'seven':'7',   'vii':'7',   '7th':'7',    'seventh':'7',
    'eight':'8',   'viii':'8',  '8th':'8',    'eigth':'8',
    'nine':'9',    'ix':'9',    '9th':'9',    'ninth':'9',
    'ten':'10',    'x':'10',    '10th':'10',  'tenth':'10',
  }
  const replaced_words = []
  for(word of title.toLowerCase().split(' ')){
    if(word in words_to_replace)
      replaced_words.push(words_to_replace[word])
    else
      replaced_words.push(word)
  }
  return replaced_words.join(' ')
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Checks if string is an integer
function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function extract_nums(title){
  const output = []
  for(const word of title){
    if(isNumeric(word))
      output.push(parseInt(word,10))
  }
  return output
}
