import axios from 'axios';

function App() {
  const googleSignIn = () => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  };

  const facebookSignIn = () => {
    window.open('http://localhost:5000/api/auth/facebook', '_self');
  };

  const emailSignIn = async () => {
    const data = await axios
      .post(
        'http://localhost:5000/api/auth/signin',
        {
          username: 'v_truong@gmail.com',
          password: 'password',
        },
        {
          // By default, the browser will not save cookies come from localhost
          // This allows the browser save the received cookies
          withCredentials: true,
        }
      )
      .catch((error) => console.log('Error', error));

    console.log(`JWT Auth`, data.data);
  };

  const getUserFavourites = async () => {
    const data = await axios
      .get('http://localhost:5000/api/user/favourites', {
        withCredentials: true,
      })
      .catch((error) => console.log('Error', error));

    console.log('Data', data);
  };

  const signOutHandler = async () => {
    const data = await axios
      .get('http://localhost:5000/api/auth/signout', {
        withCredentials: true,
      })
      .catch((error) => console.log('Error', error));

    console.log(`Sign out`, data.data);
  };

  return (
    <div className='App'>
      <h1>Flowers de Paris</h1>
      <div>
        <button onClick={googleSignIn}>Sign in with Google</button>
      </div>
      <div>
        <button onClick={facebookSignIn}>Sign in with Facebook</button>
      </div>
      <div>
        <button onClick={emailSignIn}>Sign in with Email</button>
      </div>
      <div>
        <button onClick={getUserFavourites}>Get User Favourites</button>
      </div>
      <div>
        <button onClick={signOutHandler}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
