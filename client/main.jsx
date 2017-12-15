import React, { Component } from 'react'
import jsonBody from '../locationsResponse.json'
const data = jsonBody.data

export default class Main extends Component {
  constructor(){
    super();
    let {boros, neighborhoods} = getBoros(data)
    this.state = {
      boros: boros,
      neighborhoods: neighborhoods
    }
  }

  handleSelect(index, macroId, boroWeight) {
    const {boros, neighborhoods} = this.state;
    const currNeighborhood = neighborhoods[macroId][index]
    const prevSelectValue = currNeighborhood.selected

    //update the value of selected on the correct neighborhood
    neighborhoods[macroId][index].selected
      ? neighborhoods[macroId][index].selected = false
      : neighborhoods[macroId][index].selected = true


    prevSelectValue //was this neighborhood previously selected?
      ? boros[boroWeight - 1].numSelect-- // decrement the number selected for that boro by one
      : boros[boroWeight - 1].numSelect++ // increment the number selected for that boro by one

    // console.log('soooo now at the end..... BOROS -----> ', boros)
    // console.log('aaaaaaand neighborhoods ---->', neighborhoods)

    this.setState({boros, neighborhoods})


  }

  render() {
    const {boros, neighborhoods} = this.state
    return (
      <div>
        <header><h1>Kidpass Challenge!</h1></header>
        <div id="section-holder">
          <section id="sec-a">
            <h2>Neighborhood Listings</h2>
            <hr />
            <div id="neighbor-scroll">
              {boros.map(boroInfo => (
                <div className="single-mapping" key={boroInfo.id}>
                  <h3 className="listing-boro">{boroInfo.name}</h3>
                  {boroInfo.macros.map(macro => (
                    <div key={macro.id}>
                      {macro.name !== boroInfo.name && <h4>{macro.name}</h4>}
                      {neighborhoods[macro.id].map((hood, index) => <p onClick={() => this.handleSelect(index, macro.id, boroInfo.weight)} key={hood.id}>{hood.name}{hood.selected && <i>✔️</i>}</p>) }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
          <section id="sec-b">
            <h2>Selected Boros</h2>
            <hr />
            {this.state.boros.map( boro => (
              <div key={boro.id} className="boros">
                <h3>{boro.name}</h3>
                {boro.numSelect > 0 && <i className="number">{boro.numSelect}</i>}
              </div>
            ))}
          </section>
        </div>
      </div>
    )
  }
}


/*  Helper function to return an object of the boros array and neighborhoods objects that will be used on the component state

Boros: array or boroughs (name, id, weight, macros array) where index match the weight - 1 of the borough

Neighborhoods: an object where macroId keys map to values that are an array of neighborhood objects that belong to that macro

*/
function getBoros(data) {
  let neighborhoods = {}
  let boros = data.map(elem => {
    let macros = elem.mappings.map(mapping => {
      neighborhoods[mapping.macro.id] = mapping.neighborhoods
      return mapping.macro;
    })
    return Object.assign({}, elem.borough, { macros: macros, numSelect: 0 })
  })
  return {boros, neighborhoods}
}
