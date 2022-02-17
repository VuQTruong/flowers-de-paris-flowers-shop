import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const useCustomNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (filtersObj) => {
    const queryObj = Object.fromEntries([...searchParams]);

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
