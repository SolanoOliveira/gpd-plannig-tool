import {ListagemDatasRecursosPage} from './pages/ListagemDatasRecursosPage';
import {ListagemProdutosPage} from './pages/ListagemProdutosPage';

import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" />
          <Route path='/product-detail'
                 element={<ListagemProdutosPage/>}/>
          <Route path='/'
                 element={<ListagemDatasRecursosPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
