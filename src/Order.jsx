import Pizza from './Pizza';

export default function Order() {
  const pizzaType = 'pepperoni';
  const pizzaSize = 'M';
  return (
    <div className='order'>
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select name="pizza-type" value={pizzaType}>
              <option value="pepperoni">The Pepperoni Pizza</option>
              <option value="hawaiian">The Hawaiian Pizza</option>
              <option value="big_meat">The Big Meat Pizza</option>
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input 
                  type="radio" 
                  name="pizza-size" 
                  value="S" 
                  checked={pizzaSize === 'S'} 
                  id='pizza-s'
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input 
                  type="radio" 
                  name="pizza-size" 
                  value="M" 
                  checked={pizzaSize === 'M'} 
                  id='pizza-m'
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input 
                  type="radio" 
                  name="pizza-size" 
                  value="L" 
                  checked={pizzaSize === 'L'} 
                  id='pizza-l'
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className='order-pizza'>
          <Pizza 
            name="Pepperoni"
            description="another pep pizza"
            image="/public/pizzas/pepperoni.webp"
          />
          <p>$13.37</p>
        </div>
      </form>
    </div>
  );
}