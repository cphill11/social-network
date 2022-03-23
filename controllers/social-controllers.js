const { Social } = require('../models');

const socialController = {
    // get all social data
    getAllSocial(req, res) {
        Social.find({})
          .then(dbSocialData => res.json(dbSocialData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    
      // get one component social data by id
      getSocialById({ params }, res) {
        Social.findOne({ _id: params.id })
          .then(dbSocialData => {
            // If no social data is found, send 404
            if (!dbSocialData) {
              res.status(404).json({ message: 'No social data found with this id!' });
              return;
            }
            res.json(dbSocialData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    // createSocial
  createSocial({ body }, res) {
    Social.create(body)
      .then(dbPizzaData => res.json(dbSocialData))
      .catch(err => res.json(err));
  },

  // update social data by id
  updateSocial({ params, body }, res) {
    Social.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbSocialData => {
        if (!dbSocialData) {
          res.status(404).json({ message: 'No social data found with this id!' });
          return;
        }
        res.json(dbSocialData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete social data
  deleteSocial({ params }, res) {
    Social.findOneAndDelete({ _id: params.id })
      .then(dbSocialData => {
        if (!dbSocialData) {
          res.status(404).json({ message: 'No social data found with this id!' });
          return;
        }
        res.json(dbSocialData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = socialController;