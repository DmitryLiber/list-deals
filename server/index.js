import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const POST = 4000;

const app = express();
app.use(cors());

app.get('/auth', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const id = req.query.id;

  await page.setExtraHTTPHeaders({ 'X-Client-Id': id });
  
  const response = await page.goto('https://test.gnzs.ru/oauth/get-token.php', {
    method: 'GET', 
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => res.json());
  
  await browser.close();

  res.send(response);
})

app.listen(POST)