import { useState } from "react";
import "./App.css";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  const [count, setCount] = useState(0);
  // console.log(appStore); // Check this in Chrome Console

  return (
    <>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
