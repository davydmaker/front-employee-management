import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

interface RolesProps {
    id: number;
    description: string;
}

const Create = () => {
    const history = useHistory();

    const [selectedRole, setSelectedRole] = useState('0');
    const [roles, setRoles] = useState<RolesProps[]>([]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        salary: '',
    });

    async function handleSubmit(evt: FormEvent) {
        evt.preventDefault();

        const { first_name, last_name, birthday, salary } = formData;

        const data = {
            first_name,
            last_name,
            birthday,
            salary,
            role_id: selectedRole
        };

        await api.post('/employees', data);

        history.push('/employees');
    }

    function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    useEffect(() => {
        async function returnRoles() {
            await api.get('/roles')
                .then(resp => {
                    setRoles(resp.data);
                })
        }

        returnRoles();

    }, []);

    return (
        <Col className={"pt-2"}>
            <Form onSubmit={handleSubmit}>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="first_name">Nome</Label>
                            <Input onChange={handleInputChange} type="text" name="first_name" id="first_name" placeholder="Insira seu nome" maxLength={100} required />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="last_name">Sobrenome</Label>
                            <Input onChange={handleInputChange} type="text" name="last_name" id="last_name" placeholder="Insira seu sobrenome" maxLength={100} required />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="birthday">Data de Nascimento</Label>
                            <Input onChange={handleInputChange} type="date" name="birthday" id="birthday" placeholder="Selecione sua data de nascimento" required />
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="role_id">Cargo</Label>
                            <Input type="select" name="role_id" id="role_id" required onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="" hidden>Selecione...</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.description}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="salary">Salário</Label>
                            <Input onChange={handleInputChange} type="number" name="salary" id="salary" required />
                        </FormGroup>
                    </Col>
                </Row>
                <Button color={"success"}>Cadastrar</Button>
            </Form>
        </Col>
    )
};

export default Create;