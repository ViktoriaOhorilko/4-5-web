const {Router} = require('express')
const Article = require('../modules/Article')
const router = Router()

router.post('/create', async (req, res) => {
    try{



    } catch (e) {
        res.status(500).json({message: 'Sth went wrong...'})
    }
})

router.get('/', async (req, res) => {
    try{
        const articles = await Article.find({owner: null})
        res.json(articles)

    } catch (e) {
        res.status(500).json({message: 'Sth went wrong...'})
    }
})

router.get('/:id', async (req, res) => {
    try{

        const article = await Article.findById(req.params.id)
        res.json(article)

    } catch (e) {
        res.status(500).json({message: 'Sth went wrong...'})
    }
})

module.exports = router
