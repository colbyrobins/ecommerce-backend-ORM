const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include their associated products through ProductTag
    const tags = await Tag.findAll({
      include: Product
    });

    return res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;

    const tag = await Tag.findByPk(req.params.id, {
      include: Product
    });
  
    if (!tag) {
      return res.status(404).json({message: `No tag found with id: ${tagId}`})
    }

    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json({error: 'Server side error!'})
  };
  
});

router.post('/', async (req, res) => {
  try {
    const tag_name = req.body.tag_name;

    const tagExists = await Tag.findOne({
      where: {
        tag_name: tag_name
      }
    });

    if (tagExists) {
        return res.status(400).json({ error: 'Tag already exists.'});
    }
    
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json({error: 'Server side error!'})
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagId = req.params.id;
    const updatedTagData = req.body;
    console.log(tagId)
    const tagToUpdate = await Tag.findByPk(tagId);

    if (!tagToUpdate) {
      return res.status(404).json({ error: 'Tag not found.'})
    }

    await tagToUpdate.update(updatedTagData);

    const updatedTag = await Tag.findByPk(tagId);

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;

    const tagData = await Tag.destroy({
      where: {
        id: tagId
      }
    });

    if (tagData === 0) {
      return req.status(404).json({ message: `No tag found with this id: ${tagId}`});
    }

    res.status(200).json({message: 'Tag deleted successfully'})
  } catch (err) {
    res.status(500).json({error: 'Server side error'});
  }
});

module.exports = router;
