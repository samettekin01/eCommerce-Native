import { Provider } from "react-redux";
import store from "./redux/store/store";
import { ThemeProvider } from "@rneui/themed";
import Index from "./index";

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Index />
      </Provider>
    </ThemeProvider>
  );
}