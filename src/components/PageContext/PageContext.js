'use strict';

import './assets/page-context.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Background from 'components/Background/Background';
import Lamps from 'components/Lamps/Lamps';
import Trees from 'components/Trees/Trees';
import Player from 'components/Player/Player';
import Building from 'components/Building/Building';
import Vehicle from 'components/Vehicle/Vehicle';
import Person from 'components/Person/Person';
import JumpingShadow from 'components/Person/JumpingShadow';
import PageContextNewspaper from './PageContextNewspaper';
import PageContextXp from './PageContextXp';
import PageContextWebdev from './PageContextWebdev';
import PageContextGames from './PageContextGames';
import PageContextMobile from './PageContextMobile';
import PageContextLab from './PageContextLab';
import PageContextContact from './PageContextContact';

import * as constants from './Constants';
import store from 'store/store';
import getCenteredOffset from './GetCenteredOffset';
import document from 'other/document';

export default React.createClass({
  componentDidMount() {
    const unsubscribe = store.subscribe(() => {
      if (store.getState().playerState.playerCar) {
        // Center on player's car
        this.pageElm.style.left = getCenteredOffset(ReactDOM.findDOMNode(this.playerWrapper).getBoundingClientRect());
        // Restore document's scroll
        document.body.className += constants.BODY_ACTIVE_CLASS;
        unsubscribe();
      }
    });
  },
  render() {
    return (
      <div className="page-context" ref={pageElm => this.pageElm = pageElm}>
        <Player ref={playerWrapper => this.playerWrapper = playerWrapper}></Player>
        <Background>
          {/* Decorations */}
          <Building buildingClass="tunnel"></Building>
          <Lamps/>
          <Trees/>
          {/* Buildings, exclamation marks and people */}
          <Building buildingClass="welcome">
            <Person personClass="beach1"/>
            <Person personClass="beach2"/>
            <Person personClass="guy1-briefcase"/>
            <Person personClass="guy2-bag"/>
          </Building>
          <Building buildingClass="newsstand">
            <Person personClass="guy3-briefcase"/>
            <Person personClass="guy4-newspaper">
              <PageContextNewspaper/>
            </Person>
          </Building>
          <Building buildingClass="xp">
            <Person personClass="guy5-jumping1">
              <JumpingShadow></JumpingShadow>
            </Person>
            <Person personClass="guy6-jumping2">
              <JumpingShadow></JumpingShadow>
            </Person>
            <Person personClass="guy7-cheering">
              <PageContextXp/>
            </Person>
            <Person personClass="girl8-sitting"/>
            <Person personClass="guy9-fishing"/>
          </Building>
          <Building buildingClass="webdev">
            <Person personClass="guy10-bag"/>
            <Person personClass="guy11-bag"/>
            <Person personClass="girl12-laptop">
              <PageContextWebdev/>
            </Person>
            <Person personClass="guy13-jumping">
              <JumpingShadow></JumpingShadow>
            </Person>
          </Building>
          <Building buildingClass="arcade">
            <Person personClass="guy14-skating"/>
            <Person personClass="girl15-gameboy">
              <PageContextGames/>
            </Person>
          </Building>
          <Building buildingClass="mobile">
            <Person personClass="guy16-manhole"/>
            <Person personClass="guy17-photo">
              <PageContextMobile/>
            </Person>
            <Person personClass="radio"/>
            <Person personClass="pair18-photo"/>
          </Building>
          <Building buildingClass="lab">
            <Person personClass="guy19-icecream"/>
            <Person personClass="guy20-mib"/>
            <Person personClass="guy21-doc">
              <PageContextLab/>
            </Person>
            <Person personClass="guy22-doc2"/>
          </Building>
          <Building buildingClass="contact">
            <PageContextContact/>
          </Building>
          <Building buildingClass="police-line">
            <Vehicle vehicleClass="police-x"/>
            <Vehicle vehicleClass="police-y"/>
          </Building>
        </Background>
      </div>
    );
  }
});
