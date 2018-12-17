/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';
import ExpertFinder from './autocomplete';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Spinner } = wp.components;
const { withSelect } = wp.data;

registerBlockType(
    'clemson/experts',
    {
        title: __( 'Add an expert', 'clemson'),
        description: __( 'Add an expert to your post for media to contact.', 'clemson'),
        category: 'common',
        icon: {
            background: '#f66733',
            src: icon,
        },
        keywords: [
        __( 'Clemson experts', 'clemson' ),
        __( 'subject area experts', 'clemson' ),
        __( 'media contact', 'clemson' ),
        ], 
		edit: props => {
			const { className } = props;
			return (
				<div className={ className }>
					<ExpertFinder />
				</div>
			);
		},
        save( { attributes } ) {
            return (
            	<div>
            		{ `Stuff also here.` }
            	</div>
            )
        },
} );
