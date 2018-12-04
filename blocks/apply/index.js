/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
export default registerBlockType(
    'clemson/apply',
    {
        title: __( 'Apply now!', 'clemson' ),
        description: __( 'Apply now CTA for posts.', 'clemson' ),
        category: 'common',
        icon: {
            background: '#f66733',
            src: icon,
        },   
        keywords: [
            __( 'Apply button', 'clemson' ),
            __( 'become a tiger', 'clemson' ),
            __( 'Call to Action', 'clemson' ),
        ],
        edit: props => {
        	const { className } = props;
            return (
            	<div className={ className }>
	            	<a className="applyBtn" href="#">{ icon } Apply Now</a>
	            </div>
            );
        },
        save: props => {
            // const { attributes: { message } } = props;
            return (
                <div>
                    <a className="applyBtn" href="https://www.clemson.edu/admissions/apply-now.html">{ icon } { __( 'Apply Now', 'clemson' ) }</a>
                </div>
            );
        },
    },
);
