var Twit = require('twit')
var Keys = require('./keys')
var keywords = require('./keywords')


// Replace with your API credentials.

/*
    var T = new Twit({
        "consumer_key":         "...",
        "consumer_secret":      "...",
        "access_token":         "...",
        "access_token_secret":  "...",
        "timeout_ms":           60000,
        "strictSSL":            true  
    })
*/

var T = new Twit(Keys)

// queryTweets({ q: '@tiagoapolo since:2018-09-01', count: 2 })
// .then(data => console.log(data))

get('statuses/user_timeline', { screen_name: 'addyosmani', result_type:'recent', exclude_replies: 'true', include_rts: 'false', count: 1 })
.then(data => {
   
    console.log(data)

    return data.map(status => status)

}).then(status => {
    
    reg = new RegExp(keywordToRegex('dev'))

    // if(reg.test(status[0].text.toLowerCase()))
    //     postWithTweet('Que tal ?', status[0])
    //     .then(data => console.log('DONE!', data))
    //     .catch(err => console.log(err))
    // else   
    //     console.log('No tweet for today 🙈')


})
.catch(err => console.log(err))


function get(uri,params){
    return new Promise((resolve, reject) => {
        T.get(uri, params, function(err, data, response){
            if(err) reject(err)
            resolve(data, response)
        })
    })
}

function post(uri,params){
    return new Promise((resolve, reject) => {
        T.post(uri, params, function(err, data, response){
            if(err) reject(err)
            resolve(data, response)
        })
    })
}

function keywordToRegex(context){
    let keys = keywords[context].toString()
    return "(" + keys.replace(/,/g, ")|(") + ")"
}

function postWithTweet(status, tweet){
    
    let uri = "https://twitter.com"
    let tweetIDStr = tweet.id_str

    return post('statuses/update', { status: status + ` ${uri}/${tweet.user.screen_name}/status/${tweetIDStr}` })
}

function filterByDate(creadted_at){
    let date = new Date(creadted_at)
    let dmy = date.toLocaleString().split(' ')[0]
    let hour = date.getHours()
    let min = date.getMinutes()

    
}