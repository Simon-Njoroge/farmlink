import React from "react";
import { Container, Accordion } from "react-bootstrap";

const Faqs = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center text-success mb-4">Frequently Asked Questions</h2>
      <Accordion>
        {/* Question 1 */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>How do I rent a tractor or harvester?</Accordion.Header>
          <Accordion.Body>
            Renting is simple! Just follow these steps:
            <ol>
              <li>Choose a tractor, lorry, or processing equipment.</li>
              <li>Enter your details.</li>
              <li>Choose a service and pay with EcoCash.</li>
              <li>Receive your service.</li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 2 */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>How can I offer my equipment for rent?</Accordion.Header>
          <Accordion.Body>
            If you own equipment and want to rent it out:
            <ol>
              <li>Add your equipment and enter the required details.</li>
              <li>Confirm bookings from farmers.</li>
              <li>Provide the service as agreed.</li>
              <li>Receive your payment securely.</li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 3 */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Is EcoCash the only payment method?</Accordion.Header>
          <Accordion.Body>
            Currently, we support EcoCash for seamless transactions. We plan to integrate more payment methods in the future.
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 4 */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>How do I contact customer support?</Accordion.Header>
          <Accordion.Body>
            You can reach out to our support team via:
            <ul>
              <li>Email: support@farmlink.com</li>
              <li>Phone: +254 700 123 456</li>
              <li>Live Chat: Available on our website</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Faqs;
