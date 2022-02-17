import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const useCustomNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (key, value) => {
    const queryObj = Object.fromEntries([...searchParams]);
    queryObj[key] = value;

    const queryStr = Object.keys(queryObj)
      .map((key) => `${key}=${queryObj[key]}`)
      .join('&');

    navigate(`${location.pathname}?${queryStr}`);
  };
};

export default useCustomNavigate;
