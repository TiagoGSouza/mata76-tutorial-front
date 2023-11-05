import React from 'react';
import { Table, Button } from 'react-bootstrap'; 

class Home extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            activities: []
        }
    }

    componentDidMount(){
        this.findAll();
    }

    findAll = () => {
        fetch("http://localhost:8000/")
            .then((res) => res.json())
            .then((body) => {
                this.setState({activities: body})
            })
    }

    delete = (id) => {
        fetch("http://localhost:8000/delete/"+id, {method: 'DELETE'})
            .then((res) => {
                if(res.ok){
                    console.log("Ok");
                    this.findAll();
                }
                else{
                    console.log("Deu erro");
                }
            })
    }

    render(){
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Usuário</th>
                        <th>Data da Atividade</th>
                        <th>Horário de Inicio</th>
                        <th>Horário de Conclusão</th>
                        <th>Status</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.activities.map((activity) =>
                            <tr key = {activity.id}>
                                <td> {activity.id}</td>
                                <td> {activity.user} </td>
                                <td> {activity.date} </td>
                                <td> {activity.startTime} </td>
                                <td> {activity.endTIme} </td>
                                <td> {activity.status} </td>
                                <td> Atualizar <Button variant="danger" onClick={() => this.delete(activity.id)}>Excluir</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }
}
export default Home;