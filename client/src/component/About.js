// import React from 'react'



import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1>About Our iNotebook App</h1>
            <p style={{ fontSize: "20px" }}>
                At Our iNotebook App, we are dedicated to providing you with the best tool to manage your tasks and stay organized. Our app is built with React, a powerful JavaScript library for building user interfaces.
            </p>
            <p style={{ fontSize: "20px" }}>
                With our app, you can create, organize your tasks effortlessly. React's component-based architecture allows us to create a seamless and intuitive user interface that ensures a smooth user experience.
            </p>
            <p style={{ fontSize: "20px" }}>
                Our app utilizes React's state management to keep track of your tasks and their status. You can easily add new tasks or notes you can delete and edit all the notes or tasks also.
            </p>

            <p style={{ fontSize: "20px" }}>
                This app also provides a secure login and logout functionality. You can create an account, sign in, and securely access your iNotebook. We prioritize the protection of your data and ensure that your information is handled with the utmost confidentiality and security.

            </p>
            <p style={{ fontSize: "20px" }}>
                Thank you for choosing Our iNotebook App. We hope that our commitment to leveraging React's power and flexibility, along with our login and logout functionality, enhances your productivity and helps you achieve your goals efficiently.

            </p>
        </div>
    );
};

export default AboutPage;

