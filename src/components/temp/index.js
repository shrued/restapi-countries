import React, { Component } from "react";

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      length: null,
      id: 0,
      visible: true,
    };
    this.setVisibility = this.setVisibility.bind(this);
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
          length: json.length,
        });
      });
  }

  setVisibility() {
    this.setState({
      visible: false,
    });
  }

  render() {
    var { isLoaded, items, length, id, visible } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul>
            {items.map((item, index) => (
              <>
                {index < id + 5 && index > id - 1 ? (
                  <li key={index}>
                    {item.name} | {item.alpha2Code} | {item.population} |
                    {item.currencies.map((currency, index) => (
                      <>{currency.code}</>
                    ))}
                  </li>
                ) : null}
              </>
            ))}
          </ul>
          {console.log(id, length)}

          {id + 5 < length ? (
            <button onClick={() => this.setState({ id: id + 5 })}>Next</button>
          ) : null}
          {console.log(visible)}
        </div>
      );
    }
  }
}

export default Countries;
