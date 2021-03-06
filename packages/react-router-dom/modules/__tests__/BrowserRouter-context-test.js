import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import BrowserRouter from "../BrowserRouter";
import RouterContext from "../RouterContext";

describe("A <BrowserRouter>", () => {
  const node = document.createElement("div");

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("context", () => {
    let context;
    function ContextChecker() {
      return (
        <RouterContext.Consumer>
          {value => {
            context = value;
            return null;
          }}
        </RouterContext.Consumer>
      );
    }

    it("has a `history` property", () => {
      ReactDOM.render(
        <BrowserRouter>
          <ContextChecker />
        </BrowserRouter>,
        node
      );

      expect(context).toBeDefined();
      expect(typeof context.history).toBe("object");
    });
  });

  describe("legacy context", () => {
    let context;
    class LegacyContextChecker extends React.Component {
      static contextTypes = {
        router: PropTypes.object.isRequired
      };

      render() {
        context = this.context.router;
        return null;
      }
    }

    it("has a `history` property", () => {
      ReactDOM.render(
        <BrowserRouter>
          <LegacyContextChecker />
        </BrowserRouter>,
        node
      );

      expect(context).toBeDefined();
      expect(typeof context.history).toBe("object");
    });
  });
});
