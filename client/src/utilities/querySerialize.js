// ?to add additional fields follow the examples below
const querySerialize = (queryObj) => {
  let queryArr = [];

  const { sortBy, price, tags, colors, size, rating, page } = queryObj;

  // !sorting
  if (sortBy && sortBy !== '-createdAt') {
    queryArr.push(`sort=${sortBy}`);
  }

  // !price filter
  if (price && price.low) {
    queryArr.push(`price[gt]=${price.low}`);
  }

  if (price && price.high) {
    queryArr.push(`price[lte]=${price.high}`);
  }

  // !tags filter
  if (tags) {
    let modifiedTags = tags.replace(/ /g, '+').split(',+').join(',');
    queryArr.push(`tags=${modifiedTags}`);
  }

  // !colors filter
  if (colors && colors.length !== 0) {
    queryArr.push(`colors=${colors.join(',')}`);
  }

  // !size filter
  if (size && size !== 'All') {
    queryArr.push(`size=${size}`);
  }

  // !rating filter
  if (rating) {
    queryArr.push(`rating=${rating}`);
  }

  // !paginate
  if (page) {
    if (page !== 1) {
      queryArr.push(`page=${page}`);
    }
  }

  return queryArr.join('&');
};

export default querySerialize;
