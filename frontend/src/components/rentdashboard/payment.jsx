import React, { useState } from "react";
import { Card, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const payments = [
  { transactionId: "TXN12345", amount: 5000, method: "mpesa", status: true },
];

const PaymentPage = () => {
  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredPayments = payments.filter((payment) => {
    return (
      payment.transactionId.toLowerCase().includes(search.toLowerCase()) &&
      (filterMethod ? payment.method === filterMethod : true) &&
      (filterStatus !== "" ? payment.status === (filterStatus === "paid") : true)
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Payment Records</h2>
      <Card className="p-3 shadow">
        <div className="d-flex mb-3 gap-3">
          <Form.Control
            type="text"
            placeholder="Search by Transaction ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)}>
            <option value="">All Methods</option>
            <option value="mpesa">M-Pesa</option>
          </Form.Select>
          <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </Form.Select>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount (Ksh)</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.transactionId}>
                <td>{payment.transactionId}</td>
                <td>{payment.amount}</td>
                <td>{payment.method.toUpperCase()}</td>
                <td>{payment.status ? "Paid" : "Unpaid"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default PaymentPage;
