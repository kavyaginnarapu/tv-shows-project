import React from 'react';
import { shallow,mount } from 'enzyme';
import Dashboard from './Dashboard';
import { act } from 'react-dom/test-utils';
import axios from "axios";

jest.mock("axios");
const data = {
    request: {
      data: [
          {
        "score":16.019352,
        "show":{
           "id":275,
           "url":"http://www.tvmaze.com/shows/275/ali-g-rezurection",
           "name":"Ali G: Rezurection",
           "type":"Scripted",
           "language":"English",
           "genres":[
              "Comedy"
           ],
                   
           "rating":{
              "average":5.8
           },
           
           "image":{
              "medium":"http://static.tvmaze.com/uploads/images/medium_portrait/60/152357.jpg",
              "original":"http://static.tvmaze.com/uploads/images/original_untouched/60/152357.jpg"
           },
           
        }
     },
     {
        "score":15.833251,
        "show":{
           "id":44163,
           "url":"http://www.tvmaze.com/shows/44163/bangkok-g-story",
           "name":"Bangkok G Story",
           "type":"Scripted",
           
           "genres":[
              "Drama",
              "Comedy"
           ],
           
           "rating":{
              "average":null
           },
           
           "image":{
              "medium":"http://static.tvmaze.com/uploads/images/medium_portrait/213/533970.jpg",
              "original":"http://static.tvmaze.com/uploads/images/original_untouched/213/533970.jpg"
           }
           }
        }]
     
    },
  };

describe("Dashboard component", () => {
    let wrapper;
    let wrapper1;
    const setState = jest.fn();
    let useEffect;
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
    const genresInfoData = ["Drama", "Science-Fiction", "Family"];
    const showsInfoData = [
        {
            id: 1,
            image: { medium: "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" },
            genres: ["Drama", "Science-Fiction"]
        },

        {
            id: 1,
            image: { medium: "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" },
            genres: ["Drama", "Science-Fiction"]
        }
    ];

    const mockUseEffect = ()=>{
        useEffect.mockImplementation (f => f());
    }
    let props;
   beforeEach(() => {
      jest.spyOn(React, 'useEffect').mockImplementation(f => f());

      //   useEffect = jest.spyOn(React,'useEffect');
      //   mockUseEffect();
      props = {
         setGenresInfo: jest.fn().mockResolvedValue(genresInfoData),
         setShowsInfo: jest.fn().mockResolvedValue(showsInfoData),
         setFilterData: jest.fn().mockResolvedValue(showsInfoData),
         setLoader: jest.fn().mockResolvedValue(false),
      };
      wrapper = shallow(<Dashboard {...props} />)
   });

    afterEach(()=>{
        jest.clearAllMocks();
    });  
    it("loads the authors", () => {
      expect(props.setShowsInfo).toHaveBeenCalled();
    });
    
//     it('fetches successfully data from an API', async () => {
//       const responseData = {
//               data: [
//                   {
//                           "id": 275,
//                           "url": "http://www.tvmaze.com/shows/275/ali-g-rezurection",
//                           "name": "Ali G: Rezurection",
//                           "type": "Scripted",
//                           "language": "English",
//                           "genres": [
//                               "Comedy"
//                           ],
      
//                           "rating": {
//                               "average": 5.8
//                           },
      
//                           "image": {
//                               "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/60/152357.jpg",
//                               "original": "http://static.tvmaze.com/uploads/images/original_untouched/60/152357.jpg"
//                           },
//                   },
//                   {
//                           "id": 44163,
//                           "url": "http://www.tvmaze.com/shows/44163/bangkok-g-story",
//                           "name": "Bangkok G Story",
//                           "type": "Scripted",
      
//                           "genres": [
//                               "Drama",
//                               "Comedy"
//                           ],
      
//                           "rating": {
//                               "average": null
//                           },
      
//                           "image": {
//                               "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/213/533970.jpg",
//                               "original": "http://static.tvmaze.com/uploads/images/original_untouched/213/533970.jpg"
//                           }
                   
//                   }]
                
//       };  
      
    
//     axios.get.mockImplementationOnce(() => Promise.resolve(responseData));
      

//     expect(axios.get).toHaveBeenCalledWith(
//       'https://api.tvmaze.com/shows'
//     );
//     expect(axios.get).toHaveBeenCalledTimes(1);
//   });
});