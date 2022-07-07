/**
 *  GET
 *  Homepage
 * */

exports.homepage = async (req, res) => {
  res.render("index");
};

//This appears to indicate that the homepage is created by rendering the data in the "index" file in the main.ejs file
