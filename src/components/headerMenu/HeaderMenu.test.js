import React from 'react';
import { shallow, mount } from 'enzyme';
import HeaderMenu from './HeaderMenu';
import axios from "axios";
import renderer, { act } from "react-test-renderer";
import IconButton from '@material-ui/core/IconButton';

jest.mock("axios");
const data = {
    request: {
        data: [
            {
                "score": 16.019352,
                "show": {
                    "id": 275,
                    "url": "http://www.tvmaze.com/shows/275/ali-g-rezurection",
                    "name": "Ali G: Rezurection",
                    "type": "Scripted",
                    "language": "English",
                    "genres": [
                        "Comedy"
                    ],

                    "rating": {
                        "average": 5.8
                    },

                    "image": {
                        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/60/152357.jpg",
                        "original": "http://static.tvmaze.com/uploads/images/original_untouched/60/152357.jpg"
                    },

                }
            },
            {
                "score": 15.833251,
                "show": {
                    "id": 44163,
                    "url": "http://www.tvmaze.com/shows/44163/bangkok-g-story",
                    "name": "Bangkok G Story",
                    "type": "Scripted",

                    "genres": [
                        "Drama",
                        "Comedy"
                    ],

                    "rating": {
                        "average": null
                    },

                    "image": {
                        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/213/533970.jpg",
                        "original": "http://static.tvmaze.com/uploads/images/original_untouched/213/533970.jpg"
                    }
                }
            }]

    },
};

describe("Header menu component", () => {
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    const genresInfoData = ["Drama", "Science-Fiction", "Family"];

    const showsInfoData = [
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

    beforeEach(() => {
        let props;
        const handleChangeSpy = jest.fn();
        props = { filterGenresData: () => { }, genresName: () => { } }
        wrapper = shallow(<HeaderMenu genresInfo={genresInfoData}
            showsInfo={showsInfoData}  {...props} />)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    test('has a wrapper instance', () => {​​
        expect(wrapper.instance()).toBeTruthy();
      }​​);

    it("should render header component", () => {
        expect(wrapper.find(".header-wrapper")).toHaveLength(1);
    });

    it("should render checking header text", () => {
        expect(wrapper.find("[data-test='header-text']").text()).toEqual('TV SHOWS');
    });

    it("should render checking Drawer(genres) list length", () => {
        expect(wrapper.find("[data-test='genres-selection']")).toHaveLength(3);
    });
    it("should render  generes click", () => {
        wrapper.find("[data-test='genres-selection']").at(2).simulate('click', 'Drama');
    });

    it("should render  checkin onclick function on close drawer", () => {
        wrapper.find("[data-test='handle-drawer']").simulate('click');
        expect(wrapper.find("[data-test='drawer-tag']").prop('open')).toBe(false);
    });

    it("should render  checkin onclick dwawer open function on navigation genres", () => {
        wrapper.find("[data-test='drawer-open']").simulate('click')
        expect(wrapper.find("[data-test='drawer-tag']").prop('open')).toBe(true);
    });

    // wrapper.find("[data-test='genres-selection']").at(2).simulate('click','Drama');

    it("api call test running header onchange", () => {
        // wrapper.instance().fetchData = jest.fn();

         let event = { target: { value: 'girls' } };
        // const fetchData = jest.fn();
        // wrapper.find("[data-test='search-movies']").simulate('change', event);
        // expect(wrapper.instance())
        console.log("onchnage==>", wrapper.instance());
        wrapper.instance().fetchData = jest.fn();
        wrapper.update();
        wrapper.instance().handleChange(event);
        expect(wrapper.instance().fetchData).toBeCalledWith(event);
    });




});


