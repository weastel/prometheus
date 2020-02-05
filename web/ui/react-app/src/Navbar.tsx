import './globals';
import React, { FC, useState } from 'react';
import { Link } from '@reach/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PathPrefixProps from './types/PathPrefixProps';

// Declared/defined in public/index.html, value replaced by Prometheus when serving bundle.
declare const CONSOLES_LINK: string;

let consoleLink = CONSOLES_LINK;
if (CONSOLES_LINK === 'CONSOLES_LINK_PLACEHOLDER' || CONSOLES_LINK === '') {
  consoleLink = '';
}

const Navigation: FC<PathPrefixProps> = ({ pathPrefix }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar className="mb-3" dark color="dark" expand="md" fixed="top">
      <NavbarToggler onClick={toggle} />
      <Link className="pt-0 navbar-brand" to={`${pathPrefix}/new/graph`}>
        Prometheus
      </Link>
      <Collapse isOpen={isOpen} navbar style={{ justifyContent: 'space-between' }}>
        <Nav className="ml-0" navbar>
          {consoleLink !== '' && (
            <NavItem>
              <NavLink href={`${pathPrefix + consoleLink}`}>Consoles</NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink tag={Link} to={`${pathPrefix}/new/alerts`}>
              Alerts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`${pathPrefix}/new/graph`}>
              Graph
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Status
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag={Link} to={`${pathPrefix}/new/status`}>
                Runtime & Build Information
              </DropdownItem>
              <DropdownItem tag={Link} to={`${pathPrefix}/new/tsdb-status`}>
                TSDB Status
              </DropdownItem>
              <DropdownItem tag={Link} to={`${pathPrefix}/new/flags`}>
                Command-Line Flags
              </DropdownItem>
              <DropdownItem tag={Link} to={`${pathPrefix}/new/config`}>
                Configuration
              </DropdownItem>
              <DropdownItem tag={Link} to={`${pathPrefix}/new/rules`}>
                Rules
              </DropdownItem>
              <DropdownItem tag={Link} to={`${pathPrefix}/new/targets`}>
                Targets
              </DropdownItem>
              <DropdownItem tag={Link} to={`${pathPrefix}/new/service-discovery`}>
                Service Discovery
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="https://prometheus.io/docs/prometheus/latest/getting_started/">Help</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`${pathPrefix}/graph${window.location.search}`}>Classic UI</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
