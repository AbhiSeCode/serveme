import React, {useState} from 'react';
import Router from './router/Router';
import LoadingModal from './components/LoadingModal'
import {Provider} from 'react-redux'
import reducer from './reducers/reducer'
import {createStore} from 'redux'
function App() {
  const [loading, setLoading] = useState(true)
  const store= createStore(reducer)

  window.addEventListener('load', ()=>{
    setLoading(false)
  })

  if(loading){
    return <LoadingModal/>
  }
  else{
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

export default App;
