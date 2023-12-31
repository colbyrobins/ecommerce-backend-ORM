const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: Product
    });
    
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryName = req.body.category_name;

    const existingCategory = await Category.findOne({
      where: {
        category_name: categoryName
      }
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists.'});
    }

    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryId = req.params.id;
    const updatedCategoryData = req.body;
    const categoryToUpdate = await Category.findByPk(categoryId);

    if (!categoryToUpdate) {
      return res.status(404).json({ error: 'Category not found.'})
    }

    await categoryToUpdate.update(updatedCategoryData);

    const updatedCategor = await Category.findByPk(categoryId);

    res.status(200).json(updatedCategor);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = req.params.id;

    const categoryData = await Category.destroy({
      where: {
        id: categoryId
      }
    });

    if (categoryData === 0) {
      return req.status(403).json({ message: `No category found with this id: ${categoryId}`});
    }

    res.status(200).json({message: 'Category deleted successfully'});
  } catch (err) {
    res.status(500).json({message: 'Server side error'});
  }
});

module.exports = router;
