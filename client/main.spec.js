import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactDOM from 'react-dom'
import Main from './main.jsx'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('Products', () => {
  let main;

  beforeEach(() => {
    main = shallow(<Main />)
  })

  it('should display 14 borough names in h3 tags in both areas', function () {
    expect(main.find('h3')).to.have.length(14);
  });

  it('should display 12 macro names in h4 tags, not including macros that match the boro', function () {
    expect(main.find('h4')).to.have.length(12);
  });

})
