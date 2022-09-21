'use strict';

const Controller = require('egg').Controller;

class KindController extends Controller {
  async assort() {
    const { ctx } = this;
    const kind = await ctx.service.category.kind();
    ctx.body = {
      code: 1,
      data: {
        kind
      }
    }
  }
}

module.exports = KindController;