import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand>Employee Management</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Funcionário
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to="/employees/create">
                                    <DropdownItem>Criar</DropdownItem>
                                </Link>

                                <Link to="/employees">
                                    <DropdownItem>Listar</DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Cargo
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to="/roles/create">
                                    <DropdownItem>Criar</DropdownItem>
                                </Link>
                                <Link to="/roles">
                                    <DropdownItem>Listar</DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;