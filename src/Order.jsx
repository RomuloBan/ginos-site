import { useEffect, useState } from 'react';
import Pizza from './Pizza';

const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState('pepperoni');
  const [pizzaSize, setPizzaSize] = useState('M');
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find(pizza => pizza.id === pizzaType);
  }

  async function fetchPizzaTypes() {
    const response = await fetch('/api/pizzas');
    const data = await response.json();
    setPizzaTypes(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  return (
    <div className='order'>
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select 
              name="pizza-type" 
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {loading && <option>Loading...</option>}
              {!loading && pizzaTypes.map(pizza => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
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
                  onChange={(e) => setPizzaSize(e.target.value)}
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
                  onChange={(e) => setPizzaSize(e.target.value)}
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
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className='order-pizza'>
          <Pizza 
            name={selectedPizza?.name}
            description={selectedPizza?.description}
            image={selectedPizza?.image}
          />
          <p>$13.37</p>
        </div>
      </form>
    </div>
  );
}