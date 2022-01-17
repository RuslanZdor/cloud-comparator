import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from "react";

export default function CreateNewService(props) {
    let service = props.service;

    const [formData, updateFormData] = React.useState({});

    const SaveServiceClickHandler = (e) => {
        props.saveNewService(service.id, formData);
    }

    const ServiceChangeHandler = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    return (
        <Form>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            {service.fields && service.fields.map(field => {
                return (
                    <Form.Group key={field.id} className="mb-3" controlId={field.id}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control type="text" name={field.id} placeholder={field.defaultValue} onChange={ServiceChangeHandler} />
                        <Form.Text className="text-muted">
                            {field.description}
                        </Form.Text>
                    </Form.Group>
                )
            })}
            <Button variant="primary" type="button" onClick={SaveServiceClickHandler}>Save</Button>
        </Form>
    )
}
