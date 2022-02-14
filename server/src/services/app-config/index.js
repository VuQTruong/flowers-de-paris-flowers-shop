const express = require('express');
const initAppConfigRouter = require('./init-app-config');

const getLayoutConfigRouter = require('./layout-config/get-layout-config');
const addFeatureRouter = require('./layout-config/admin/add-feature');
const updateFeatureRouter = require('./layout-config/admin/update-feature');
const deleteFeatureRouter = require('./layout-config/admin/delete-feature');

const getSlideConfigRouter = require('./slides-config/get-slide-config');
const addSlideRouter = require('./slides-config/admin/add-slide');
const updateSlideRouter = require('./slides-config/admin/update-slide');
const deleteSlideRouter = require('./slides-config/admin/delete-slide');

const appConfigRouter = express.Router();

appConfigRouter.use(initAppConfigRouter);

appConfigRouter.use(getLayoutConfigRouter);
appConfigRouter.use(addFeatureRouter);
appConfigRouter.use(updateFeatureRouter);
appConfigRouter.use(deleteFeatureRouter);

appConfigRouter.use(getSlideConfigRouter);
appConfigRouter.use(addSlideRouter);
appConfigRouter.use(updateSlideRouter);
appConfigRouter.use(deleteSlideRouter);

module.exports = appConfigRouter;
