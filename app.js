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
   
    return data.map(status => status.text.toLowerCase())

}).then(status => {
    
    reg = new RegExp(keywordToRegex())
    console.log(`FOUND KEYWORD: ${reg.test(status[0])}`)

})


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

function keywordToRegex(){
    let keys = keywords.dev.toString()
    return "(" + keys.replace(/,/g, ")|(") + ")"
}

function postWithTweet(status, tweet){
    
    let uri = "https://twitter.com"
    let tweetIDStr = tweet.id_str

    return post('statuses/update', { status: status + ` ${uri}/${tweet.user.screen_name}/status/${tweetIDStr}` })
}