import {Link} from "react-router-dom";
import {Container, Navbar, Nav} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

function Navigation1(props:{}) {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/adventurers">Manage Adventurers</Link>
                <Link to="/expeditions">Manage Expeditions</Link>
                <Link to="/expedition_rosters">Manage Expedition Members</Link>
                <Link to="/acquisitions">Manage Acquisitions</Link>
                <Link to="/disbursements">Manage Disbursements</Link>
            </nav>
        </>
    )
}

function Navigation(props:{bg_color:string} = {bg_color: "light"}) {
    return (
        <>
            <Navbar expand={"lg"} bg={props.bg_color} variant={"dark"}>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >GuildManager</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls={"basic-navbar-nav"} />
                    <Navbar.Collapse id={"basic-navbar-nav"}>
                        <Nav className={"me-auto"}>
                            <LinkContainer to={"/"}>
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/adventurers"}>
                                <Nav.Link>Adventurers</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/expeditions"}>
                                <Nav.Link>Expeditions</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/expedition_rosters"}>
                                <Nav.Link>Expedition Members</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/acquisitions"}>
                                <Nav.Link>Acquisitions</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/disbursements"}>
                                <Nav.Link>Disbursements</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation;