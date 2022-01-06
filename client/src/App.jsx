import axios from 'axios';

function App() {
  const googleSignIn = () => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  };

  const getUserFavourites = async () => {
    const data = await axios
      .get('http://localhost:5000/api/user/favourites', {
        withCredentials: true,
      })
      .catch((error) => console.log('Error', error));

    console.log('Data', data);
  };

  return (
    <div className='App'>
      <h1>Flowers de Paris</h1>
      <button onClick={googleSignIn}>Sign in with Google</button>
      <button onClick={getUserFavourites}>Get User Favourites</button>
    </div>
  );
}

export default App;
