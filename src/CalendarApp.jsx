import { AppRouter } from "./router"
import { store } from "./store/store"
import { Provider } from "react-redux"

export const CalendarApp = () => {
  return (
    <Provider store={store}>
        <AppRouter />
    </Provider>
  )
}