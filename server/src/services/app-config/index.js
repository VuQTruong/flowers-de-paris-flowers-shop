const express = require('express');
const initAppConfigRouter = require('./init-app-config');

const getLayoutConfigRouter = require('./layout-config/get-layout-config');
const adAddFeatureRouter = require('./layout-config/admin/admin-add-feature');
const adUpdateFeatureRouter = require('./layout-config/admin/admin-update-feature');
const adDeleteFeatureRouter = require('./layout-config/admin/admin-delete-feature');

const getSlideConfigRouter = require('./slides-config/get-slide-config');
const adAddSlideRouter = require('./slides-config/admin/admin-add-slide');
const adUpdateSlideRouter = require('./slides-config/admin/admin-update-slide');
const adDeleteSlideRouter = require('./slides-config/admin/admin-delete-slide');

const appConfigRouter = express.Router();

appConfigRouter.use(initAppConfigRouter);

appConfigRouter.use(getLayoutConfigRouter);
appConfigRouter.use(adAddFeatureRouter);
appConfigRouter.use(adUpdateFeatureRouter);
appConfigRouter.use(adDeleteFeatureRouter);

appConfigRouter.use(getSlideConfigRouter);
appConfigRouter.use(adAddSlideRouter);
appConfigRouter.use(adUpdateSlideRouter);
appConfigRouter.use(adDeleteSlideRouter);

module.exports = appConfigRouter;
