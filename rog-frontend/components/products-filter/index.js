import { useState } from 'react';
import { useRouter } from 'next/router';
import Checkbox from './form-builder/checkbox';
import CheckboxColor from './form-builder/checkbox-color';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import { useForm } from "react-hook-form";

import { API_URL } from '../../utils/urls';

// data
import productsTypes from './../../utils/data/products-types';
import productsColors from './../../utils/data/products-colors';
import productsSizes from './../../utils/data/products-sizes';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const ProductsFilter = ({categories, choseType, query}) => {
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const addQueryParams = () => {
    console.log(selectedCategory)
  }

  return (
    <form className="products-filter" onChange={addQueryParams}>
      <button type="button" 
        onClick={() => setFiltersOpen(!filtersOpen)} 
        className={`products-filter__menu-btn ${filtersOpen ? 'products-filter__menu-btn--active' : ''}`}>
          Add Filter <i className="icon-down-open"></i>
      </button>
      
      <div className={`products-filter__wrapper ${filtersOpen ? 'products-filter__wrapper--open' : ''}`}>
        <div className="products-filter__block">
          <button type="button">Categories</button>
          <div className="products-filter__block__content">
            {categories.map(category => (
              <Checkbox 
                key={category.id} 
                name="product-type" 
                label={category.Name} 
                onChange={()=>{choseType(category.Name)}}
                query={query}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range min={0} max={1000} defaultValue={[0, 1000]} tipFormatter={value => `${value}$`} onChange={(e)=>{
                console.log(e)
            }} />
          </div>
        </div>
        
        <button type="submit" className="btn btn-submit btn--rounded btn--yellow">Apply</button>
      </div>
    </form>
  )
}
  
export default ProductsFilter
  