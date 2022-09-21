'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/home', controller.home.index);
  // router.get('/home/banner', controller.home.banner);
  // router.get('/home/nav', controller.home.nav);

  router.get('/api/product', controller.product.list);
  // router.post('/product', controller.product.create);
  // router.get('/user/:id', controller.user.info)
  // router.get('/api/category', controller.category.assort);
  router.get('/api/product/category', controller.product.assort);
};
