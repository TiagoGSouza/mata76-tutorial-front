import React from 'react';
import { Table, Button } from 'react-bootstrap';
class Home extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            activities: [],
            searchQuery: ''
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
    update(id) {
        fetch("http://localhost:8000/"+id, {method: 'GET'})
        .then((res) => res.json())
        .then(async (body) => {
            localStorage.clear();
            localStorage.setItem('activity', JSON.stringify(body));
            window.location.replace("http://localhost:3000/register");
        });
      }

    handleSearch = (event) => {
        this.setState({searchQuery: event.target.value})
    }

    render(){
        const filteredActivities = this.state.activities.filter((activity) =>
            activity.date.toLowerCase().includes(this.state.searchQuery.toLowerCase())
            );
        return (
            <div>
                <input
                    type='text'
                    placeholder='Pesquise por uma data'
                    value={this.state.searchQuery}
                    onChange={this.handleSearch}>
                </input>
                <Table>
                    <thead>
                        <tr>
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
                            filteredActivities.map((activity) =>
                                <tr key = {activity.id}>
                                    <td> {activity.user} </td>
                                    <td> {activity.date} </td>
                                    <td> {activity.startTime} </td>
                                    <td> {activity.endTime} </td>
                                    <td> {activity.status} </td>
                                    <td> 
                                        <Button variant="danger" onClick={() => this.update(activity.id)}>Atualizar</Button> 
                                        <Button variant="danger" onClick={() => this.delete(activity.id)}>Excluir</Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default Home;