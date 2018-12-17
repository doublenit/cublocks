/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    InspectorControls,
} = wp.editor;
const {
    Autocomplete
} = wp.components;
import apiFetch from '@wordpress/api-fetch';
import Autosuggest from 'react-autosuggest';

// Experts to suggest
const experts = [
  {
      title: 'People',
      suggestions: [
        {
          id: '4895',
          name: 'Lee Crandall',
          slug: 'lee-crandall',
          link: 'http://ns.local/experts/lee-crandall/',
          areas: []
        },
        {
          id: '4895',
          name: 'Lee Crandall',
          slug: 'lee-crandall',
          link: 'http://ns.local/experts/lee-crandall/',
          areas: []
        },
        {
          id: '4895',
          name: 'Lee Crandall',
          slug: 'lee-crandall',
          link: 'http://ns.local/experts/lee-crandall/',
          areas: []
        },
      ]
    },
    {
      title: 'Subject',
      suggestions: [
        {
          id: '102',
          text: 'Banana'
        }
      ]
    }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return experts
    .map(section => {
      return {
        title: section.title,
        suggestions: section.suggestions.filter(person => regex.test(person.name))
      };
    })
    .filter(section => section.suggestions.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.suggestions;
}

/**
 * Create an ExpertFinder Component
 */
export default class ExpertFinder extends Component {

	constructor() {
	    super();
	    // Autosuggest is a controlled component.
	    // This means that you need to provide an input value
	    // and an onChange handler that updates this value (see below).
	    // Suggestions also need to be provided to the Autosuggest,
	    // and they are initially empty because the Autosuggest is closed.
	    this.onChange = this.onChange.bind(this);
	    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
	    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
	    this.state = {
	      value: '',
	      suggestions: []
	    }
	  }

	  onChange( event, { newValue } ) {
	  	this.setState({
	  	  value: newValue,
	  	});
	  }

	  // Autosuggest will call this function every time you need to update suggestions.
	  // You already implemented this logic above, so just use it.
	  onSuggestionsFetchRequested( { value } ) {
	  	this.setState({
	  	  suggestions: getSuggestions(value)
	  	});

	  }


	  // Autosuggest will call this function every time you need to clear suggestions.
	  onSuggestionsClearRequested() {
	  	this.setState({
	  	  suggestions: []
	  	});
	  }

	  componentDidMount() {
	  	const expertsArray = [], subjectsArray = [];
	  	apiFetch( { path: '//ns.local/wp-json/wp/v2/experts?_embed' } ).then( posts => {
	  	    posts.map( post => {
	  	    	expertsArray.push({ id:post.id, slug:post.slug, name:post.title.rendered, link:post.link, areas:post._embedded['wp:term'][0] });
	  	    	subjectsArray[post.id] = post;
	  	    	this.setState({ suggestions: posts });
	  	    } );
	  	    
	  	} );
	  }

	  render() {
	    const { value, suggestions } = this.state;

	    // Autosuggest will pass through all these props to the input.
	    const inputProps = {
	      placeholder: 'Search by name or subject',
	      value,
	      onChange: this.onChange
	    };

	    // Finally, render it!
	    return (
	      <Autosuggest 
	          multiSection={true}
	          suggestions={suggestions}
	          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
	          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
	          getSuggestionValue={getSuggestionValue}
	          renderSuggestion={renderSuggestion}
	          renderSectionTitle={renderSectionTitle}
	          getSectionSuggestions={getSectionSuggestions}
	          inputProps={inputProps} />
	    );
	  }
    
}
