const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');

const _registerRoutes = (routes, method) => {
  for (let key in routes) {
    if (
      typeof routes[key] === 'object' &&
      routes[key] !== null &&
      !(routes[key] instanceof Array)
    ) {
      _registerRoutes(routes[key], key);
    } else {
      if (method === 'get') {
        router.get(key, routes[key]);
      } else if (method === 'post') {
        router.post(key, routes[key]);
      } else {
        router.use(routes[key]);
      }
    }
  }
};

let route = routes => {
  _registerRoutes(routes);
  return router;
};

// Find a single user based on key
let findOne = profileId => {
  return db.userModel.findOne({
    profileId: profileId
  });
};

// Create a new user and return instance
let createNewUser = profile => {
  return new Promise((resolve, reject) => {
    let newChatUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || ''
    });

    newChatUser.save(err => {
      if (err) {
        console.log('Create new user error');
        reject(err);
      } else {
        resolve(newChatUser);
      }
    });
  });
};

let findById = id => {
  return new Promise((resolve, reject) => {
    db.userModel.findById(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

// middleware that checks to see if user is authenticated
let isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

// find a chatroom by name
const findRoomByName = (allRooms, room) => {
  const findRoom = allRooms.findIndex((element, index, array) => {
    if (element.room === room) {
      return true;
    } else {
      return false;
    }
  });
  return findRoom > -1 ? true : false;
};

// generate unique RoomID
const randomHex = () => {
  return crypto.randomBytes(24).toString('hex');
};

module.exports = {
  route,
  findOne,
  createNewUser,
  findById,
  isAuthenticated,
  findRoomByName,
  randomHex
};
