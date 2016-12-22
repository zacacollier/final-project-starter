/* eslint-disable */
import React, { Component } from 'react';

export default class BusinessName extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }
generateBusinessName = () => {
    var color = new Array("white","black","blue","green","silver","indigo","gold","golden");
    var business_first = new Array("alpha","an","ap","beta","big","bio","can","d-","dalt","dam","dan","dento","ding","dom","don","don","dong","double","drip","duo","e-","fase","fin","free","fresh","fun","ganja","ganz","geo","gogo","good","grave","groove","hat","hay","hot","hot","hot","ice","inch","indi","j-","jay","joy","k-","kan","kay","key","kin","kon","konk","lam","lat","lexi","lot","mat","math","med","move","nam","new","nim","o-","onto","ope","open","over","ozer","phys","quad","quo","qvo","ran","ran","rank","re","red","ron","round","run","sail","salt","san","san","sao","scot","sil","silicon","single","sol","solo","son","span","stan","stat","stim","strong","sub","sum","sun","super","tam","tamp","tan","temp","tin","ton","tough","tran","tree","tres","trio","tripple","tris","true","trust","u-","una","uni","uno","vaia","vento","via","vila","villa","viva","vol","volt","voya","x-","xx-","xxx-","y-","year","zaam","zam","zath","zen","zer","zim","zon","zoo","zot","zum","zumma","zun");
    var business_midle = new Array("an","ap","be","ta","bio","can","dam","dan","din","dom","don","do","dub","fin","geo","go","hat","hot","hot","jay","jo","ji","joy","kay","key","lam","lat","lot","mat","med","nam","nim","ot","oze","quad","quo","qvo","ran","ran","red","rem","ron","run","sail","san","san","sao","sil","sol","solo","son","ta","sun","tam","tan","tin","ton","trax","trip","una","uni","uno","via","viva","vol","za","zam","zar","zat","zen","zim","zoo","zoom","zo","zoz","zum","zun");
    var business_last = new Array("com","core","corporation","dax","dex","dexon","dom","dox","electrics","electronics","ex","fan","find","green","holding","holdings","house","ing","ity","kix","lax","lane","lex","lux","nix","phase","ron","tam","tax","taxon","tech","technology","tex","texon","tom","tone","touch","trax","way","zone");
    var business_both = new Array("ace","bam","base","can","cane","care","city","code","con","cone","drill","fase","fax","flex","fix","hex","how","high","ice","in","is","it","job","la","media","lab","lam","lane","line","planet","plex","plus","quote","street","strip","tech","techi","techno","trans","ware","zap","zoom","zim");
    var prefix = business_first.concat(business_both).concat(color);
    var suffix = business_last.concat(business_both);
    var midle = business_midle;
    var n1 = parseInt(Math.random() * prefix.length);
    var n2 = parseInt(Math.random() * suffix.length);
    var nmid = parseInt(Math.random() * midle.length);
    var prename = prefix[n1].toLowerCase();
    var midlename = midle[nmid].toLowerCase();
    var sufname = suffix[n2].toLowerCase();
    var n3 = parseInt(Math.random() * 100);
    if (n3 <= 25) {
        if (prename.length + sufname.length < 8) {
            name = prename.slice(0, 1).toUpperCase() + prename.slice(1) + midlename + sufname;
        } else {
            name = prename.slice(0, 1).toUpperCase() + prename.slice(1) + sufname;
        }
    } else if (n3 > 25 && n3 <= 30) {
        if (prename.charAt(1) != "-") {
            name = prename.slice(0, 1).toUpperCase() + prename.slice(1) + "-" + sufname;
        } else {
            name = prename.slice(0, 1).toUpperCase() + prename.slice(1) + sufname;
        }
    } else if (n3 > 30 && n3 <= 32) {
        if (prename.charAt(1) != "-") {
            name = prename + "-" + sufname;
        } else {
            name = prename + sufname;
        }
    } else if (n3 > 32 && n3 <= 45) {
        name = prename + sufname.toLowerCase();
    } else {
        name = prename.slice(0, 1).toUpperCase() + prename.slice(1) + sufname;
    }
  return name;
}
  componentWillMount() {
    this.setState({
      name: this.generateBusinessName()
    })
  }
  render() {
    return (
      <span>{this.state.name}</span>
    )
  }
}
