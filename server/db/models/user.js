const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');
const constants = require('../constants');

const Views = require('./view');
const Ads = require('./ad');

const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      validate: {
          isEmail: true,
          notEmpty: true
      }
    },
    age: {
      type: Sequelize.ENUM(constants.age)
    },
    gender: {
      type: Sequelize.ENUM(constants.gender)
    },
    petOwner: {
      type: Sequelize.ENUM(constants.petOwner)
    },
    income: {
      type: Sequelize.ENUM(constants.income)
    },
    education: {
      type: Sequelize.ENUM(constants.education)
    },
    maritalStatus: {
      type: Sequelize.ENUM(constants.maritalStatus)
    },
    password_digest: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    earnedPay: Sequelize.STRING
}, {
    indexes: [{fields: ['email'], unique: true}],
    hooks: {
        beforeCreate: setEmailAndPassword,
        beforeUpdate: setEmailAndPassword,
        afterFind: function(user){
          if (user){
            return Views.findAll({
              where: {userId: user.id},
              include: [
                { model: Ads, required: true}
              ]
            })
            .then(ret => {
              let total = 0;
              ret.forEach(e => {
                total += (e.smilyScore / 100) * e.ad.cost;
              })
              user.set('earnedPay',"$" + parseFloat(Math.round(total * 100) / 100).toFixed(2));
            })
          }
        }
    },
    instanceMethods: {
        authenticate(plaintext) {
            return new Promise((resolve, reject) =>
                bcrypt.compare(plaintext, this.password_digest,
                    (err, result) => err ? reject(err) : resolve(result)
                )
            )
        }
    }
});


function setEmailAndPassword(user) {
    user.email = user.email && user.email.toLowerCase()
    if (!user.password) return Promise.resolve(user)

    return new Promise((resolve, reject) =>
        bcrypt.hash(user.get('password'), 10, (err, hash) => {
            if (err) reject(err)
            user.set('password_digest', hash)
            resolve(user)
        })
    )
}


module.exports =  User;
