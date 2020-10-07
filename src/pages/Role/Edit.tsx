import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';

import api from '../../services/api';

const Edit = () => {
    const history = useHistory();
    const { id } = useParams<any>();

    const [formData, setFormData] = useState({
        description: '',
    });

    useEffect(() => {
        async function returnRole() {
            await api.get(`/roles/${id}`)
                .then(resp => {
                    setFormData({
                        description: resp.data.description
                    });
                });
        }

        returnRole();
    }, [id])

    async function handleSubmit(evt: FormEvent) {
        evt.preventDefault();

        const { description } = formData;

        const data = {
            description
        };

        await api.put(`/roles/${id}`, data);

        history.push('/roles');
    }

    function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <Col className={"pt-2"}>
            <Form onSubmit={handleSubmit}>
                <Row form>
                    <Col>
                        <FormGroup>
                            <Label for="description">Descrição</Label>
                            <Input onChange={handleInputChange} type="text" defaultValue={formData.description} name="description" id="description" placeholder="Insira o nome do cargo" maxLength={50} required />
                        </FormGroup>
                    </Col>
                </Row>
                <Button color={"success"}>Salvar</Button>
            </Form>
        </Col>
    )
};

export default Edit;