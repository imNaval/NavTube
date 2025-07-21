import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import store from './utils/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import Footer from './components/Footer';
import SearchVideos from './components/SearchVideos';
import Shorts from './components/Shorts';

function App() {

  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <>
        <Header /> 
        <Body />
        {/* <Footer />  */}
      </>,
      children : [
        {
          path : "/",
          element : <MainContainer />
        },
        {
          path : "/watch",
          element : <WatchPage />
        },{
          path: "/search/:query",
          element : <SearchVideos />
        },        {
          path: "/shorts",
          element : <Shorts />
        },
        {
          path: "/shorts/:videoId",
          element : <Shorts />
        }
      ]
    }
  ])

  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
