import { useEffect, useState, useContext } from 'react';
import Pizza from './Pizza';
import Cart from './Cart';
import { CartContext } from './contexts';

const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState('pepperoni');
  const [pizzaSize, setPizzaSize] = useState('M');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  async function checkout() {
    setLoading(true);

    await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart })
    });

    setCart([]);
    setLoading(false);
  }

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find(pizza => pizza.id === pizzaType);
    price = intl.format(selectedPizza.sizes[pizzaSize]);
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
    <div className="order-page">
      <div className='order'>
        <h2>Create Order</h2>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
          }}
        >
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
            <p>{price}</p>
          </div>
        </form>
      </div>
      { loading ? <h2>LOADING ...</h2> : <Cart cart={cart} checkout={checkout} /> }
    </div>
  );
}
