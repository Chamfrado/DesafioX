import { Container, Input, Label } from "reactstrap";

const Test = ({onChangeTeste}) =>{

    const handleChange = (event) => {
        const newTeste = event.target.value;
        onChangeTeste(newTeste);
      };
    
      return (
        <Container>
          <Label>Teste</Label>
          <Input onChange={handleChange}></Input>
        </Container>
      );
    };


export default Test