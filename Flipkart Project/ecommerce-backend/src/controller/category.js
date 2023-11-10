const Category = require('../models/category');
const slugify = require('slugify');

/* Create category */
function createCategories(categories, parentId = null){
    const categoryList = [];
    let category;
    // Lấy tấ cả các categories và lưu vào trong category
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }

    // Sau đó đẩy các thông tin trong category vào categoryList
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        });
    }
    return categoryList;
};

/* Add category */
exports.addCategory = (req, res) => {
    // Khởi tạo biến categoryObj với các dữ liệu được nhập từ bàn phím
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    // Kiểm tra nếu parentId được người dùng nhập vào thì gán parentId cho biến categoryObj
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    // Khởi tạo đối tượng cat với giá trị truyền vào là giá trị được nhập từ bàn phím và lưu lại xong xuất ra thống báo
    const cat = new Category(categoryObj);
    cat.save()
    .then(category => {
        return res.status(201).json({ category });
      })
    .catch(error => {
        return res.status(400).json({ error });
      });
}

/* Get category */
exports.getCategory = (req, res) => {
    // Tìm trong bảng category và xuất ra cho người dùng biến categoryList được lấy từ hàm createCategories
    Category.find({})
    .then((categories) => {
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });

      }).catch((error) => {
        return res.status(400).json({ error });
      });
}