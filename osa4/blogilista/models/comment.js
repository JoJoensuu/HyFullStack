const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment: String
})

module.exports = mongoose.model('Comment', commentSchema)