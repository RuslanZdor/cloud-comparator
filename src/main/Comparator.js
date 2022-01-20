import React from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import CreateNewService from "./CreateNewService";
import FinishedService from "./FinishedService";
import { BsArrowsExpand, BsArrowsCollapse } from "react-icons/bs";
import { AiFillDelete } from 'react-icons/ai';


export default function Comparator(props) {

    let services = props.currentServices;

    const expandAllHandler = () => {

    }

    const collapseAllHandler = () => {

    }

    const deleteAllHandler = () => {
        props.removeAllServices();
    }
    return (
        <Container>
            <Row>
                <Col>AWS</Col>
                <Col>GCP</Col>
                <Col>Azure</Col>
            </Row>
            <Row>
                <Container>
                    <Row>
                        <Col>
                            <BsArrowsExpand onClick={expandAllHandler} />
                        </Col>
                        <Col>
                            <BsArrowsCollapse onClick={collapseAllHandler} />
                        </Col>
                        <Col>
                            <AiFillDelete onClick={deleteAllHandler} />
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Accordion defaultActiveKey="0" alwaysOpen>
                {services && [...services.keys()].map(key => {
                    if (services.get(key).isFinished) {
                        return (<Row key={key}>
                            <FinishedService service={services.get(key)}
                                removeService={props.removeService}
                                editService={props.editService} />
                        </Row>)
                    } else {
                        return (<Row key={key}>
                            <CreateNewService service={services.get(key)}
                                saveNewService={props.saveNewService}
                                removeService={props.removeService} />
                        </Row>)
                    }
                })}
            </Accordion>
        </Container >
    )
}