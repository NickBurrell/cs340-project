import React from 'react';
import {Container, Row, Alert} from "react-bootstrap";

function HomePage(props: {}) {

    // DISPLAY the acquisitions
    return (
        <>
            <article>
                <Container>
                <Row>
                    <h1>Welcome to GuildManager</h1>
                </Row>
                <Row>
                    <p>Welcome to GuildManager, a tool to help organize expeditions and adventurers for guilds in games like
                        World of Warcraft and many others. Here, you can add adventurers, expeditions, manage what adventurers
                        are on what roster, and even handle disbursements, loot, and acquisitions!</p>
                    <p>To get started, simply go to any of the tabs in the Navigation Bar.</p>
                </Row>
                <Row><Alert variant={"warning"}>This is is in very early alpha stages. The application works in its entirety, but there are many more planned features. Note that this site does not work on Internet Explorer. Please use Firefox or Google Chrome. </Alert></Row>
                </Container>
            </article>
        </>
    );
}

export default HomePage;