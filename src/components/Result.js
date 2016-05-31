import _ from 'lodash';
import React, { Component } from 'react';

import ResultSplash from './ResultSplash';
import ResultDetails from './ResultDetails';

export default class Result extends Component {

  convertToInt(string) {
    if (string !== null) {
      let splitted = string.split('.');
      let concatenated = splitted[0].concat(splitted[1]);
      let number = parseInt(concatenated);

      return number
    }

    return string;
  }

  getResultData(regions) {
    let subregions= [];
    let candidatesVotesResult = [];
    
    let listedVoters= [],
        voters= [],
        totalListedVoters = 0,
        totalVoters = 0;
    
    let valid= [],
        invalid= [],
        totalVotes= 0,
        totalValidVotes= 0,
        totalInvalidVotes= 0;

    regions.map(region => {
      subregions.push(region.nama_kab_kota);
      listedVoters.push(this.convertToInt(region.pemilih));
      voters.push(this.convertToInt(region.pengguna_hak_pilih));
      valid.push(this.convertToInt(region.suara_sah));
      invalid.push(this.convertToInt(region.suara_tidak_sah));
      totalVotes += this.convertToInt(region.total_suara);
      candidatesVotesResult.push(region.perolehan_suara.split(' '));
    });

    // remove formatting number '[1]' from candidateVote
    let tempArr = [], candidatesVotes = [];
    candidatesVotesResult.map(item => {
      item.map((val, id) => {
        if(id%2 !== 0) tempArr.push(val)
      })
      candidatesVotes.push(tempArr)
      tempArr = []
    })

    totalListedVoters = _.sum(listedVoters);
    totalVoters = _.sum(voters);

    totalValidVotes = _.sum(valid);
    totalInvalidVotes = _.sum(invalid);

    return {
      subregions,
      listedVoters, voters, totalListedVoters, totalVoters,
      valid, invalid, totalVotes, totalValidVotes, totalInvalidVotes
    };
  }

  render() {
    const chartData = this.getResultData(this.props.subregions);
    const candidates = this.props.candidates;

    return (
      <div className="result-container" id="result">
        <ResultSplash region={this.props.region} chartData={chartData} />
        <ResultDetails chartData={chartData} candidates={candidates} />
      </div>
    );
  }
}