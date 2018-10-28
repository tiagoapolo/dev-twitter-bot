
var Twit = require('twit')
var Keys = require('./keys')

var TwitterClient = new Twit(Keys)
var loopCounter = 0



// Start the app
getKeyWords()
.then(keywords => {
    
    let tweetStore = {}
    keywords.forEach(keyword => tweetStore[keyword] = [])
    // Array.from({length: keywords.length}, (v,i) =>  )    
    
    storeTweetsByKeywords(keywords, tweetStore)    
    setInterval(() => storeTweetsByKeywords(keywords, tweetStore), 30000)

})
.catch(err => console.log(err))




function storeTweetsByKeywords(keywords, tweetStore){
    
    retrieveTweetsFromKeywords(keywords)
    .then(tweetsByKeyword => {
        
        // console.log('\n===> Fetched tweets!', tweetsByKeyword.statuses.len)

        tweetsByKeyword.forEach((tweet, index) => {                                        

            if(tweet['statuses'] && tweet['statuses'].length > 0 && tweetStore[keywords[index]].findIndex(obj => obj.id_str === tweet.statuses[0].id_str) === -1){

                console.log(`\n===> Saving tweet for ${keywords[index]} : ${tweet['statuses'][0]['text']}!`)
                tweetStore[keywords[index]].push(tweet.statuses[0])

            }            
        })

        printRanking(tweetStore)
        loopCounter++

        if(loopCounter > 19)
            process.exit()

    })
    .catch(err => console.log(err))
    
}

function printRanking(tweetStore){

    console.log(`\nTime: ${new Date().toLocaleString()}`)
    console.log('========== RANKING ==========')
    Object.getOwnPropertyNames(tweetStore).map(key => console.log(`| ${key} => ${tweetStore[key].length} |\n---------------------------`))
}


async function retrieveTweetsFromKeywords(keywords){
    console.log(`\n===> Fetching tweets!`)
    keywordTweets = keywords.map(keyword => searchTweets('search/tweets', { q: keyword, count: 1 }))
    return Promise.all(keywordTweets)
}


function searchTweets(uri,params){
    return new Promise((resolve, reject) => {
        TwitterClient.get(uri, params, function(err, data, response){
            if(err) reject(err)
            resolve(data, response)
        })
    })
}


async function getKeyWords(){

    if(process.argv.length > 2)
        return process.argv.slice(2,process.argv.length)
    else
        return Promise.reject('Please provide keywords to rank on Twitter 🐦!')

}