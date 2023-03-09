const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.role = require("./role.model");
db.user = require("./user.model");
db.customer = require("./customer.model");
db.cateProduct = require("./cateProduct.model");
db.product = require("./product.model");
db.productGroup = require("./productGroup.model");
db.slider = require("./slider.model");
db.page = require("./page.model");
db.cateNew = require("./cateNew.model");
db.new = require("./new.model");
db.media = require("./media.model");
db.service = require("./services.model");

db.ROLES = ["admin", "user", "guest"];

module.exports = db;
