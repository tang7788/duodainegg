const Service = require('egg').Service;

class ProductService extends Service {
  async product({page, page_size, ...where}) {
    const data = await this.app.mysql.select('product', {
      // where: {
      //   classid: classid
      // },
      where,
      limit: page_size * 1, // 返回数据量
      offset: (page-1)*page_size, // 数据偏移量
    });
    return data;
  }

  async kind() {
    const data = await this.app.mysql.select('category');
    return data;
  }
}

module.exports = ProductService;