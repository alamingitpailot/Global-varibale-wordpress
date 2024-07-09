
import { __ } from '@wordpress/i18n';
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { useState, useEffect } from 'react';

const { PanelBody, Button } = wp.components;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

import { mailchimp } from './utils/icons';
import useWPAjax from './utils/useWPAjax';

const dataFetched = new CustomEvent('dataFetched');

const RenderPlugin = () => {

    const [mcbData, setMcbData] = useState({});
    const { key = '' } = mcbData || {};

    const { data, saveData, isLoading, error, refetch } = useWPAjax('open_stream_api_key', { nonce: window.wpApiSettings.nonce }, true)

    // Get first data
    useEffect(() => {
        if (!isLoading && data) {
            setMcbData({ ...data });
            window.dispatchEvent(dataFetched);
        }
    }, [data, isLoading]);

    // Save to database
    const onSaveData = () => {
        if (!isLoading) {
            console.log({ mcbData });
            saveData({ data: JSON.stringify(mcbData) });
        }
    }

    return <>
        <PluginSidebarMoreMenuItem target='mail-collections'>{__('MailChimp', 'mail-collections')}</PluginSidebarMoreMenuItem>

        <PluginSidebar className='bPlPluginSidebar' name='mcb-mailchimp' title={__('MailChimp', 'mail-collections')}>
            <PanelBody className='bPlPanelBody mcbPanelBody' title={__('Connection', 'mail-collections')} initialOpen={true}>
                <div className="configHelp">
                    <InputControl className="mcbInputControl" value={key} onChange={val => { setMcbData({ ...mcbData, key: val }); }} />
                </div>
                <Button className='apiBtn' disabled={isLoading} onClick={onSaveData} >{__('Save Information', 'mail-collections')}</Button>

            </PanelBody>
        </PluginSidebar>
    </>
};

registerPlugin('mcb-mailchimp', {
    icon: mailchimp,
    render: RenderPlugin
});