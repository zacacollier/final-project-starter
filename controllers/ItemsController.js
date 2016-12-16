const ItemModel = require('../models/ItemModel');
const ListModel = require('../models/ListModel');

module.exports = {
  create(req, res, next) {
    const listId = req.body.list;
    const userId = req.user._id;

    // Declare a variable that will be assigned to our newly-created item
    let newItem;

    // Declare a variable that will be assigned to a matching list
    let foundList;

    // Make sure that the list we want to attach to the item exists
    // and is owned by the current user
    ListModel.findOne({
      user: userId,
      _id: listId,
    })
    .exec()
    .then(list => {
      // If list isn't found, 
      // either it doesn't exist,
      // or the user does not own it
      if (!list) {
        return res.status(401).json('Cannot add item to this list');
      }
      // Assign our list to our foundList variable
      foundList = list;

      // Create a new ItemModel and save it
      return new ItemModel({
        text: req.body.text,
        user: userId,
        list: listId,
      }).save();
    })
      // After the item saves, update the list
      .then(item => {
        newItem = item;
        // Update the list Array with our new item's _id
        foundList.items.push(newItem._id);
        return foundList.save();
      })
      // After the list saves, return our item
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
