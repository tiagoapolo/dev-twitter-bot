var 
var Twit = require('twit')
var Keys = require('./keys')


var TwitterClient = new Twit(Keys)


console.log(`BACON: ${getKeyWords()}`)

// queryTweets({ q: '@tiagoapolo since:2018-09-01', count: 2 })
// .then(data => console.log(data))

// console.log(diffDates('2018-10-25','2018-10-27'))


// get('statuses/user_timeline', { screen_name: 'addyosmani', result_type:'recent', exclude_replies: 'true', include_rts: 'false', count: 1 })



searchTweets('search/tweets', { q: 'bolsonaro', since: formattedTodayDate(), include_rts: 'false', count: 1 })
.then(data => {

    console.log(data)

    
    

})
.catch(err => console.log(err))

// .then(status => {
    
    // reg = new RegExp(keywordToRegex('dev'))

    // if(reg.test(status[0].text.toLowerCase()))
    //     postWithTweet('Que tal ?', status[0])
    //     .then(data => console.log('DONE!', data))
    //     .catch(err => console.log(err))
    // else   
    //     console.log('No tweet for today 🙈')


// })
// .catch(err => console.log(err))


function searchTweets(uri,params){
    return new Promise((resolve, reject) => {
        TwitterClient.get(uri, params, function(err, data, response){
            if(err) reject(err)
            resolve(data, response)
        })
    })
}

function formattedTodayDate(){
    
    let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function diffDates(firstDate, secondDate){
    let date1 = new Date(firstDate);
    let date2 = new Date(secondDate);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays
}

function post(uri,params){
    return new Promise((resolve, reject) => {
        TwitterClient.post(uri, params, function(err, data, response){
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

function getKeyWords(){
    if(process.argv.length > 2)
        return process.argv.slice(2,process.argv.length)
    else
        throw Error ('Provide keywords!')
}