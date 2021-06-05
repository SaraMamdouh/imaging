import React,{Component}from 'react';
import Blog from './components/blogs/blog';
import { Provider } from 'react-redux';
import store from './redux/store';
import {BrowserRouter,Route} from 'react-router-dom';



class App extends Component{


render(){
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Route path="/" exact component={Blog}></Route>
          </BrowserRouter>
    </Provider>
  );
}
}


export default App;
