const querySerialize = (queryObj) => {
  let queryStr = '';

  const { sortBy, price, tags, colors, size, rating } = queryObj;

  // !sorting
  if (sortBy !== '-createdAt') {
    queryStr += `sort=${sortBy}`;

    if (price.low || price.high) {
      queryStr += '&';
    }
  }

  // !price filter
  if (price.low || price.high) {
    if (price.low) {
      queryStr += `price[gt]=${price.low}`;
    }

    if (price.low && price.high) {
      queryStr += '&';
    }

    if (price.high) {
      queryStr += `price[lte]=${price.high}`;
    }

    if (tags) {
      queryStr += '&';
    }
  }

  // !tags filter
  if (tags) {
    let modifiedTags = tags.replace(/ /g, '+').split(',+').join(',');
    queryStr += `tags[all]=${modifiedTags}`;

    if (colors.length !== 0) {
      queryStr += '&';
    }
  }

  // !colors filter
  if (colors.length !== 0) {
    queryStr += `colors[all]=${colors.join(',')}`;

    if (size !== 'All') {
      queryStr += '&';
    }
  }

  // !size filter
  if (size !== 'All') {
    queryStr += `size=${size}`;

    if (rating) {
      queryStr += '&';
    }
  }

  // !rating filter
  if (rating) {
    queryStr += `rating[gte]=${rating}`;
  }

  return queryStr;
};

export default querySerialize;
