import ReactDOM from 'react-dom/client'
import noteReducer from './reducers/noteReducer'
import { Provider } from 'react-redux'
import App from './App'
import { legacy_createStore as createStore } from 'redux'

const store = createStore(noteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)