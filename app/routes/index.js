const h = require('../helpers');
const passport = require('passport');
const config = require('../config');

module.exports = () => {
  let routes = {
    get: {
      '/': (req, res, next) => {
        res.render('login');
      },
      '/rooms': [
        h.isAuthenticated,
        (req, res, next) => {
          res.render('rooms', {
            user: req.user,
            host: config.host
          });
        }
      ],
      '/chat/:id': [
        h.isAuthenticated,
        (req, res, next) => {
          // find a chatroom with the given id
          // render room if the id is found
          const foundRoom = h.findRoomById(
            req.app.locals.chatrooms,
            req.params.id
          );

          if (!foundRoom) return next();

          res.render('chatroom', {
            user: req.user,
            host: config.host,
            room: foundRoom.room,
            roomID: foundRoom.roomID
          });
        }
      ],
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms',
        failureRedirect: '/'
      }),
      '/logout': (req, res, next) => {
        req.logout();
        res.redirect('/');
      }
    },
    post: {},
    NA: (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.htm');
    }
  };

  return h.route(routes);
};
