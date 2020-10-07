import React, { useEffect, useState } from 'react';
import { Col, Table, Button } from 'reactstrap';
import api from '../../services/api';
import EmployeeInterface from '../../models/EmployeeInterface';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const List = () => {
    const history = useHistory();

    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

    useEffect(() => {
        async function returnEmployees() {
            await api.get('/employees')
                .then(resp => {
                    setEmployees(resp.data);
                });
        }

        returnEmployees();
    }, []);

    function handleDeleteEmployee(id: Number, evt: any) {
        const employeesRemaining = employees.filter(employee => employee.id !== id);

        api.delete(`/employees/${id}`)
            .then(resp => {
                if (resp.data.success === true) {
                    setEmployees(employeesRemaining);
                }
            });
    }

    function handleEditEmployee(id: Number) {
        history.push(`/employees/${id}`);
    }

    return (
        <Col className={"pt-2"}>
            <Table size={'sm'} hover responsive bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Data de Nascimento</th>
                        <th>Cargo</th>
                        <th>Salário</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <th scope="row">{employee.id}</th>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.birthday}</td>
                            <td>{employee.role.description}</td>
                            <td>{employee.salary}</td>
                            <td align="center">
                                <Button color="info" size="sm" onClick={() => handleEditEmployee(employee.id)}><FaEdit /></Button>{' '}
                                <Button color="danger" size="sm" onClick={(e) => handleDeleteEmployee(employee.id, e)}><FaTrash /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    );
}

export default List;