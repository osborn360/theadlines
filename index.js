require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')
const cron = require('node-cron')
const bodyparser = require('body-parser')
const cors = require('cors')


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors())

// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI(process.env.NEWS_KEY);


const getdata = () => {
  axios.get(`https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=${process.env.NEWS_KEY}`)
    .then(res => {
      const world = res.data.articles

      app.get('/world', (req, res) => {
        res.send(world)
      })
    })
    .catch(err => {
      console.error('Error fetching data:', err);
  });


  axios.get(`https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=${process.env.NEWS_KEY}`)
    .then(res => {
      const sports = res.data.articles

      app.get('/sports', (req, res) => {
        res.send(sports)
      })
    })
    .catch(err => {
      console.error('Error fetching data:', err);
  });


  axios.get(`https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${process.env.NEWS_KEY}`)
    .then(res => {
      const tech = res.data.articles

      app.get('/tech', (req, res) => {
        res.send(tech)
      })
    })
    .catch(err => {
      console.error('Error fetching data:', err);
  });


  axios.get(`https://newsapi.org/v2/top-headlines?category=entertainment&language=en&country=us&apiKey=${process.env.NEWS_KEY}`)
    .then(res => {
      const entertainment = res.data.articles

      app.get('/entertainment', (req, res) => {
        res.send(entertainment)
      })
    })
    .catch(err => {
      console.error('Error fetching data:', err);
  });

}

getdata()
cron.schedule('0 */12 * * *', () => {
  getdata()
})


app.get('/', (req, res) => {
  res.render("index")
})

const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

