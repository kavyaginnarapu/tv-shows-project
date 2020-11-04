import React from 'react';
import { shallow,mount } from 'enzyme';
import ShowDetails from './ShowDetails';
describe("Header menu component", () => {
   let wrapper;
    beforeEach(() => {
        wrapper = shallow(<ShowDetails/>)
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });
    it("should render checking breadcrumb text", () => {
        expect(wrapper.find("[data-test='breadcrumb-dashboard']").text()).toEqual('Dashboard');
    });
    
});

  
