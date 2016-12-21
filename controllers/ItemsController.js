const ItemModel = require('../models/ItemModel');
const ListModel = require('../models/ListModel');

module.exports = {

  create(req, res, next) {
    const listId = req.body.list;
    const userId = req.user._id;
    let newItem;
    let foundList;

    ListModel.findOne({
      user: userId,
      _id: listId,
    })
    .exec()
    .then(list => {
      if (!list) {
        return res.status(401).json('Cannot add item to this list');
      }
      foundList = list;
      return new ItemModel({
        username: req.body.login,
        realname: req.body.name,
        avatar: req.body.avatar,
        githubID: req.body.id,
        repos: req.body.public_repos,
        user: userId,
        list: listId,
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
