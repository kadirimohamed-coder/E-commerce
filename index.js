import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppEcommerce from "./AppEcommerce";

const Home = () => {
  return (
    <Provider store={store}>
      <AppEcommerce />
    </Provider>
  );
};

export default Home;
