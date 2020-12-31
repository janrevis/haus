const { Model, DataTypes } = require('sequelize');
//const User = require('./user');

module.exports = sequelize => {
  class Comment extends Model { }

  Comment.init({
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments'
  });
  return Comment;
}
