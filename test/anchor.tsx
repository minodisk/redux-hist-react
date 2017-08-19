import {mount} from "enzyme";
import "jsdom-global/register";
import "mocha";
import {
  deepStrictEqual,
  strictEqual,
} from "power-assert";
import * as React from "react";
import {Provider} from "react-redux";
import {push} from "redux-hist";
import configureStore from "redux-mock-store";
import {spy} from "sinon";

import {Anchor} from "../lib";

const mockStore = configureStore();

describe("<Anchor>", () => {

  describe("DOM", () => {

    it("should be <a>",  () => {
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor />
        </Provider>,
      );
      strictEqual(wrapper.find("a").length, 1);
    });

  });

  describe("onClick", () => {

    it("should dispatch push action", () => {
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor
            href="/foo"
          />
        </Provider>,
      );
      wrapper.find("a").simulate("click");
      deepStrictEqual(store.getActions(), [push("/foo")]);
    });

    it("should be overwritten by onClick prop", () => {
      const onClick = spy();
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor
            onClick={onClick}
          />
        </Provider>,
      );
      wrapper.find("a").simulate("click");
      strictEqual(onClick.callCount, 1);
      deepStrictEqual(store.getActions(), []);
    });

  });

});
