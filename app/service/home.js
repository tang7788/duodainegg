const Service = require('egg').Service;

class HomeService extends Service {
  async banner() {
    const data = await this.app.mysql.select('banner');
    return data;
  }

  async nav() {
    const data = await this.app.mysql.select('nav');
    return data;
  }

  async hot_nav() {
    const data = await this.app.mysql.select('hot_nav');
    return data;
  }
}

module.exports = HomeService;