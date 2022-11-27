const express = require('express')
const db = require('./config/db.js');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json()) // POST req.body에 든 객체 해석

app.get('/todo', (req, res) => {
  db.query('SELECT * from TODO ORDER BY id DESC', (err, data) => {
    if(!err) {
      res.send(data)
    } else {
      // 추후 에러 페이지로 이동
      console.log(err);
    }
  })
})

app.post('/todo', (req, res) => {
  console.log('todo 추가 요청');
  const id = req.body[0].id;
  const name = req.body[0].name;
  const sub_date = req.body[0].sub_date;
  const due_date = req.body[0].due_date;
  const is_continued = req.body[0].is_continued === undefined ? [] : req.body[0].is_continued.map(data => `"${data}"`);
  db.query(`INSERT INTO todo VALUES ('${id}', '${name}', '${sub_date}', '${due_date}', '[${[...is_continued]}]', false)`, (err, data) => {
    if(!err) {
      console.log('추가 완료!')
    } else {
      console.log(err)
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

app.put('/todo-mod/', (req, res) => {
  console.log(req.body)
  const id = req.body.id;
  const name = req.body.name;
  const dueDate = req.body.dueDate;
  console.log(name, dueDate)
  db.query(`UPDATE todo SET name='${name}', due_date='${dueDate}' where id=${id}`, (err, data) => {
    if(!err) {
      console.log('수정 성공!')
      console.log(data.message)
    } else {
      console.log(err)
    }
  })
})

app.delete('/todo/:id', (req, res) => {
  const id = (req.params.id)
  db.query(`DELETE FROM todo WHERE id=${id}`, (err, data) => {
    if(!err) {
      console.log('삭제 완료')
    } else {
      console.log(err)
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server opened at : http://localhost:${PORT}`)
})