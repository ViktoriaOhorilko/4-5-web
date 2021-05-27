const {Schema, model, Types}  =require('mongoose')

const schema = new Schema({
    tag: {type: String},
    text: {type: String},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'},
    read_statistic: {type: Number, default:0}
})

module.exports = model('Article', schema)
