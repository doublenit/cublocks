/**
 * Block dependencies
 */
 import icon from './icon';
 import './style.scss';
 import Selector from './selector';

/**
 * Internal block libraries
 */
 const { __ } = wp.i18n;
 const { registerBlockType } = wp.blocks;
 const { RichText,
 	AlignmentToolbar,
 	BlockControls,
 	BlockAlignmentToolbar,
 	InspectorControls,
 } = wp.editor;
 const { SelectControl } = wp.components;


/**
 * Register block
 */
export default registerBlockType(
	'clemson/majors',
	{
		title: __( 'Majors', 'clemson' ),
		description: __( 'Link for more info on selected major.', 'clemson' ),
		category: 'common',
		icon: {
			background: '#f66733',
			src: icon,
		},   
		keywords: [
		__( 'Major info', 'clemson' ),
		__( 'become a tiger', 'clemson' ),
		__( 'Call to Action', 'clemson' ),
		],
		attributes: {
			major: {
				type: 'string',
			},
		},
		edit: props => {

			const { attributes: { major },
			    className, setAttributes } = props;

			const onChangeMajor = major => { setAttributes( { major } ); };

			return (
				<div className={ className }>
					<Selector onChangeMajor={ onChangeMajor } {...{ setAttributes, ...props }} />
				</div>
			);
		},
		save: props => {
			const { major } = props.attributes;

			return (
				<div>
					<a className="major" href={ `https://www.clemson.edu/degrees/${major}` }>Find out more about { major }</a>
				</div>
				);
		},
	},
);
