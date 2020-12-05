import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} | {item.alpha2Code} | {item.population} |
                {item.currencies.map((currency, index) => (
                  <>{currency.code}</>
                ))}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
export default App;
