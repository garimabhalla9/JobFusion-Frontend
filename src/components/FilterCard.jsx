import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'


const filterData = [
  {
    filterType: "Location",
    array: ["Gurgaon", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science Engineer",
      "Graphic Designer",
      "Full Stack Developer",
      "Cloud Engineer",
    ],
  },
  {
    filterType: "Salary",
    array: ["1-3lakh", "4-8lakh", "9-16lakh", "17-24lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
      <div className='w-full bg-white p-3 rounded-md'>
          <h1 className='font-bold text-lg'>Filter Jobs</h1>
          <hr className='mt-3' />
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
              {
                  filterData.map((data, index) => (
                      <div key={data.filterType} className="mt-4">
                          <h1 className='font-bold text-lg'>{data.filterType}</h1>
                          {
                              data.array.map((item, idx) => {
                                  const itemId = `id${index}-${idx}`
                                  return (
                                      <div key={itemId} className='flex items-center space-x-2 my-2'>
                                          <RadioGroupItem value={item} id={itemId} />
                                          <Label htmlFor={itemId}>
                                              {data.filterType === "Salary" 
                                                  ? item.replace("lakh", " LPA").replace("-", " - ") 
                                                  : item}
                                          </Label>
                                      </div>
                                  )
                              })
                          }
                      </div>
                  ))
              }
          </RadioGroup>
      </div>
  )
}

export default FilterCard;
