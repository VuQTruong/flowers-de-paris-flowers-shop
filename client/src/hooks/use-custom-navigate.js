import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const useCustomNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (filtersObj, removedFiltersArr = []) => {
    const queryObj = Object.fromEntries([...searchParams]);

    // !remove filters from search query
    for (let filter of removedFiltersArr) {
      delete queryObj[filter];
    }

    // !add new filters or update filters' value
    for (let filter in filtersObj) {
      queryObj[filter] = filtersObj[filter];
    }

    const queryStr = Object.keys(queryObj)
      .map((key) => `${key}=${queryObj[key]}`)
      .join('&');

    navigate(`${location.pathname}?${queryStr}`);
  };
};

export default useCustomNavigate;
