
import app from './services/Firestore'
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

import { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './App.css'

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const[telefone, setTelefone] = useState("");
  const[senha, setSenha] = useState("");
  //const [idade, setIdade] = useState("");
  // const [idade, setIdade] = useState(0);
  const [users, setUsers] = useState([]);

  // Inicializando o app para buscar as informações do Firestore
  const db = getFirestore(app);
  // Indicando a coleção = banco de dados não relacional a ser utilizado, no caso é users.
  const usersCollectionRef = collection(db, "Users");

  // Criando a função criar Dados para inserir informações no db de forma assincrona
  async function criarDado() {
    try {
      const user = await addDoc(collection(db, "Users"), {
        email,
        telefone,
        senha, 
        name
      });   
      console.log("Dados salvos com sucesso!", user);
      setName("");
      setEmail("");
      setTelefone("");
      setSenha("");
      //setIdade("");
      // setIdade(0);
    } catch (e) {
      console.error("Erro ao adicionar documento! ", e);
    }
  }

  // Criando a função deleteUser para excluir usuário
  async function deleteUser(id) {
    const userDoc = doc(db, "Users", id);
    await deleteDoc(userDoc);
  }


  // useEffect para atualizar a lista de usuarios inseridos no servidor
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [users]);

  <br/>
  const listNames = users.map( user => 
    <ul key={user.id}>
      <div className="card">
          <div className="content">
            <p className="heading"> Doador: </p>
            <p className="para">Nome completo: {user.name}</p>
            <p className="para">Email: {user.email}</p>   
            <p className="para">Telefone: {user.telefone}</p>         
            <p className="para">Senha: {'*'.repeat(user.senha.length)}</p>   
            <p><button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Deletar</button></p>
          </div>
      </div>
    </ul>
  );

  return (      
    <div>  
      <div className="card">   
          <div className='content'>      
          <h4 className="heading">Registro de Doador</h4>  
                <Form>
                <Form.Group>
                    <Form.Label className="para">Nome completo:</Form.Label>
                    <Form.Control 
                          type="text"
                          placeholder="Nome completo"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)} 
                    />
                  </Form.Group>
                  <br/>
                  <Form.Group>
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control 
                          type="email"
                          placeholder="E-mail"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <br/>
                  <Form.Group>
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control 
                          type="txt"
                          placeholder="Telefone"
                          name="telefone"
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                    />
                  </Form.Group>
                  <br/>
                  <Form.Group>
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control 
                          type="password"
                          placeholder="Senha"
                          name="senha"
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                    />
                  </Form.Group>
                  {/* <Form.Group>
                    <Form.Label>Idade:</Form.Label>
                    <Form.Control 
                          type="number"
                          placeholder="Idade" 
                          name="idade"
                          value={idade}
                          onChange={(e) => setIdade(Number(e.target.value))}
                    />
                  </Form.Group> */}
                  <br></br>
                    <Button variant="primary" onClick={criarDado}>
                      Registrar
                    </Button>
                </Form>
        </div>
    </div>
    <span className="linha"></span>
    <div>
      <h4><strong>Doadores Registrados:</strong></h4>
      {listNames}  
    </div>
  </div>

  );
}

export default App
