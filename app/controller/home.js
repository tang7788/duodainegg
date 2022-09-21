'use strict';
// const fs = require('fs');
// const path = require('path')
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { callback } = ctx.query;
    const banner = await ctx.service.home.banner();
    const nav = await ctx.service.home.nav();
    const hot_nav = await ctx.service.home.hot_nav();
    if (callback) {
      ctx.set('content-type', 'application/javascript; charset=utf-8')
      ctx.body = callback + '(' + JSON.stringify({
        code: 1,
        data: {
          banner,
          nav,
          hot_nav
        }
      }) + ')'
    } else {
      ctx.body = {
        code: 1,
        data: {
          banner,
          nav,
          hot_nav
        }
      }
    }
  }

  // async banner() {
  //   const {ctx} = this;
  //   const data = await ctx.service.home.banner();
  //   ctx.body = {
  //     code: 1,
  //     data
  //   }
  // }

  // async nav() {
  //   const content = fs.readFileSync(path.resolve(__dirname, '../public/nav.json'), 'utf-8')
  //   const navJson = JSON.parse(content)
  //   for(let i = 0; i < navJson.length; i++) {
  //     await this.app.mysql.insert('nav', {
  //       icon: navJson[i].floorCellData.imgUrl,
  //       text: navJson[i].floorCellData.title
  //     })
  //   }
  //   console.log(navJson);
  //   this.ctx.body = {
  //     code: 1,
  //     message: '添加成功'
  //   }
  // }
}

module.exports = HomeController;
