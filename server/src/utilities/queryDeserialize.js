// ?url query form:
// name=some+name&tags=a,b,c&colors=c,d&price[gt]=0&price[lte]=100&rating=5&size=S&sort=-price&page=2
const queryDeserialize = (requestQuery) => {
  const deserializedQuery = {};

  // ?convert matched key to mongodb operators
  const queryStr = JSON.stringify(requestQuery).replace(
    /\b(gte|gt|lte|lt|regex|all)\b/g,
    (match) => `$${match}`
  );

  const queryObj = JSON.parse(queryStr);
  const { sort, limit, page, ...filters } = queryObj;

  // !sorting
  deserializedQuery.sort = sort?.split(',').join(' ') || '-createdAt';

  // !paginate
  const tempPage = page * 1 || 1;
  const tempLimit = limit * 1 || 10;
  const skip = (tempPage - 1) * tempLimit;
  deserializedQuery.skip = skip;
  deserializedQuery.limit = tempLimit;

  // !filtering
  // ?to add additional exceptions, follow the examples with tags, colors, etc.
  // ?otherwise, fields will be added to filtersObj without any modification
  const filtersObj = { isActive: true };
  for (let filter in filters) {
    // !search by name or title (for blogs)
    if (filter === 'name' || filter === 'title') {
      const searchObj = {
        $regex: filters[filter],
        $options: 'i', // search with case insensitive
      };

      filtersObj[filter] = searchObj;
      continue;
    }

    // !tags filter
    if (filter === 'tags') {
      const tagsArray = filters.tags.split(',');
      const tagsObj = {
        $all: tagsArray,
      };

      filtersObj.tags = tagsObj;
      continue;
    }

    // !colors filter
    if (filter === 'colors') {
      const colorsArray = filters.colors.split(',');
      const colorsObj = {
        $all: colorsArray,
      };

      filtersObj.colors = colorsObj;
      continue;
    }

    // !rating filter
    if (filter === 'rating') {
      const ratingObj = {
        $gte: filters.rating,
      };

      filtersObj.averageRating = ratingObj;
      continue;
    }

    // !other filters
    filtersObj[filter] = filters[filter];
  }

  deserializedQuery.filters = filtersObj;

  return deserializedQuery;
};

module.exports = queryDeserialize;
