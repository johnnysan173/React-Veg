import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./index.css";
import Emoji from "./Components/emoji.js";

class VegeBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomVege: [],
      kyuriCount: 0,
      nasuCount: 0,
      tomatoCount: 0
    };
  }

  componentDidMount() {
    let { randomArray, countA, countB, countC } = this.genRandom();
    this.setState({
      randomVege: randomArray,
      kyuriCount: countA,
      nasuCount: countB,
      tomatoCount: countC
    });
  }

  genRandom() {
    let randomArray = [];
    let countA = 0;
    let countB = 0;
    let countC = 0;
    for (let j = 0; j < 4; j++) {
      randomArray[j] = [];
      for (let i = 0; i < 4; i++) {
        randomArray[j][i] = Math.floor(Math.random() * 4) + 1;
        switch (randomArray[j][i]) {
          case 1:
            countA++;
            break;
          case 2:
            countB++;
            break;
          case 3:
            countC++;
            break;
          default:
        }
      }
    }
    return { randomArray, countA, countB, countC };
  }

  harvest(nasu, kyuri, tomato) {}

  genNew() {
    let { randomArray, countA, countB, countC } = this.genRandom();
    this.setState({
      randomVege: randomArray,
      kyuriCount: countA,
      nasuCount: countB,
      tomatoCount: countC
    });
    alert("収穫成功〜");
  }

  render() {
    const rowx = this.state.randomVege.map((x, i) => {
      let y = x.map((x, i) => {
        if (x === 1)
          return (
            <td key={i}>
              <Emoji symbol="🥒" />
            </td>
          );
        if (x === 2)
          return (
            <td key={i}>
              <Emoji symbol="🍆" />
            </td>
          );
        if (x === 3)
          return (
            <td key={i}>
              <Emoji symbol="🍅" />
            </td>
          );
        if (x === 4)
          return (
            <td key={i}>
              <Emoji symbol="🐌" />
            </td>
          );
        return x;
      });

      return <tr key={i}>{y}</tr>;
    });

    return (
      <div>
        <Title>野菜収穫作戦</Title>

        <table className="book">
          <tbody>{rowx}</tbody>
        </table>
        {/* <div>
          <div>Result</div>
          <Emoji symbol="🥒" />
          {this.state.kyuriCount}
          <Emoji symbol="🍆" />
          {this.state.nasuCount}
          <Emoji symbol="🍅" />
          {this.state.tomatoCount}
        </div> */}
        <VegeEntry
          genNew={() => this.genNew()}
          kyuriCount={this.state.kyuriCount}
          nasuCount={this.state.nasuCount}
          tomatoCount={this.state.tomatoCount}
        />
      </div>
    );
  }
}

class VegeEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nasu: 0,
      tomato: 0,
      kyuri: 0,
      status: "栽培中"
    };
  }

  componentDidMount() {
    // console.log(this.state.nasuCount);
  }
  onClickSubmit() {
    const farm = [
      this.props.kyuriCount,
      this.props.nasuCount,
      this.props.tomatoCount
    ];
    const harvest = [this.state.kyuri, this.state.nasu, this.state.tomato];
    console.log(farm);
    console.log(harvest);

    let winlose = true;
    farm.forEach((x, i) => {
      if (x !== harvest[i]) {
        winlose = false;
        return true;
      }
    });
    console.log(winlose);
    if (winlose) {
      this.setState({ status: "収穫成功" });
      this.props.genNew();
      this.setState({ nasu: 0, tomato: 0, kyuri: 0, status: "栽培中" });
    } else {
      this.setState({ status: "収穫失敗" });
      alert("数量合わないよ〜");
    }
  }
  onClickTry(event) {
    // alert(event.target.name);
    switch (event.target.name) {
      case "nasu":
        let qtyNasu = this.state.nasu + 1;
        this.setState({ nasu: qtyNasu });
        break;

      case "tomato":
        let qtyChg = this.state.tomato + 1;
        this.setState({ tomato: qtyChg });
        break;

      case "kyuri":
        let qtykyu = this.state.kyuri + 1;
        this.setState({ kyuri: qtykyu });
        break;

      case "clear":
        this.setState({ nasu: 0, tomato: 0, kyuri: 0 });
        break;

      default:
        alert("default");
        break;
    }
  }
  render() {
    let tomatoIcon = `🍅${this.state.tomato}`;
    let nasuIcon = `🍆${this.state.nasu}`;
    let kyuriIcon = `🥒${this.state.kyuri}`;
    let clearIcon = `🗑️削除`;
    // let now = new Date();
    // let today = `今日${now.getMonth() + 1}/${now.getDate()}`;
    // let status = this.state.status;

    return (
      <div className="entry">
        {/* {this.props.kyuriCount}
        {this.props.nasuCount}
        {this.props.tomatoCount} */}
        <fieldset>
          <legend style={{ textAlign: "center" }}>
            正しい数量で収穫しよう
            {/* <Emoji symbol="🥒🍆🍅" /> */}
          </legend>

          {/* <div>収穫日：{today}</div> */}
          {/* <div>状　況：{status}</div> */}
          <div style={{ textAlign: "center" }}>
            <input
              value={kyuriIcon}
              type="button"
              name="kyuri"
              onClick={event => this.onClickTry(event)}
            />
            <input
              value={nasuIcon}
              type="button"
              name="nasu"
              onClick={event => this.onClickTry(event)}
            />
            <input
              value={tomatoIcon}
              type="button"
              name="tomato"
              onClick={event => this.onClickTry(event)}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <input
              type="submit"
              value="収穫"
              onClick={() => this.onClickSubmit()}
            />{" "}
            <input
              value={clearIcon}
              type="submit"
              name="clear"
              onClick={event => this.onClickTry(event)}
            />
          </div>
        </fieldset>
      </div>
    );
  }
}

const Title = props => {
  return <h1>{props.children}</h1>;
};

Title.protoTypes = {
  children: PropTypes.string
};
ReactDOM.render(<VegeBook />, document.getElementById("root"));
