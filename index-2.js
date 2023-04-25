const express = require('express')
const request = require('request')
const events = require('events');
const eventbus = new events.EventEmitter(); 
const app = express()

app.get('/get', (req, res) => {
  request({
    url: 'https://jsonplaceholder.typicode.com/users',
    json: true,
  }, async (_error, _response, body) => {
    const result = body[0]
    // Case 1: use eventbus
    eventbus.emit('post_created', result);
    // end Case 1

    // Case 2: not using eventbus
    // const data = await resolveAfter2Seconds(result);
    // console.log(data);
    // end Case 2
    res.json(result)
  });
});

eventbus.on('post_created', async (data)=> {
  console.log('Subcribe 1', data.email);
  // console.log('wait 5 seconds...');
  // const result = await resolveAfter2Seconds(data);
  // console.log(result);
});

eventbus.on('post_created', async (data)=> {
  console.log('Subcribe 2', data.email);
});

eventbus.on('xxx', async (data)=> {
  console.log('Subcribe 3', data.email);
  // console.log('wait 5 seconds...');
  // const result = await resolveAfter2Seconds(data);
  // console.log(result);
});

function resolveAfter2Seconds(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 5000);
  });
}

app.listen(3000, () => {
  console.log(`http://localhost:3000`)
})