import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: res.data,
        tableData: slice,
      });
    });
  }

  render() {
    return (
      <>
        <table border="1">
          <thead>
            <th>Name</th>
            <th>Alpha2Code</th>
            <th>Population</th>
            <th>CurrencyCode</th>
          </thead>
          <tbody>
            {this.state.tableData.map((tdata, index) => (
              <tr>
                <td>{tdata.name}</td>
                <td>{tdata.alpha2Code}</td>
                <td>{tdata.population}</td>
                <td>
                  {tdata.currencies.map((cdata, index) => (
                    <p>{cdata.code}&nbsp;</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"«"}
          nextLabel={"»"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </>
    );
  }
}

export default Page;
