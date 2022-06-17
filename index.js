import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser'

const app = express();
const userData = [];
const AllTweets = [];

app.use(cors());
app.use(bodyParser.json());


app.post("/sign-up", (req, res) => {
    function isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    if(isValidHttpUrl(req.body.avatar)&&typeof(req.body.username)==="string"){
        userData.push(req.body);
        res.send("OK");    
    } else {
        res.send("Formato inválido")
    }
});

app.post("/tweets", (req, res) => {
    if(typeof(req.body.username)==="string"&&typeif(req.body.tweet)==="string"){
        AllTweets.push(req.body);
        res.send("OK");
    } else {
        res.send("Formato inválido")
    }
});

app.get("/tweets", (req, res) => {
    let limitShown = 10
    if (AllTweets.length > 0) {
        let identifiedUser
        let identifiedTT = AllTweets.map(function (t) {
            identifiedUser = userData.filter(user => user.username === t.username);
            console.log(identifiedUser)
            return ({
                username: identifiedUser[0].username,
                avatar: identifiedUser[0].avatar,
                tweet: t.tweet
            })
        })
        if (identifiedTT.length <= limitShown) {
            res.send(identifiedTT);
        } else {
            let last = identifiedTT.length - 1
            let exhibitedTweets = [];
            for (let i = 1; i <= limitShown; i++) {
                exhibitedTweets.push(identifiedTT[(last - (limitShown-i))]);
            }
            res.send(exhibitedTweets);
        }
    } else {
        res.send(AllTweets);
    }
})

app.listen(5000);