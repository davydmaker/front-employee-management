import React, { useEffect, useState } from 'react';
import { Col, Table, Button } from 'reactstrap';
import api from '../../services/api';
import RoleInterface from '../../models/RoleInterface';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const List = () => {
    const history = useHistory();

    const [roles, setRoles] = useState<RoleInterface[]>([]);

    useEffect(() => {
        async function returnRoles() {
            await api.get('/roles')
                .then(resp => {
                    setRoles(resp.data);
                });
        }

        returnRoles();
    }, []);

    function handleDeleteRole(id: Number, evt: any) {
        const rolesRemaining = roles.filter(role => role.id != id);

        api.delete(`/roles/${id}`)
            .then(resp => {
                if (resp.data.success === true) {
                    setRoles(rolesRemaining);
                }
            });
    }

    function handleEditRoles(id: Number) {
        history.push(`/roles/${id}`);
    }

    return (
        <Col className={"pt-2"}>
            <Table size={'sm'} hover responsive bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {roles.map(role => (
                        <tr key={role.id}>
                            <th scope="row">{role.id}</th>
                            <td>{role.description}</td>
                            <td align="center">
                                <Button color="info" size="sm" onClick={() => handleEditRoles(role.id)}><FaEdit /></Button>{' '}
                                <Button color="danger" size="sm" onClick={(e) => handleDeleteRole(role.id, e)}><FaTrash /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    );
}

export default List;