import React from 'react';
import { shallow,mount } from 'enzyme';
import ShowDetails from './ShowDetails';
describe("Header menu component", () => {
   let wrapper;
   let useEffect;

   const mockUseEffect = ()=>{
    useEffect.mockImplementation (f => f());
    }   
    beforeEach(() => {
        useEffect = jest.spyOn(React,'useEffect');
        mockUseEffect();
        wrapper = shallow(<ShowDetails/>)
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });
    it("should render checking breadcrumb text", () => {
        // expect(wrapper.find("[data-test='breadcrumb-dashboard']").text()).toEqual('Dashboard');
        console.log("dashboard==>",wrapper.find("[data-test='breadcrumb-dashboard']").text())
    });

    // it("testing",()=>{
    //     console.log("shodeta wrapper",wrapper.debug())
    // })    
    
});
   
  
