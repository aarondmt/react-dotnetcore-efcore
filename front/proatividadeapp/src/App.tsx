import "./App.css";
import Atividade from "./pages/atividades/Atividade";
import { Routes, Route } from "react-router-dom";
import Cliente from "./pages/clientes/Cliente";
import Home from "./pages/home/Home";
import ClienteForm from "./pages/clientes/ClienteForm";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="atividade/*" element={<Atividade />} />
      <Route path="atividade/:id/cliente" element={<Cliente />} />
      <Route path="cliente/*" element={<Cliente />} />
      <Route path="cliente/:id/atividade" element={<Atividade />} />
      <Route path="cliente/detalhe" element={<ClienteForm />}>
        <Route path=":id" element={<ClienteForm />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
