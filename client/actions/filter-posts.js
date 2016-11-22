export const FILTER_POSTS = 'FILTER_POSTS'

export const orderPosts = (posts) => {
  return posts.concat().sort((a, b) => {
    return b.updated_time < a.updated_time ? -1 : 0
  })
}

export default (posts) => {
  return dispatch => {
    dispatch(filterPosts(filter(posts)))
  }
}


const filter = function(posts){
    if(posts){
      var offers = [], requests = []
         var index = 0
         var res = {}
         posts.map((post, index)=>{
             if(post.message){
               res = checkMessage(post.message)
               var ids = post.id.split('_')
               post.groupId = ids[0]
               post.postId = ids[1]
               post.updated_time = new Date(post.updated_time).getTime()
               if(res.rating<res.maxRating){
                 post.rating = res.rating
                 post.maxRating = res.maxRating
                 post.words = res.words
                 // offers[post.id] = post
                 offers.push(post)
               }else{
                 post.rating = res.rating
                 post.maxRating = res.maxRating
                 post.words = res.words
                 // requests[post.id]= post
                 requests.push(post)
               }
             }else{
               posts.splice(index, 1)
               posts.splice(index, 1)
             }
             index ++
           })
         console.log('filtration Compleated')
         return{
           all: [],
           offers: orderPosts(offers),
           requests: orderPosts(requests),
         }
       }else{
         console.log('Empty array')
         return false
       }
  }

const checkMessage = (message) =>{
  var words = message.split(' '), word=''
  var rating = 0, counter = 0, i=0, maxRating = words.length/10  // percentuage of possibility that the post is a request
  var w = []
  do{
    word = words[i]
    if((word[word.length-1]==='?')||(word[word.length-1]=== '.')||(word[word.length-1]=== ':')||(word[word.length-1]=== '!')){
      word = word.slice(0, -1)
      counter=0
    }else if(word[word.length-1]===','){
      word = word.slice(0, -1)
    }
    word = word.toLowerCase()
    switch(word){
      case 'i':
        (counter>0) ? rating+=2 : rating ++
        w.push(word)
      break
      case 'im':
        (counter>0) ? rating+=2 : rating ++
        w.push(word)
      break
      case 'i\'m':
        (counter>0) ? rating+=2 : rating ++
        w.push(word)
      break
      case 'am':
        (counter>0) ? rating+=2 : rating ++
        w.push(word)
      break
      case 'iam':
        (counter>0) ? rating+=2 : rating ++
        w.push(word)
      break
      case 'afford':
        if(words[i-2] !== 'you') rating +=2
        w.push(word)
      break
      case 'looking':
        if(counter>0){
          if(words[i+1] === 'forward')
            rating+=0
          else
            rating >= 3 ? rating *=(maxRating/2) : rating+=3
        }else{
          rating ++
        }
        w.push(word)
      break
      case 'searching':
        if(counter>0){
          rating >= 3 ? rating *=(maxRating/2) : rating+=3
        }else{
          rating ++
        }
        w.push(word)
      break
      case 'finding':
        if(counter>0){
          rating >= 3 ? rating *=(maxRating/2) : rating+=3
        }else{
          rating ++
        }
        w.push(word)
      break
      case 'lookout':
        if(counter>0){
          rating >= 3 ? rating *=(maxRating/2) : rating+=3
        }else{
          rating ++
        }
        w.push(word)
      break
      case 'seeking':
        if(counter>0){
          rating >= 3 ? rating *=2 : rating+=3
        }else{
          rating ++
        }
        w.push(word)
      break
      case 'budget':
        words[i-1] === 'your' ? rating -= 2 : rating +=(maxRating-rating)
        w.push(word)
      break
      case 'help': rating ++
        w.push(word)
      break
      case 'renting': rating=0
        w.push(word)
      break
      case 'rent':
        if((words[i+1] === 'out')||((words[i-1] === 'for'))) rating = 0
        else if(words[i-1] === 'to'){ rating+=2 }
        w.push(word)
      break
      case 'new':
        if(counter>0){ rating > 0 ? rating +=2 : rating ++ }
        w.push(word)
      break
      case 'moved':
        (counter>0) ? rating+=4 : rating ++
        w.push(word)
      break
      case 'desperate':
        if(counter>0){ rating > 0 ? rating +=2 : rating ++  }
        w.push(word)
      break
      case 'studying':
        if(counter>0){ rating > 0 ? rating +=2 : rating ++  }
        w.push(word)
      break
      case 'tenant': rating=0
        w.push(word)
      break
    }
    counter++
    i++
  }while((rating<maxRating)&&(words.length > i))
  return {
    'words': w,
    'rating': rating,
    'maxRating':maxRating,

  }
}

const filterPosts = (posts) => {
  return {
    type: FILTER_POSTS,
    payload: posts
  }
}
