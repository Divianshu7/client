import React, { useEffect, useState } from 'react'
import { DatePicker, Select } from 'antd'
import 'tom-select'
import TomSelect from 'tom-select'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
const { Option } = Select
const HotelCreateForm = (props) => {
    const history = useNavigate()
    const { values, setValues, handleChange, handleImageChange, handleSubmit } = props
    const { title, content, location, image, price, from, to, bed } = values
    useEffect(() => {
        // console.log('use')
        console.log('yes')
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

    return (<>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='btn btn-outline-secondary btn-block m-2 text-left'>Image
                    <input type='file' name='image' onChange={handleImageChange} accept='image/*' hidden ></input>
                </label>
                <input type='text' onChange={handleChange} className='form-control m-2' value={title} name='title' placeholder='Title' ></input>
                <textarea onChange={handleChange} className='form-control m-2' value={content} name='content' placeholder='Content' />
                <select id='loca' name='location' type='text' onChange={handleChange} className='form-control m-2' placeholder='Location' />
                <input type='number' onChange={handleChange} className='form-control m-2' value={price} name='price' placeholder='Price' ></input>

                <Select placeholder='Number of Beds' className='form-control m-2' onChange={(e) => setValues({ ...values, bed: e })} >
                    <Option key={1}>1</Option>
                    <Option key={2}>2</Option>
                    <Option key={3}>3</Option>
                    <Option key={4}>4</Option>

                </Select>
                <DatePicker placeholder='from date' disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')} className='form-control m-2' onChange={(date, dateString) => setValues({ ...values, from: dateString })} />
                <DatePicker placeholder='to date' disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')} className='form-control m-2' onChange={(date, dateString) => setValues({ ...values, to: dateString })} />
                <button className='btn btn-primary' type='submit'>Submit</button>
            </div>
        </form>
    </>)
}
export default HotelCreateForm