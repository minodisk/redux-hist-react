import {mount} from "enzyme";
import "jsdom-global/register";
import "mocha";
import {strictEqual} from "power-assert";
import * as React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {Link} from "../lib";

describe("<Link>", () => {

  describe("to", () => {

    it("should be href",  () => {
      const mockStore = configureStore();
      const wrapper = mount(<Provider store={mockStore()}><Link to="/users" /></Provider>);
      strictEqual(wrapper.find("a").length, 1);
    });

  });

});
