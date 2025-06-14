const express = require('express')
const router = express.Router()

const Widget = require('../models/Widget')
const CommonHelper = require('../helpers/common_helper')
const WidgetHelper = require('../helpers/widget_helper')

// GET /widgets
router.get('/', (req, res) => {
  Widget.find()
    .then(widgets => res.json(widgets))
    .catch(err => res.status(500).json(err))
})

// GET /widgets/:id
router.get('/:id', (req, res) => {
  Widget.findById(req.params.id)
    .then(widget => {
      if (!widget) return res.status(404).json({ error: 'Widget not found' })
      res.json(widget)
    })
    .catch(err => res.status(500).json(err))
})

// POST /widgets
router.post('/', (req, res) => {
  Widget.create(req.body)
    .then(widget => {
      req.crudify = { result: widget }
      return WidgetHelper.addWidget(req, res)
    })
    .catch(err => res.status(500).json(err))
})

// PUT /widgets/:id
router.put('/:id', (req, res) => {
  Widget.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(widget => {
      if (!widget) return res.status(404).json({ error: 'Widget not found' })
      req.crudify = { result: widget }
      return CommonHelper.broadcastUpdateMiddleware(req, res).then(() =>
        res.json(widget)
      )
    })
    .catch(err => res.status(500).json(err))
})

// DELETE /widgets/:id
router.delete('/:id', (req, res) => {
  Widget.findByIdAndRemove(req.params.id)
    .then(widget => {
      if (!widget) return res.status(404).json({ error: 'Widget not found' })
      req.crudify = { result: widget }
      return WidgetHelper.deleteWidget(req, res)
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router
