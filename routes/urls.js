const router = require('express').Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

let Url = require('../models/url.model');

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');
  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  if (req.body.urlCode) {var urlCode = req.body.urlCode}
  else{var urlCode = shortid.generate()}

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

  // Check for existing shortUrl
     Url.findOne({ urlCode })
    .then(url => {
      if(url) {return res.json({ shortUrl: "", 
        msg: "Custom URL, requested by you, is already in use. Please, try another one!" });}
      else{
              url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
              });
      
              url.save();
      
              res.json(shortUrl);}

      })

      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;