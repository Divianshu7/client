import React, { useEffect, useState } from 'react'
import { DatePicker, Select } from 'antd'
import 'tom-select'
import TomSelect from 'tom-select'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { SearchOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
const { Option } = Select
function Search() {
    const history = useNavigate()
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [bed, setBed] = useState('')
    useEffect(() => {
        // console.log('use')
        // console.log(moment())
        const conf = {
            valueField: 'display_name',
            labelField: 'display_name',
            searchField: 'display_name',
            maxItems: 1,
            // fetch remote data
            load: function (query, callback) {

                var url = `https://api.locationiq.com/v1/autocomplete?key=${process.env.REACT_APP_LOCATION_IQ_API}&q=` + encodeURIComponent(query);
                fetch(url)
                    .then(response => response.json())
                    .then(json => {
                        // console.log(json)
                        callback(json);
                    }).catch(() => {
                        console.log('error while fetching location api')

                        callback();
                    });

            },
            // custom rendering functions for options and items
            render: {
                option: function (item, escape) {
                    // console.log(escape)
                    return `<div class="py-2 d-flex">
                                <div>
                                    <div class="mb-1">
                                        <span class="p">
                                            ${escape(item.display_name)}
                                        </span>
                                    </div>
                                </div>
                            </div>`;
                },
                item: function (item, escape) {
                    // console.log(escape)
                    return `<div class="py-2 d-flex ">							
                                <div>
                                    <div class="mb-1">
                                        <span class="p">
                                            ${escape(item.display_name)}
                                        </span>	
                                    </div>					 	
                                </div>
                            </div>`;
                }
            }
        }
        new TomSelect('#loca', conf)

    }, [])
    const handleChange = (e) => {
        setLocation(e.target.value)
    }
    const handleSubmit = () => {
        // redirect(`/search-result?location=${location}&date=${date}&bed=${bed}`)
        history(`/search-result/${location}/${date}/${bed}`)


    }
    return (
        <div className='d-flex pb-4'>
            <div className='w-100 d-flex'>
                <select name='location' placeholder='location' className=' flex-grow-1' onChange={handleChange} id='loca' />
                <RangePicker onChange={(value, dateString) => setDate(dateString)} disabledDate={(current) => current.valueOf() < moment().subtract(1, 'days')} />
                <Select onChange={(value) => setBed(value)} className='' size='large' placeholder='Number of beds'>
                    <Option key={1} >{1}</Option>
                    <Option key={2} >{2}</Option>
                    <Option key={3} >{3}</Option>
                    <Option key={4} >{4}</Option>

                </Select>
                <SearchOutlined onClick={handleSubmit} className='btn pt-2 btn-primary ' />
            </div>
        </div>

    )
}

export default Search