const express = require('express')
const db = require('./config/db.js');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json()) // POST req.body에 든 객체 해석

app.get('/todo', (req, res) => {
  db.query('select * from todo', (err, data) => {
    if(!err) {
      res.send(data)
    } else {
      // 추후 에러 페이지로 이동
      console.log(err);
    }
  })
})

app.put('/todo', (req, res) => {
  console.log('update 요청!')
  const {id, is_done} = req.body
  const set_is_done = !is_done 
  // const db_sub_date = sub_date.match(/\d{4}-\d{2}-\d{2}/)[0]
  // const db_due_date = due_date.match(/\d{4}-\d{2}-\d{2}/)[0]
  // console.log(`UPDATE todo SET is_done=${db_is_done} WHERE id=${id}`)
  db.query(`UPDATE todo SET is_done=${set_is_done} WHERE id=${id}`, (err, data) => {
    if(!err) {
      console.log('success!')
      console.log(data.message)
    } else {
      console.log(err);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server opened at : http://localhost:${PORT}`)
})