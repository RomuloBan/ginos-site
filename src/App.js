const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's"),
    React.createElement(Pizza, {
      name: "Peperoni Pizza",
      description: "The best pizza in town",
    }),
    React.createElement(Pizza, {
      name: "Americano Pizza",
      description: "The best cheese pizza in town",
    }),
    React.createElement(Pizza, {
      name: "Hawaiian Pizza",
      description: "The best pine-apple pizza in town",
    }),
    React.createElement(Pizza, {
      name: "Italian Pizza",
      description: "The best peperoni pizza in town",
    }),
  ]);
};

// ReactDOM.render(App(), document.getElementById('root'));
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
