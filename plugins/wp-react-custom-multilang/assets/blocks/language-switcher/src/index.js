/**
 * WordPress dependencies
 */
import { ***REMOVED*** } from '@wordpress/blocks';
import { useBlockProps, RichText, ***REMOVED*** } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ }   from '@wordpress/i18n';

// Register the block
***REMOVED***( 'wpm/language-switcher', {
	title: "Language Switcher",
	icon: "translation",
	keywords: ['Lang', 'Language Switcher', 'Switcher', 'Language', 'Translate'],
    parent: [ 'core/navigation', 'core/post-content', 'core/group' ],
    attributes: {
        switchType: {
            type: 'string',
            default: 'dropdown',
        },
        switchShow: {
            type: 'string',
            default: 'both',
        }
    },
    edit: function (props) {

    	var attributes = props.attributes;

    	const { attributes: { mySelect }, setAttributes } = props;

   		const typeOptions = [ { label: __('Drop Down', 'wp-multilang'), value: 'dropdown' },
                              { label: __('List', 'wp-multilang'), value: 'list' },
                              { label: __('Select', 'wp-multilang'), value: 'select' },
                        	]; 	

        const showOptions = [ { label: __('Both', 'wp-multilang'), value: 'both' },
                              { label: __('Flag', 'wp-multilang'), value: 'flag' },
                              { label: __('Name', 'wp-multilang'), value: 'name' },
                        	];

        const lang = ***REMOVED***.lang; 
    	const languages = ***REMOVED***.languages;

    	const baseFlagUrl =  ***REMOVED***.flag_url
    	const defaultFlag =  baseFlagUrl + languages[lang].flag;
    	const defaultLang =  languages[lang].name;

    	const currentURL  =  window.location.href;
    	const ***REMOVED*** = Object.keys(languages);


        const renderDropdownSwitcher = () => {
        	let ulClass = "wpm-language-switcher wpm-switcher-dropdown";
        	let liClass = "wpm-item-language-main wpm-item-language-en";

        	return (
    			<ul className={ulClass}>
    				<li className={liClass}>
    					<span>
    						{(attributes.switchShow == "flag" || attributes.switchShow == "both") &&
    							<img src={defaultFlag} alt={defaultLang} />
    						}
    						{(attributes.switchShow == "name" || attributes.switchShow == "both") &&
								<span>{defaultLang}</span>
							}
    					</span> 
    					<ul className="wpm-language-dropdown">
    						{***REMOVED***.map((langIndex, langValue) => ( 
    							langIndex != lang && 
        						<li key={langValue} className={'wpm-item-language-'+langIndex}>
									<a href="#" data-lang={langIndex}>
										{ (attributes.switchShow == "flag" || attributes.switchShow == "both") && 
											<img src={baseFlagUrl+languages[langIndex].flag} alt={languages[langIndex].name} />
										}
										{ (attributes.switchShow == "name" || attributes.switchShow == "both") &&
											<span>{languages[langIndex].name}</span>
										}
									</a>
								</li>
    						))}
						</ul>
    				</li>
    			</ul>
        	);
        }

        const ***REMOVED*** = () => {
        	return (
        		<ul className="wpm-language-switcher wpm-switcher-list">
        			{***REMOVED***.map((langIndex, langValue) => ( 
        				<li key={langValue} className={'wpm-item-language-'+langIndex}>
        					{ lang == langIndex && 
        						<span data-lang={langIndex}>
        						{ (attributes.switchShow == "flag" || attributes.switchShow == "both") && 
									<img src={baseFlagUrl+languages[langIndex].flag} alt={languages[langIndex].name} />
								}
								{ (attributes.switchShow == "name" || attributes.switchShow == "both") &&
									<span>{languages[langIndex].name}</span>
								}
								</span>
        					}

        					{ lang != langIndex && 
        						<a href="#" data-lang={langIndex}>
        						{ (attributes.switchShow == "flag" || attributes.switchShow == "both") && 
									<img src={baseFlagUrl+languages[langIndex].flag} alt={languages[langIndex].name} />
								}
								{ (attributes.switchShow == "name" || attributes.switchShow == "both") &&
									<span>{languages[langIndex].name}</span>
								}
								</a>
        					} 
        				</li>
        			))}
        		</ul>
        	)
        }

        const ***REMOVED*** = () => {
        	return (
	        	<select className="wpm-language-switcher wpm-switcher-select" title={__( 'Language Switcher', 'wp-multilang' )}>
	        		{***REMOVED***.map((langIndex, langValue) => (
	        			lang != langIndex ?
	        				<option key={langValue} value={langIndex} data-lang={langIndex}>{languages[langIndex].name}</option> :
	        				<option key={langValue} value={langIndex} data-lang={langIndex} selected="selected">{languages[langIndex].name}</option> 
	        		))}
	        	</select>
	        )
        }

        const langSwitcher = () => {
        	if(attributes.switchType == 'dropdown'){
        		return renderDropdownSwitcher();
	        }else if(attributes.switchType == 'list'){
	        	return ***REMOVED***();
	        }else if(attributes.switchType == 'select'){
	        	return ***REMOVED***();
	        }
	    };

        return (
            <>
	            <***REMOVED***>
	            	<PanelBody>
	            		<SelectControl
	                        label={__('Type', 'wp-multilang')}
	                        value={attributes.switchType}
	                        options={typeOptions}
	                        onChange={(value) => setAttributes({ switchType: value })}
	                    />

	                    <SelectControl
	                        label={__('Show', 'wp-multilang')}
	                        value={attributes.switchShow}
	                        options={showOptions}
	                        onChange={(value) => setAttributes({ switchShow: value })}
	                    />
	            	</PanelBody>
	            </***REMOVED***>
	            
	            <div>
	            	{langSwitcher()}
	            </div>
            </>
        )
    },
    save: function (props) {

    	var attributes = props.attributes;

   		const typeOptions = [ { label: __('Drop Down', 'wp-multilang'), value: 'dropdown' },
                              { label: __('List', 'wp-multilang'), value: 'list' },
                              { label: __('Select', 'wp-multilang'), value: 'select' },
                        	]; 	

        const showOptions = [ { label: __('Both', 'wp-multilang'), value: 'both' },
                              { label: __('Flag', 'wp-multilang'), value: 'flag' },
                              { label: __('Name', 'wp-multilang'), value: 'name' },
                        	];

        const lang = ***REMOVED***.lang; 
    	const languages = ***REMOVED***.languages;

    	const baseFlagUrl =  ***REMOVED***.flag_url
    	const defaultFlag =  baseFlagUrl + languages[lang].flag;
    	const defaultLang =  languages[lang].name;

    	const currentURL  =  window.location.href;
    	const ***REMOVED*** = Object.keys(languages);


        const renderDropdownSwitcher = () => {
        	let ulClass = "wpm-language-switcher wpm-switcher-dropdown";
        	let liClass = "wpm-item-language-main wpm-item-language-en";

        	return (
    			<ul className={ulClass}>
    				<li className={liClass}>
    					<span>
    						{(attributes.switchShow == "flag" || attributes.switchShow == "both") &&
    							<img src={defaultFlag} alt={defaultLang} />
    						}
    						{(attributes.switchShow == "name" || attributes.switchShow == "both") &&
								<span>{defaultLang}</span>
							}
    					</span> 
    					<ul className="wpm-language-dropdown">
    						{***REMOVED***.map((langIndex, langValue) => ( 
    							langIndex != lang && 
        						<li key={langValue} className={'wpm-item-language-'+langIndex}>
									<a href="#" data-lang={langIndex}>
										{ (attributes.switchShow == "flag" || attributes.switchShow == "both") && 
											<img src={baseFlagUrl+languages[langIndex].flag} alt={languages[langIndex].name} />
										}
										{ (attributes.switchShow == "name" || attributes.switchShow == "both") &&
											<span>{languages[langIndex].name}</span>
										}
									</a>
								</li>
    						))}
						</ul>
    				</li>
    			</ul>
        	);
        }

        const ***REMOVED*** = () => {
        	return (
        		<ul className="wpm-language-switcher wpm-switcher-list">
        			{***REMOVED***.map((langIndex, langValue) => ( 
        				<li key={langValue} className={'wpm-item-language-'+langIndex}>
        					{ lang == langIndex && 
        						<span data-lang={langIndex}>
        						{ (attributes.switchShow == "flag" || attributes.switchShow == "both") && 
									<img src={baseFlagUrl+languages[langIndex].flag} alt={languages[langIndex].name} />
								}
								{ (attributes.switchShow == "name" || attributes.switchShow == "both") &&
									<span>{languages[langIndex].name}</span>
								}
								</span>
        					}

        					{ lang != langIndex && 
        						<a href="#" data-lang={langIndex}>
        						{ (attributes.switchShow == "flag" || attributes.switchShow == "both") && 
									<img src={baseFlagUrl+languages[langIndex].flag} alt={languages[langIndex].name} />
								}
								{ (attributes.switchShow == "name" || attributes.switchShow == "both") &&
									<span>{languages[langIndex].name}</span>
								}
								</a>
        					} 
        				</li>
        			))}
        		</ul>
        	)
        }

        const ***REMOVED*** = () => {
        	return (
	        	<select className="wpm-language-switcher wpm-switcher-select" title={__( 'Language Switcher', 'wp-multilang' )}>
	        		{***REMOVED***.map((langIndex, langValue) => (
	        			lang != langIndex ?
	        				<option key={langValue} value={langIndex} data-lang={langIndex}>{languages[langIndex].name}</option> :
	        				<option key={langValue} value={langIndex} data-lang={langIndex} selected="selected">{languages[langIndex].name}</option> 
	        		))}
	        	</select>
	        )
        }

        const langSwitcher = () => {
        	if(attributes.switchType == 'dropdown'){
        		return renderDropdownSwitcher();
	        }else if(attributes.switchType == 'list'){
	        	return ***REMOVED***();
	        }else if(attributes.switchType == 'select'){
	        	return ***REMOVED***();
	        }
	    };

        return (
                <div>
	            	{langSwitcher()}
	            </div>
            )
    },
} );