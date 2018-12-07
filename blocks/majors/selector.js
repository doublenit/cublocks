/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    InspectorControls,
} = wp.editor;
const {
    SelectControl,
    Disabled
} = wp.components;

/**
 * Create an Selector Component
 */
export default class Selector extends Component {

    constructor() {
        super( ...arguments );
        this.grabMajors = this.grabMajors.bind(this);
        this.majorInfo = this.majorInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
        	all:[{label: 'Loading', value: null }],
        	isLoaded:false
        }
    }

    grabMajors() {
    	const url = 'http://ows.sites.clemson.edu/apis/degrees/degrees.txt',
    	allMajors = fetch( url ), 
    	ug = {},
    	all = [ { label:'Select a major', value:null } ];

    	allMajors.then( response => response.json() )
    	.then( ( data ) => {
    		let majors = data, 
    			allOfEm = Object.keys(majors),
    			allMajors = Object.keys(majors).map( (key) => majors[key] ),
    			allUgMajors = allMajors.filter( major => major.degree_id < 999 );
    		allOfEm.map(function(item, key) {
    			if( majors[item].degree_id < 999 ) {
    				all.push({label: majors[item].degreeInfo.name, value: majors[item].degreeInfo.slug, link: majors[item].degreeInfo.website});
    			}
    		});
    		this.setState({ all, isLoaded:true });
    	})
    	.catch( error => console.log( error ) );
    }

    componentDidMount() {
    	this.grabMajors();
    }

    majorInfo( slug ) {
    	const majors = this.state.all;
    	const majorObj = majors.find( major => major.value === slug );
    	return majorObj;
    }

    handleChange( slug ) {
    	const major = this.majorInfo( slug.major );
    	this.props.onChangeMajor( major.value, major.label );
    }

    render() {
    	const { onChangeMajor  } = this.props;
    	const Select = () => <SelectControl
            	label={ __( 'Select a major:' ) }
            	value={ this.props.value } 
            	onChange={ major => { this.handleChange( { major } ) } }
            	options={ this.state.all }
            />;
        return (
        	this.state.isLoaded ? (
        		<Select />
        		) : (
        			<Disabled>
        				<Select />
        			</Disabled>
        		)
            
        );
    }
}
