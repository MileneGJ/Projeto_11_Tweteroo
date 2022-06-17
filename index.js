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



app.listen(5000);