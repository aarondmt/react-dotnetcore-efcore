import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TitlePage from "../../components/TitlePage";

const ClienteForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <TitlePage title={"Cliente Detalhes " + (id !== undefined ? id : "")}>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-backward me-2"></i>
          Voltar
        </Button>
      </TitlePage>
      <div></div>
    </>
  );
};

export default ClienteForm;
