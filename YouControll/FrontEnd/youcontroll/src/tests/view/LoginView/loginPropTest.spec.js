//Teste está separado pois o SeleniumIDE não estava conseguindo ler a props de handleLogin
import React from "react";
import { Builder } from "selenium-webdriver";
import { mount, configure } from "enzyme";
import Login from "../../../view/LoginView.jsx";
import { MemoryRouter } from 'react-router-dom';
import { JSDOM } from "jsdom";
import { expect } from 'chai';

import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
global.document = window.document;
global.window = window;

describe("LoginPropTest", function () {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    vars = {};
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("should have the correct prop type for handleLogin", async function () {
    const wrapper = mount(
      <MemoryRouter>
        <Login handleLogin={() => {}} />
      </MemoryRouter>
    );
    const loginComponent = wrapper.find(Login); // Find the Login component
    const handleLoginProp = loginComponent.prop("handleLogin"); // Get the value of the handleLogin prop
    expect(typeof handleLoginProp).to.equal("function"); // Perform the assertion
  });
});
