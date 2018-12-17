const { __ } = wp.i18n;
const { 
	Component 
} = wp.element;
const {
    Autocomplete,
    TextControl
} = wp.components;

import apiFetch from '@wordpress/api-fetch';
import Downshift from 'downshift';


export default class ExpertFinder extends Component {

	constructor() {
	    super();
	    // Autosuggest is a controlled component.
	    // This means that you need to provide an input value
	    // and an onChange handler that updates this value (see below).
	    // Suggestions also need to be provided to the Autosuggest,
	    // and they are initially empty because the Autosuggest is closed.
	    this.handleChange = this.handleChange.bind(this);
	    this.itemToString = this.itemToString.bind(this);
	    this.state = {
	      value: '',
	      experts: []
	    }
	}

	handleChange( selection ) {
		alert(`You selected ${selection.name}`);
	}

	itemToString( item ) {
		return item ? item.name : '';
	}

	componentDidMount() {
		const expertsArray = [], subjectsArray = [];
		apiFetch( { path: '//ns.local/wp-json/wp/v2/experts?_embed' } ).then( posts => {
		    posts.map( post => {
		    	let searchString = post.title.rendered.trim().toLowerCase();
		    	expertsArray.push({ id:post.id, slug:post.slug, name:post.title.rendered, link:post.link, 
		    		areas:(post._embedded['wp:term'][0]).map( term => {
		    			searchString += ' '+term.name.trim().toLowerCase();
		    			return term.name
		    			} ), 
		    		search:searchString });
		    	subjectsArray[post.id] = post;
		    } );
		    this.setState({ experts: expertsArray });
		} );
	}

	render() {
		return (
			<Downshift
			  onChange={this.handleChange}
			  itemToString={this.itemToString}
			>
			  {({
			    getInputProps,
			    getItemProps,
			    getLabelProps,
			    getMenuProps,
			    isOpen,
			    inputValue,
			    highlightedIndex,
			    selectedItem,
			  }) => (
			    <div>
			      <label {...getLabelProps()}>Add an expert </label>
			      <input {...getInputProps()} />
			      <ul {...getMenuProps()}>
			        {isOpen
			          ? this.state.experts
			              .filter(item => !inputValue.trim().toLowerCase() || item.search.includes(inputValue.trim().toLowerCase()))
			              .map((item, index) => (
			                <li
			                  {...getItemProps({
			                    key: item.id,
			                    index,
			                    item,
			                    style: {
			                      backgroundColor:
			                        highlightedIndex === index ? 'lightgray' : null,
			                      fontWeight: selectedItem === item ? 'bold' : 'normal',
			                    },
			                  })}
			                >
			                  {item.name}
			                </li>
			              ))
			          : null}
			      </ul>
			    </div>
			  )}
			</Downshift>
		)
	}


}