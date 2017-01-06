const ItemModel = require('../models/ItemModel');
const ListModel = require('../models/ListModel');

module.exports = {
// Update
    update(req, res, next) {
      ListModel.findOne({
        title: req.params.title,
        user: req.user._id,
        _id: req.params.id,
      },
        {
          $set: {
            items: req.body.items
          }
        },
        { new: true }
      )
      .exec()
      .then(list => res.json(list))
      .catch(next)
   },
// Create
  create(req, res, next) {
    let newItem;
    let foundList;

    ListModel.findOne({
      user: req.body.list,
      _id: req.user._id,
    })
    .exec()
    .then(list => {
      if (!list) {
        return res.status(401).json('Cannot add item to this list');
      }
      foundList = list;
      return new ItemModel({
        listTitle: req.body.listTitle,
        avatar: req.body.avatar,
        githubID: req.body.githubID,
        list: req.body.list,
        realname: req.body.realname,
        repos: req.body.repos,
        user: req.user._id,
        username: req.body.username,
      }).save();
    })
      .then(item => {
        newItem = item;
        foundList.items.push(newItem._id);
        return foundList.save();
      })
      .then(() => res.json(newItem))
      .catch(next);
    },
// Remove
  remove(req, res, next) {
    ItemModel.findOneAndRemove({
      user: req.user._id,
      _id: req.params.id,
    })
    .exec()
    .then(item => res.json(item))
    .catch(next);
  }
};
