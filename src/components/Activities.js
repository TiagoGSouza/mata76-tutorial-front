import React from 'react';
import { Form, Button } from 'react-bootstrap'; 

class Activities extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: '',
            date: '',
            startTime: '',
            endTime: '',
            status: ''
        }
    }

    validate(c, t) {
        const campo = document.getElementById(c);
        const valor = campo.value;
        const regex = /^[0-9]+$/; // Permite somente números

        const text = document.getElementById(t).textContent;

        if (!regex.test(valor)) {
            alert("O campo " + text + " aceita somente números.");
            return false;
        }
        return true;
    }

    validateDate(data) {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!regex.test(data)){
            alert("A data da atividade deve seguir o padrão DD/MM/AAAA");
            return false;
        }
        return true;
    }
            
    goToHome = () => {
        window.location.replace("http://localhost:3000/");
    }

    register = () => {
        if(this.validate("sT", "lST") && this.validate("eT", "lET") && this.validateDate(this.state.date)){
            const activity = {
                user: this.state.user,
                date: this.state.date,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                status: this.state.status
            }
            fetch("http://localhost:8000/register", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(activity)
            })
            .then((res) => {
                if(res.ok){
                    console.log("Ok");
                    this.goToHome();
                }
                else{
                    console.log("Deu erro");
                }
            })
        }
    }

    updateUser = (e) => {
        this.setState({
            user: e.target.value,
        })
    }

    updateDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    updateStartTime = (e) => {
        this.setState({
            startTime: e.target.value
        })
    }

    updateEndTime = (e) => {
        this.setState({
            endTime: e.target.value,
        })
    }

    updateStatus = (e) => {
        this.setState({
            status: e.target.value
        })
    }

    render(){
        return (
            <Form>
            <Form.Group className="mb-3" controlId="user">
                <Form.Label>Usuário</Form.Label>
                <Form.Control type="text" value={this.state.user} onChange={this.updateUser}/>
            </Form.Group>
        
            <Form.Group className="mb-3" controlId="date">
                <Form.Label>Data da Atividade</Form.Label>
                <Form.Control type="text" placeholder='dd/mm/aaaa' value={this.state.date} onChange={this.updateDate}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="sT">
                <Form.Label id="lST">Horário de Inicio</Form.Label>
                <Form.Control type="text" placeholder='hhmm' value={this.state.startTime} onChange={this.updateStartTime}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="eT">
                <Form.Label id="lET">Horário de Conclusão</Form.Label>
                <Form.Control type="text" placeholder='hhmm' value={this.state.endTime} onChange={this.updateEndTime}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="st">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" value={this.state.status} onChange={this.updateStatus}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={() => this.register()}>
                Criar
            </Button>
            </Form>
        );
    }
}
export default Activities;