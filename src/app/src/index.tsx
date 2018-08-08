import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import "react-table/react-table.css";
import registerServiceWorker from './registerServiceWorker';
import {reducer} from "./store/reducers";
import {createStore} from "redux";
import {Provider} from "react-redux";
import AppRoutes from "./routes";

const store = createStore(reducer);

ReactDOM.render(
   <Provider store={store}><AppRoutes /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
