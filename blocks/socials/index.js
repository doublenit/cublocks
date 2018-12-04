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
const { RichText,
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
    InspectorControls,
} = wp.editor;
const {
	TextControl,
    Toolbar,
    Button,
    Tooltip,
    PanelBody,
    PanelRow,
    FormToggle,
} = wp.components;

/**
 * Register block
 */
export default registerBlockType(
    'clemson/socials',
    {
        title: __( 'Socials', 'clemson' ),
        description: __( 'Social media builder for Clemson WordPress installs.', 'clemson' ),
        category: 'common',
        icon: {
            background: '#f66733',
            src: icon,
        },   
        keywords: [
            __( 'Banner', 'clemson' ),
            __( 'Call to Action', 'clemson' ),
            __( 'Message', 'clemson' ),
        ],
        attributes: {
            message: {
                type: 'array',
                source: 'children',
                selector: '.message-body',
            },
            twitter: {
                type: 'string',
                selector: '.twitter',
            },
        },
        edit: props => {
            const { attributes: { textAlignment, blockAlignment, message, highContrast, twitter },
                className, setAttributes } = props;

            const onChangeMessage = message => { setAttributes( { message } ) };
            const onChangeTwitter = twitter => { setAttributes( { twitter } ) };

            const toggleHighContrast = () => setAttributes( { highContrast: ! highContrast } );
            console.log(props);
            return (
            	<div>
	            	<InspectorControls>
	            	    <PanelBody
	            	        title={ __( 'Twitter', 'clemson' ) }
	            	    >
	            	        <PanelRow>
	            	            <TextControl
            	            		label="Social Input"
            	            		value={ twitter }
            	            		onChange={ onChangeTwitter }
            	            	/>
	            	        </PanelRow>
	            	    </PanelBody>
	            	</InspectorControls>
	                <div className={ className }>
	                    <h4>{ __( 'Connect with Clemson', 'clemson' ) }</h4>
	                    <RichText
	                        tagName="div"
	                        multiline="p"
	                        placeholder={ __( 'Add your custom message', 'clemson' ) }
	                  		onChange={ onChangeMessage }
	                  		value={ message }
	              		/>
	              		<div>{ twitter }</div>
	                </div>
	            </div>
            );
        },
        save: props => {
            const { attributes: { message } } = props;
            return (
                <div>
                    <h4>{ __( 'Connect with Clemson', 'clemson' ) }</h4>
                    <div class="twitter">
                        { message }
                    </div>
                    <div class="message-body">
                        { message }
                    </div>
                </div>
            );
        },
    },
);
