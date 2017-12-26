import React, { Component } from 'react';

const ItemPanel = (props) => {

	if(props.deck.length == 0) {
		return null;
	}

	let listGroupItem = [];
	let panelType = null;
	let flag = false;
	let deckObj;

	switch (true) {

		case props.type == 'clan':
			panelType = 'Clan:';
			
			const clanInfo = props.decks.list.map((deck, index) => {
				if(deck.urlType === 'strains') {
					deckObj = deck.record.head;
				} else if(deck.urlType === 'decks') {
					deckObj = deck.record;
				}
				
				if(deck.record.id === props.selected) {
					return (
						<div key={index}>
							<button className="list-group-item" disabled>{deckObj.primary_clan}</button>
							<button className="list-group-item" disabled>{deckObj.format}</button>
						</div>
					)	
				}
			});

			listGroupItem = props.deck.map((deck, index) => {
				if(props.cardList[deck.id].type == props.type2 || props.cardList[deck.id].type == 'role') {
					return <button key={index} data-key={deck.id} onClick={props.onViewItemModal} className="list-group-item">{props.cardList[deck.id].name}</button>
				}
			});

			
			listGroupItem = [ listGroupItem, ...clanInfo ];

		break;

		case props.type == 'province':

			panelType = props.type2;

			listGroupItem = props.deck.map((deck, index) => {
				if(props.cardList[deck.id].side == props.type && props.cardList[deck.id].type == props.type2) {
					return <button key={index} data-key={deck.id} onClick={props.onViewItemModal} className="list-group-item">{props.cardList[deck.id].name}</button>
				}
			});

		break;

		case props.type != null && props.type2 != null:

			let typeCount = 0;
			let typePercent;
			let classes;
			let icon;
			listGroupItem = props.deck.map((deck, index) => {
				if(props.cardList[deck.id].side == props.type && props.cardList[deck.id].type == props.type2) {
					typeCount += deck.count;
					typePercent = ((typeCount / props.count) * 100).toFixed(2);

					panelType = `${props.type2} (${typeCount}) (${typePercent}%)`;

					// Get icons
					switch (props.cardList[deck.id].clan) {
						case 'neutral':
							icon = 'icon-clan-neutral';
						break;
						case 'lion':
							icon = 'icon-clan-lion';
						break;
						case 'crane':
							icon = 'icon-clan-crane';
						break;
						case 'unicorn':
							icon = 'icon-clan-unicorn';
						break;
						case 'scorpion':
							icon = 'icon-clan-scorpion';
						break;
						case 'dragon':
							icon = 'icon-clan-dragon';
						break;
						case 'phoenix':
							icon = 'icon-clan-phoenix';
						break;
						case 'crab':
							icon = 'icon-clan-crab';
						break;
					}
					classes = `${icon} list-group-item`;

					return <button id={deck.id} key={index} data-key={deck.id} onClick={props.onViewItemModal} className={classes}>{props.cardList[deck.id].name} ({deck.count})</button>
				} 
			});

			if(typeCount === 0) {
				flag = true;
			}

		break;
	}
	
	if(!flag) {
		return(
			<div className="item">
	    		<div className="panel panel-default">
				  <div className="panel-heading">
				  	<h3 className="panel-title">{panelType}</h3>
				  </div>
				  <div className="panel-body">
				    <div className="list-group">
				    	{listGroupItem}
				    </div>
				  </div>
				</div>
	    	</div>
		)
	} else {
		return null;
	}
	
	
}

export default ItemPanel;