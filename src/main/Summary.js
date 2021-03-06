import React from "react";
import { Col, Container, Row } from "react-bootstrap";


export default function Summary(props) {

    const services = props.services;

    let providerSummary = {
        "aws": {
            "summary": 0
        },
        "gcp": {
            "summary": 0
        },
        "azure": {
            "summary": 0
        }
    };

    services.forEach(service => {
        for (const providerId in service.providers) {
            if (!providerSummary[providerId]) {
                providerSummary[providerId] = { summary: 0 };
            }
            providerSummary[providerId].summary += service.summary(providerId);
        }
    });

    return (
        <Container>
            <Row>
                <Col>AWS Summary: {providerSummary['aws'].summary ? providerSummary['aws'].summary : 0}</Col>
                <Col>GCP Summary: {providerSummary['gcp'].summary ? providerSummary['gcp'].summary : 0}</Col>
                <Col>Azure Summary: {providerSummary['azure'].summary ? providerSummary['azure'].summary : 0}</Col>
            </Row>
        </Container >
    )
}
