import { FormSelect } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';

export default function SelectService(props) {
    let selectInput = React.createRef();

    let AddServiceClickHandler = (e) => {
        props.addCurrentService(String(selectInput.current.value));
    }

    return (
        <Form>
            <FormSelect aria-label='Select service' ref={selectInput}>
                <option value="0">Open this select menu</option>
                {props.services.map(service => {
                    return (
                        <option key={service.id} value={service.id}>{service.name}</option>
                    )
                })}
            </FormSelect>
            <Button variant="primary" type="button" onClick={AddServiceClickHandler}>Add Service</Button>
        </Form>
    );
}

