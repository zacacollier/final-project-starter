const ListModel = require('../models/ListModel');

module.exports = {

  list(req, res, next) {
    ListModel.find({ user: req.user._id })
      .exec()
      .then(lists => res.json(lists))
      .catch(next)
  },

  create(req, res, next) {
    new ListModel({
      title: req.body.title,
      user: req.user._id
    })
      .save()
      .then(list => res.json(list))
      .catch(next)
  },

  show(req, res, next) {
    ListModel.findOne({
      user: req.user._id,
      _id: req.params.id
    })
      .populate('items')
      .exec()
      .then(list => res.json(list))
      .catch(next)
  },

  update(req, res, next) {
    ListModel.findOneAndUpdate({
      title: req.params.title,
      user: req.user._id,
      _id: req.params.id,
    },
      {
        $set: {
        title: req.body.title,
        }
      },
      {
          new: true
      }
    )
    .exec()
    .then(list => res.json(list))
    .catch(next)
  },

  remove(req, res, next) {
    ListModel.findOneAndRemove({
      _id: req.params.id,
      user: req.user._id,
    })
      .exec()
      .then(list => res.json(list))
      .catch(next)
    }
}
