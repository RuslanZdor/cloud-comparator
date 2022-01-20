import React from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

export default function FinishedService(props) {
    let service = props.service;

    const removeServiceHandler = () => {
        props.removeService(props.service.id);
    }

    const editServiceHandler = () => {
        props.editService(props.service.id);
    }

    return (
        <Accordion.Item eventKey={service.id}>
            <Accordion.Header>
                {service.name}
                <AiFillEdit onClick={editServiceHandler} />
                <AiFillDelete onClick={removeServiceHandler} />
            </Accordion.Header>
            <Accordion.Body>
                <Container>
                    <Row>
                        <Col>
                            <CloudService service={service} provider="aws" />
                        </Col>
                        <Col>
                            <CloudService service={service} provider="gcp" />
                        </Col>
                        <Col>
                            <CloudService service={service} provider="azure" />
                        </Col>
                    </Row>
                </Container>
            </Accordion.Body>
        </Accordion.Item>
    )
}


function CloudService(props) {
    let service = props.service;
    let provider = props.provider;

    if (service == null) {
        throw new Error("Service cannot be null");
    }
    if (provider == null) {
        throw new Error("Provider cannot be null");
    }

    if (service.providers && service.providers[provider]) {
        return (

            <div>
                <div>{service.providers[provider].label}</div>
                {service.fields.map(field => {
                    return (
                        <div key={field.id}>
                            <div>{field.label}</div>
                            <div>{field.value} * {service.providers[provider].prices[field.id]} = {field.value * service.providers[provider].prices[field.id]}</div>
                        </div>
                    )
                })}
                <div>Summary: {service.summary(provider)}</div>
            </div>
        )
    } else {
        return (
            <div><span>This cloud provider has no this service</span></div>
        )
    }
}