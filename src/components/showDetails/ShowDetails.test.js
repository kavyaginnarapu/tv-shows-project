import React from 'react';
import { shallow, mount } from 'enzyme';
import ShowDetails from './ShowDetails';

global.window = Object.create(window);
const url = "#/showdetails/169"
Object.defineProperty(window, 'location', {
    value: {
        hash: url
    }
});

jest.mock("axios");

describe("SHOW DEATILS menu component", () => {
    let wrapper;

    beforeEach(() => {

        wrapper = shallow(<ShowDetails />)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should render checking breadcrumb text", () => {
        wrapper.find("[data-test='breadcrumb-dashboard']")
    });
});