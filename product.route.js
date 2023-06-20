import express from 'express';
import { auth } from '../index.js';
import request from 'request';
import cheerio from 'cheerio';
let requested = request;
const Router = express.Router();

Router.get('/', auth, async function (request, response) {
  var res = response;

  requested(
    'https://www.flipkart.com/search?q=all&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off',
    async (err, response, html) => {
      const $ = cheerio.load(html);

      const array = [];
      $('._4ddWXP').each(async (i, ell) => {
        const image = $(ell).find('img').attr('src');

        const title = $(ell).find('.s1Q9rs').text();

        const rating = $(ell).find('._3LWZlK').text();

        const price = $(ell).find('._3I9_wc').text();

        const offerPrice = $(ell).find('._30jeq3').text();

        await array.push({
          image,
          title,
          rating,
          price,
          offerPrice,
        });
      });
      res.send(array);
    }
  );
});

Router.get('/:name', auth, async function (request, response) {
  const { name } = request.params;

  let res = response;

  const searchedData = [];

  requested(
    `https://www.flipkart.com/search?q=${name}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`,
    async (err, response, html) => {
      const $ = cheerio.load(html);

      $('._13oc-S').each(async (i, ell) => {
        const image = $(ell).find('img').attr('src');

        const title = $(ell).find('.s1Q9rs').text();

        const rating = $(ell).find('._3LWZlK').text();

        const price = $(ell).find('._3I9_wc').text();

        const offerPrice = $(ell).find('._30jeq3').text();
        await searchedData.push({
          image,
          title,
          rating,
          price,
          offerPrice,
        });
      });
      res.send(searchedData);
    }
  );
});

export default Router;
