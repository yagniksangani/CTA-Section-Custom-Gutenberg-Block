/**
 * BLOCK: cta-section-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { 
	RichText,
	InspectorControls,
	ColorPalette,
	MediaUpload,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar
} = wp.blockEditor;
const { PanelBody, Button, RangeControl, FontSizePicker } = wp.components;
const ALLOWED_BLOCKS = ['core/button']


/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ys/cta-section-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Call to Action Section' ), // Block title.
	description: 'Block to generate a custom call to action',
	icon: 'format-image', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'CTA Section Block' ),
		__( 'CTA' ),
		__( 'cta-section-block' ),
		__( 'Call to action' ),
	],

	// Custom attributes
	attributes:{
		title:{
			type: 'string',
			source: 'html',
			selector: 'h2'
		},
		titleColor:{
			type: 'string',
			default: 'black',
		},
		titleSize:{
			type: 'number',
			default: 24,
		},
		body: {
			type: 'string',
			source: 'html',
			selector: 'p'
		},
		bodyColor:{
			type: 'string',
			default: 'black',
		},
		bodySize:{
			type: 'number',
			default: 14,
		},
		backgroundImage:{
			type: 'string',
			default: null,
		},
		overlayColor:{
			type: 'string',
			default: 'black'
		},
		overlayOpacity:{
			type: 'number',
			default: 0.3
		},
		textAlign : {
			type : 'string',
			default : 'left',
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ({ attributes, setAttributes }) => {
		const {
			title,
			body,
			titleColor,
			titleSize,
			bodyColor,
			bodySize,
			backgroundImage,
			overlayColor,
			overlayOpacity,
			textAlign
		} = attributes;

		// custom functions
		function onChangeTitle(newTitle){
			setAttributes( { title: newTitle } );
		}

		function onChangeBody(newBody){
			setAttributes( { body: newBody } );
		}

		function onTitleColorChange(newTitleColor){
			setAttributes( { titleColor: newTitleColor } );
		}

		function onTitleSizeChange(newTitleSize){
			setAttributes( { titleSize: newTitleSize } );
		}

		function onBodyColorChange(newBodyColor){
			setAttributes( { bodyColor: newBodyColor } );
		}

		function onBodySizeChange(newBodySize){
			setAttributes( { bodySize: newBodySize } );
		}

		function onSelectBackgroundImage(newBackgroundImage) {
			setAttributes({ backgroundImage: newBackgroundImage.sizes.full.url });
		}

		function onOverlayColorChange(newColor) {
			setAttributes({ overlayColor: newColor });
		}

		function onOverlayOpacityChange(newOpacity) {
			setAttributes({ overlayOpacity: newOpacity });
		}

		function onTextAlignChange(newTextAlign) {
			setAttributes({ textAlign: newTextAlign });
		}

		return ([
			<InspectorControls style={ { marginBottom: '40px' } }>
				<BlockControls>
					<AlignmentToolbar onChange={ onTextAlignChange } value={ textAlign } />
				</BlockControls>
				<PanelBody title={ 'Font Color Settings' }>
					<p><strong>Select a Title Color:</strong></p>
					<ColorPalette value={titleColor}
								onChange={onTitleColorChange} />
					<p><strong>Select a Body Color:</strong></p>
					<ColorPalette value={bodyColor}
								onChange={onBodyColorChange} />
				</PanelBody>
				<PanelBody title={ 'Font Size Settings' }>
					<p><strong>Title Size:</strong></p>
					<RangeControl
						value= { titleSize }
						onChange = { onTitleSizeChange }
						min = { 0 }
						max = { 100 }
						step = { 1 }
					/>
					<p><strong>Body Size:</strong></p>
					<RangeControl
						value= { bodySize }
						onChange = { onBodySizeChange }
						min = { 0 }
						max = { 100 }
						step = { 1 }
					/>
				</PanelBody>
				<PanelBody title={ 'Background Image Settings' }>
					<p><strong>Select a Background Image:</strong></p>
					<MediaUpload
						onSelect={ onSelectBackgroundImage }
						type="image"
						value={ backgroundImage }
						render={ ( { open } ) => (
							<Button
								className="editor-media-placeholder__button is-button is-default is-large"
								icon="upload"
								onClick={ open }>
								Background Image
							</Button>
						 ) }/>
					<div style={{ marginTop: '20px', marginBottom: '40px' }}>
						<p><strong>Overlay Color:</strong></p>
						<ColorPalette value={overlayColor}
							onChange={onOverlayColorChange} />
					</div>
					<RangeControl
						label={ 'Overlay Opacity' }
						value={ overlayOpacity }
						onChange={ onOverlayOpacityChange }
						min={ 0 }
						max={ 1 }
						step={ 0.01 }/>
				</PanelBody>
			</InspectorControls>,

			<div className="cta-section-container" style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat', 
			}}>
				<div className="cta-section-overlay" style={{ background: overlayColor, opacity: overlayOpacity }}></div>
				<RichText key="editable"
						tagName="h2" 
						placeholder="Your CTA Title"
						value={ title }
						onChange={ onChangeTitle }
						style={ { textAlign: textAlign, color: titleColor, fontSize: titleSize } }/>
				<RichText key="editable"
						tagName="p" 
						placeholder="Your CTA Description"
						value={ body }
						onChange={ onChangeBody }
						style={ { textAlign: textAlign, color: bodyColor, fontSize: bodySize } }/>
			</div>
		]);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ({ attributes }) => {
		const {
			title,
			body,
			titleColor,
			titleSize,
			bodyColor,
			bodySize,
			backgroundImage,
			overlayColor,
			overlayOpacity,
			textAlign
		} = attributes;

		return (
			<div className="cta-section-container" style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				textAlign: textAlign,
			}}>
				<div className="cta-section-overlay" style={{ background: overlayColor, opacity: overlayOpacity }}></div>
				<h2 style={ { textAlign: textAlign, color: titleColor,fontSize: titleSize } }>{ title }</h2>
				<RichText.Content tagName="p"
								value={ body }
								style={ { textAlign: textAlign, color: bodyColor, fontSize: bodySize } }/>
			</div>
		);
	},

} );
