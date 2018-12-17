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
 const { Fragment } = wp.element;


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
			major_slug: {
				type: 'string',
				selector: '.major',
			},
			major_name: {
				type: 'string',
				selector: '.major_name',
			},
		},
		edit: props => {

			const { attributes: { major_slug, major_name },
			    className, setAttributes, isSelected } = props;

			const onChangeMajor = (major_slug, major_name) => { setAttributes( { major_slug, major_name } ) };

			return (
				<Fragment>
				{ !isSelected ? (
						<div>
							<a className={ className } href={ `#` }>Learn about the { major_name } degree</a>
						</div>
					) : (
						<div className={ className }>
							<p>Select a major to set a link to the degrees page.</p>
							<Selector value={ major_slug } onChangeMajor={ onChangeMajor } {...{ setAttributes, ...props }}/>
						</div>
					) 
				}
				</Fragment>
			);
		},
		save: props => {
			const { major_slug, major_name } = props.attributes;

			return (
				<div>
					<a className="major" href={ `https://www.clemson.edu/degrees/${major_slug}` }>Learn about the { major_name } degree</a>
				</div>
				);
		},
	},
);
