'use strict';

const Controller = require('egg').Controller;

function arrayToTree(items) {
  const result = [];
  const itemMap = {};
  items.forEach(item => {
    itemMap[item.categoryId] = { ...item, children: [] }
    const treeItem = itemMap[item.categoryId];
    if (item.parentId === 0) {
      result.push(treeItem);
    } else {
      itemMap[item.parentId].children.push(treeItem)
    }
  })
  return result;
}

const getTreeId = (tree, id, flag) => {
  let ids = [];
  if (flag) {
    tree.forEach(item => {
      ids.push(item.categoryId);
      if (item.children) {
        ids = ids.concat(getTreeId(item.children, id, true))
      }
    })
  } else {
    tree.forEach(item => {
      if (item.categoryId === id) {
        if (item.children) {
          ids = ids.concat(getTreeId(item.children, id, true))
        }
        ids.push(item.categoryId);
      } else {
        if (item.children) {
          ids = ids.concat(getTreeId(item.children, id, false))
        }
      }
    })
  }
  return ids;
}

class ProductController extends Controller {
  async list() {
    const { ctx } = this;
    const {
      page = 1,
      page_size = 10,
      // classid = 1
      category_id
    } = ctx.query;
    let ids = '';
    if (category_id) {
      const data = await ctx.service.product.kind();
      const tree = arrayToTree(data);
      ids = getTreeId(tree, category_id * 1)
    }
    const data = await ctx.service.product.product({
      page,
      page_size,
      // classid
      categoryId: ids
    });
    ctx.body = {
      code: 1,
      data: data.map(item => {
        return {
          ...item,
          images: JSON.parse(item.images),
          promotionInfoList: JSON.parse(item.promotionInfoList)
        }
      })
    };
  }

  async assort() {
    const { ctx } = this;
    const data = await ctx.service.product.kind();
    ctx.body = {
      code: 1,
      data: arrayToTree(data)
    }
  }
  // async create() {
  //   const {ctx} = this;
  //   console.log(ctx.request.body);
  //   // ctx.body = {
  //   //   code: 1,
  //   //   message: '成功'
  //   // };
  //   ctx.body = ctx.request.body
  // }
}

module.exports = ProductController;