const express = require('express')
const router = express.Router()
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')

const Todo = require('../../models/Todo')

router.get('/', (req, res) => {
  const userData = jwt.verify(
    req.headers.authorization.split(' ')[1],
    keys.secretOrKey
  )

  User.find({ _id: userData.id })
    .then(user => {
      Todo.find({ author: user })
        .sort({ date: -1 })
        .then(todos => res.json(todos))
        .catch(err => {
          return res.status(400).json({ err: err.message })
        })
    })
    .catch(err => {
      return res.status(400).json({ err: err.message })
    })
})

router.post('/', (req, res) => {
  const { name, priority } = req.body

  try {
    const userData = jwt.verify(
      req.headers.authorization.split(' ')[1],
      keys.secretOrKey
    )

    const newTodo = new Todo({
      name,
      priority,
      author: userData.id
    })

    newTodo.save(() => res.json({ msg: 'Todo created' }))
  } catch (err) {
    return res.status(400).json({ err: err.message })
  }
})

router.put('/:id', (req, res) => {
  const { priority } = req.body

  Todo.findOneAndUpdate({ _id: req.params.id }, { priority }, { new: true })
    .then(todo => {
      return res.status(200).json(todo)
    })
    .catch(err => {
      return res.status(400).json({ err: err.message })
    })
})

router.delete('/:id', (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      return res.status(200).json({ msg: 'Deleted successfully' })
    })
    .catch(err => {
      return res.status(400).json({ err: err.message })
    })
})

module.exports = router
