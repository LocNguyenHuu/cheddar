import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export default class Ads extends React.Component {

  constructor(props) {
    super(props);
    //the props handed down include a findAds function from reducers/adsFromDb
    //                         and a selectAd function from reducers/adsFromClick

  }

  componentDidMount(){
    this.props.findAds();
  }

  render() {
    let {user, selectAd, currentAds} = this.props;
    //user is an obect with .name, .email etc, selectAd is a function to put the selected ad obj on the store, current Ads is an array of two ad objects to render in the component.
    let ads = currentAds;
    //ads is a array of objects. Each object has a url, title, id. Its also represented on the global store.
    let urlA = ads[0] ? ads[0].url : "",
        titleA = ads[0] ? ads[0].title : "",
        urlB = ads[1] ? ads[1].url : "",
        titleB = ads[1] ? ads[1].title : "";


    return (
      <div id="ads">
        <ul id="slide-out" className="side-nav fixed">
          <li>
            <div className="userView">
              <div className="background">
              </div>
              <a href="#!user"><img className="circle" src="img/smile/1.jpg"/></a>
              <a href="#!name"><span className="black-text name">{user ? user.name : 'Props didnt happen'} </span></a>
              <a href="#!email"><span className="black-text email">{user ? user.email : "Props didnt happen"}</span></a>
              <a href="#!email"><span className="black-text">Watched # ads</span></a>
              <a href="#!email"><span className="black-text">Earned # smilyPoints</span></a>
            </div>
          </li>
          <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
        <div className="container videocards">
          <div className="row">
            <div className="col s6">
              <div className="card">
                <div className="card-image">
                  <img src={`http://img.youtube.com/vi/${urlA}/maxresdefault.jpg`}/>
                  <span className="card-title">Ad 1</span>
                </div>
                <div className="card-content">
                  <p>{titleA}</p>
                </div>
                <div className="card-action">
                  <Link  onClick={() => selectAd(ads[0])} to="/video" >Watch Option A</Link>
                </div>
              </div>
            </div>
            <div className="col s6">
              <div className="card">
                <div className="card-image">
                  <img src={`http://img.youtube.com/vi/${urlB}/maxresdefault.jpg`}/>
                  <span className="card-title">Ad 2</span>
                </div>
                <div className="card-content">
                  <p>{titleB}</p>
                </div>
                <div className="card-action">
                  <Link onClick={() => selectAd(ads[1])} to="/video" >Watch Option B</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
