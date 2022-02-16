// ?to add additional fields follow the examples below
const querySerialize = (queryObj) => {
  let queryArr = [];

  const { name, title, sortBy, price, tags, colors, size, rating, page } =
    queryObj;

  // !search by name
  if (name) {
    const modifiedName = name.replace(/ /g, '+');
    queryArr.push(`name=${modifiedName}`);
  }

  // !search by title
  if (title) {
    const modifiedNaTitle = title.replace(/ /g, '+');
    queryArr.push(`title=${modifiedNaTitle}`);
  }

  // !sorting
  if (sortBy !== '-createdAt') {
    queryArr.push(`sort=${sortBy}`);
  }

  // !price filter
  if (price.low) {
    queryArr.push(`price[gt]=${price.low}`);
  }

  if (price.high) {
    queryArr.push(`price[lte]=${price.high}`);
  }

  // !tags filter
  if (tags) {
    let modifiedTags = tags.replace(/ /g, '+').split(',+').join(',');
    queryArr.push(`tags=${modifiedTags}`);
  }

  // !colors filter
  if (colors.length !== 0) {
    queryArr.push(`colors=${colors.join(',')}`);
  }

  // !size filter
  if (size !== 'All') {
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
