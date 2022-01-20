import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from "react";
import { AiFillDelete } from 'react-icons/ai';
import { Accordion } from "react-bootstrap";

export default function CreateNewService(props) {
    let service = props.service;

    const [formData, updateFormData] = React.useState({});

    const SaveServiceClickHandler = (e) => {
        props.saveNewService(service.id, formData);
    }

    const removeServiceHandler = () => {
        props.removeService(props.service.id);
    }

    const ServiceChangeHandler = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    return (
        <Accordion.Item eventKey={service.id}>
            <Form>
                <h2>
                    <Form.Control type="text" name="service_name" placeholder={service.name} onChange={ServiceChangeHandler} />
                    <Form.Text className="text-muted">Set a service name</Form.Text>
                </h2>
                <AiFillDelete onClick={removeServiceHandler} />
                <p>{service.description}</p>
                {service.fields && service.fields.map(field => {
                    return (
                        <Form.Group key={field.id} className="mb-3" controlId={field.id}>
                            <Form.Label>
                                {field.label}
                            </Form.Label>
                            <Form.Control type="text" name={field.id} placeholder={field.defaultValue} onChange={ServiceChangeHandler} />
                            <Form.Text className="text-muted">
                                {field.description}
                            </Form.Text>
                        </Form.Group>
                    )
                })}
                <Button variant="primary" type="button" onClick={SaveServiceClickHandler}>Save</Button>
            </Form>
        </Accordion.Item >

    )
}
