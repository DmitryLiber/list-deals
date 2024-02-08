import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/auth', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const id = req.query.id;

  try {
    await page.setExtraHTTPHeaders({ 'X-Client-Id': id });

    const response = await page.goto('https://test.gnzs.ru/oauth/get-token.php', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json());

    await browser.close();
    res.send(response);
  } catch (error) {
    await browser.close();
    res.status(500).send('Internal Server Error');
  }
})

app.post('/create', async (req, res) => {
  const data = {}
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const {url, type, accessToken} = req.body;

  try {
    await page.setExtraHTTPHeaders({ Authorization: `Bearer ${accessToken}` });

    if (type === 'leads') {
      const id = Math.ceil(Math.random() * 1000)
      data['name'] = `Lead ${id}`
      data['id'] = id
      data['status_id'] = Math.ceil(Math.random() * 1000)
      data['pipeline_id'] = Math.ceil(Math.random() * 1000)
    }

    if (type === 'contacts') {
      const id = Math.ceil(Math.random() * 1000)
      data['name'] = `Contact ${id}`
      data['id'] = id
    }

    if (type === 'companies') {
      const id = Math.ceil(Math.random() * 1000)
      data['name'] = `Company ${id}`
      data['id'] = id
    }

    const response = await page.goto(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [data] })
    }).then(res => res.json());
    
    await browser.close();

    if(response) {
      res.send(data);
    }
  } catch (error) {
    await browser.close();
    res.status(500).send('Internal Server Error');
  }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));