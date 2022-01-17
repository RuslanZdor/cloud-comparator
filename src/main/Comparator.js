import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CreateNewService from "./CreateNewService";
import FinishedService from "./FinishedService"


export default function Comparator(props) {

    let services = props.currentServices;

    return (
        <Container>
            <Row>
                <Col>AWS</Col>
                <Col>GCP</Col>
                <Col>Azure</Col>
            </Row>

            {services && [...services.keys()].map(key => {
                if (services.get(key).isFinished) {
                    return (<Row key={key}>
                        <FinishedService service={services.get(key)} />
                    </Row>)
                } else {
                    return (<Row key={key}>
                        <CreateNewService service={services.get(key)} saveNewService={props.saveNewService} />
                    </Row>)
                }
            })}
        </Container >
    )
}