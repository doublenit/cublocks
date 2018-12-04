/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    InspectorControls,
} = wp.editor;
const {
    SelectControl
} = wp.components;

/**
 * Create an Selector Component
 */
export default class Selector extends Component {

    constructor() {
        super( ...arguments );
        this.grabMajors = this.grabMajors.bind(this);
        this.state = {
        	all:null
        }
    }

    grabMajors() {
    	const url = 'http://ows.sites.clemson.edu/apis/degrees/degrees.txt',
    	allMajors = fetch( url ), 
    	ug = {},
    	all = [];

    	allMajors.then( response => response.json() )
    	.then( function( data ) {
    		let majors = data, allOfEm = Object.keys(majors);
    		allOfEm.map(function(item, key) {
    			if( majors[item].degree_id < 999 ) {
    				all.push({label: majors[item].degreeInfo.name, value: majors[item].degreeInfo.slug, link: majors[item].degreeInfo.website});
    			}
    		});
    	})
    	.catch( error => console.log( error ) );
    	this.setState({ all });
    }

    componentDidMount() {
    	this.grabMajors();
    }

    render() {
    	const { attributes: { major }, onChangeMajor  } = this.props;
    	
        return (
            <SelectControl
            	label={ __( 'Select a major:' ) }
            	value={ this.props.value } 
            	onChange={ major => onChangeMajor( { major } ) }
            	options={ this.state.all }
            />
        );
    }
}
