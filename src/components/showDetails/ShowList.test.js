import React from 'react';
import { shallow } from 'enzyme';
import ShowList from './ShowList';

describe("renders show list component", () => {
    let wrapper;
    let props;
    const data = [
        {
            id: 1,
            image: { medium: "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" },
            genres: ["Drama", "Science-Fiction"],
            rating: {
                "average": 3
            }
        },
        {
            id: 2,
            image: { medium: "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" },
            genres: ["Drama", "Science-Fiction", "comedy"],
            rating: {
                "average": 3
            }
        }
    ];
    const width = 'xl';

    beforeEach(() => {
        props = { data }
        wrapper = shallow(<ShowList {...props} />)
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should render  component", () => {
        wrapper.find("[data-test='grid-list']")
    });

});