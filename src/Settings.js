import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Settings() {
  return (
    <div>
      <h2>Settings</h2>
      <Form>
        <Form.Group controlId="formEmailNotifications">
          <Form.Check type="checkbox" label="Enable Email Notifications" />
        </Form.Group>
        <Form.Group controlId="formDarkMode">
          <Form.Check type="checkbox" label="Enable Dark Mode" />
        </Form.Group>
        <Button variant="primary" type="submit">Save Changes</Button>
      </Form>
    </div>
  );
}

export default Settings;
