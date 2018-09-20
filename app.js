var Twit = require('twit')
var Keys = require('./keys')


var T = new Twit(Keys)

// T.get('search/tweets', { q: '@tiagoapolo since:2018-09-01', count: 2 }, function(err, data, response) {
//     // console.log(data)
//     data.statuses.map(status => {
//         console.log(status)
//         console.log("\n-------------------------\n")
//         console.log(status.entities)
//     })
// })

T.get('statuses/user_timeline', { screen_name: 'addyosmani', result_type:'recent', exclude_replies: 'true', include_rts: 'false', count: 1 }, function(err, data, response) {
    // console.log(data)
    
    resolver(data.map(status => {
        console.log("--------- Start -------------")
        // console.log(status)
        console.log("---------  END  -------------")           
        
        return new Promise(resolve => resolve(status))

    //    return new Promise(resolve => resolve(status.id))
    }))
    

})


function resolver(promises){
    Promise.all(promises)
    .then(solution =>{

        let tweet = solution[0]
        let uri = "https://twitter.com"
        let tweetIDStr = tweet.id_str
        // let tweetID = tweet.id    

        // T.post('statuses/update', { status: "Teste " + `${uri}/${tweet.user.screen_name}/status/${tweetIDStr}` }, (err, data, response) => {
        //     console.log(data)
        // })
        

    })
    .catch(err => {
        throw err
    })
}