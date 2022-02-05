const {
  viewBlogFromDB,
  addBlogToDB,
  deleteBlogFromDB,
  updateBlogFromDB,
} = require("../helper/dashboardHelper");

const { logger } = require("../Middleware/Logger/logger");

const view = async (req, res) => {
  const email = req.params.email;
  const title = req.query.title;
  if (email && title) {
    const { error, data } = await viewBlogFromDB({
      author: email,
      title: title,
    });
    if (error) {
      logger.log("error", `Fetch Blog Failed: `);
      res.status(500).json({ error: error });
    } else {
      if (data.length === 0) {
        logger.log("error", `No Such Blog Exists: `);
        res.status(400).json({ error: "No Such Blog Exists " });
      } else {
        logger.log("info", `Fetch Blog Successfull: `);
        res.status(200).json(data);
      }
    }
  } else if (email) {
    const { data, error } = await viewBlogFromDB({ author: email });
    if (error) {
      logger.log("error", `Fetch Blog Failed: `);
      res.status(500).json({ error: error });
    } else {
      if (data.length === 0) {
        logger.log("error", `No Such Blog Exists: `);
        res.status(400).json({ error: "No Such Blog Exists " });
      } else {
        logger.log("info", `Fetch Blog Successfull: `);
        res.status(200).json(data);
      }
    }
  } else {
    const { data, error } = await viewBlogFromDB({});
    if (error) {
      logger.log("error", `Fetch Blog Failed: `);
      res.status(500).json({ error: error });
    } else {
      logger.log("info", `Fetch Blog Successfull: `);
      res.status(200).json(data);
    }
  }
};

const create = async (req, res) => {
  const { title, desc } = req.body;
  const author = req.user[0].dataValues.email;
  const { error, data } = await addBlogToDB(title, desc, author);
  console.log(error, data);
  if (data) {
    logger.info(`Blog Adding Successfull  : `);
    res.status(201).json(data);
  } else {
    logger.error(`Blog Adding Failed : : ${error}`);
    res.status(500).json({ error: error });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { title, desc } = req.body;
  const author = req.user[0].dataValues.email;
  const { error, data } = await updateBlogFromDB(title, desc, author, id);
  if (data) {
    logger.info(`Blog Update Successfull  : `);
    res.status(201).json(data);
  } else {
    res.status(500).json({ error: error });
    logger.error(`Blog Update Failed   : ${error}`);
  }
};

const delet = async (req, res) => {
  const title = req.params.title;
  const email = req.user[0].dataValues.email;
  const { error, data } = await deleteBlogFromDB(title, email);
  if (data) {
    logger.info(`Blog Deletion Successfull  `);
    res.status(200).json({ msg: "Deleted Successfully" });
  } else {
    logger.error(`Blog Deletion Failed  :  ${error}`);
    res.status(500).json({ error: error });
  }
};

module.exports = { view, create, update, delet };
