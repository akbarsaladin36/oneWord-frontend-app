import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import UserActivation from "./pages/Auth/UserActivation/UserActivation";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import CreatePost from "./pages/CreatePost/CreatePost";
import PostDetail from "./pages/PostDetail/PostDetail";
import UpdatePost from "./pages/UpdatePost/UpdatePost";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <PublicRoute
              Route
              restricted={true}
              path="/"
              exact
              component={LandingPage}
            />
            <PublicRoute
              Route
              restricted={true}
              path="/register"
              exact
              component={Register}
            />
            <PublicRoute
              Route
              restricted={true}
              path="/login"
              exact
              component={Login}
            />
            <PublicRoute
              Route
              restricted={true}
              path="/user-activation/:id"
              exact
              component={UserActivation}
            />
            <PrivateRoute Route path="/home" exact component={Home} />
            <PrivateRoute
              Route
              path="/create-post"
              exact
              component={CreatePost}
            />
            <PrivateRoute Route path="/profile/:id" exact component={Profile} />
            <PrivateRoute Route path="/post/:id" exact component={PostDetail} />
            <PrivateRoute
              Route
              path="/post/update-post/:id"
              exact
              component={UpdatePost}
            />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
