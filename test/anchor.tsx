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

import {Anchor} from "../src-dist";

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

    it("should call onClick prop and dispatch push action", () => {
      const onClick = spy();
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor
            href="/foo"
            onClick={onClick}
          />
        </Provider>,
      );
      wrapper.find("a").simulate("click");
      strictEqual(onClick.callCount, 1);
      deepStrictEqual(store.getActions(), [push("/foo")]);
    });

    it("shouldn't dispatch push action when the event has been prevented by onClick prop", () => {
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor
            href="/foo"
            onClick={(e) => e.preventDefault()}
          />
        </Provider>,
      );
      wrapper.find("a").simulate("click");
      deepStrictEqual(store.getActions(), []);
    });

    it("shouldn't dispatch push action with any meta key", () => {
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor
            href="/foo"
          />
        </Provider>,
      );
      const a = wrapper.find("a");
      [
        {altKey: true},
        {ctrlKey: true},
        {shiftKey: true},
        {metaKey: true},
      ].forEach((data) => {
        a.simulate("click", data);
        deepStrictEqual(store.getActions(), []);
      });
    });

    it("shouldn't dispatch push action without main button", () => {
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor
            href="/foo"
          />
        </Provider>,
      );
      const a = wrapper.find("a");
      [
        {button: 1},
        {button: 2},
        {button: 3},
        {button: 4},
      ].forEach((data) => {
        a.simulate("click", data);
        deepStrictEqual(store.getActions(), []);
      });
    });

    it("should dispatch push action when target prop is _self", () => {
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor
            href="/foo"
            target="_self"
          />
        </Provider>,
      );
      wrapper.find("a").simulate("click");
      deepStrictEqual(store.getActions(), [push("/foo")]);
    });

    it("shouldn't dispatch push action when target prop isn't _self", () => {
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor
            href="/foo"
            target="_blank"
          />
        </Provider>,
      );
      wrapper.find("a").simulate("click");
      deepStrictEqual(store.getActions(), []);
    });

    it("shouldn't dispatch push action without href prop", () => {
      const store = mockStore();
      const wrapper = mount(
        <Provider store={store}>
          <Anchor />
        </Provider>,
      );
      wrapper.find("a").simulate("click");
      deepStrictEqual(store.getActions(), []);
    });

  });

});
