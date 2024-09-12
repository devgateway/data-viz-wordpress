import React, { Component } from "react";
import { Container, Icon, Menu, Sidebar } from "semantic-ui-react";
import PropTypes from "prop-types";
import MainMenu, { ***REMOVED*** } from "@devgateway/wp-react-lib";
import { Media } from "../AppMedia";
import Footer from "./Footer";
import Header from "./Header";
import TopNavigator from "./TopNavigator";
import ***REMOVED*** from "./Customizer";

class ***REMOVED*** extends Component {
  render() {
    const { children, fixed } = this.props;
    return (
      <Container fluid>
        <***REMOVED***>
          <***REMOVED*** key={"header"}>
            <Header></Header>
          </***REMOVED***>
        </***REMOVED***>
        <Container className="desktop">{children}</Container>
        <***REMOVED***>
          <TopNavigator key={"header"} />
        </***REMOVED***>
      </Container>
    );
  }
}

***REMOVED***.propTypes = {
  children: PropTypes.node,
};

class ***REMOVED*** extends Component {
  state = {};
  ***REMOVED*** = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, big } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Container>
        <Sidebar
          as={Menu}
          animation="push"
          onHide={this.***REMOVED***}
          vertical
          visible={sidebarOpened}
        >
          <Container>
            <MainMenu slug="main" />
          </Container>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Container fluid>
            <Menu>
              <Menu.Item onClick={this.handleToggle}>
                {" "}
                <Icon name="sidebar" color="orange" />{" "}
              </Menu.Item>
            </Menu>
            {children}
          </Container>
        </Sidebar.Pusher>
      </Container>
    );
  }
}

***REMOVED***.propTypes = {
  children: PropTypes.node,
};

class ***REMOVED*** extends Component {
  render() {
    const { children, fixed } = this.props;
    return (
      <div>
        <style>{Media.mediaStyles}</style>

        <***REMOVED*** fixed={fixed}>{children}</***REMOVED***>
        <Footer></Footer>
      </div>
    );
  }
}

export default ***REMOVED***;
