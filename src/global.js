const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editPost;
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { useState, useEffect } from 'react';
import useWPAjax from './utils/useWPAjax';

const PluginSidebarTest = () => {
    const [tData, setTData] = useState({});

    const { data, saveData, isLoading, error, refetch } = useWPAjax('test_option_table', { nonce: window.wpApiSettings.nonce }, true)


    const onSave = () => {
        console.log("Hi Test");
        saveData({ data: JSON.stringify(setTData) });
    }

    return (
        <PluginSidebar name="plugin-sidebar-test" title="My Plugin">
            <InputControl
                label="API Key"
                value={tData.key}
                onChange={(val) => {
                    setTData({ ...tData, key: val });
                }}
            />

            <button onClick={onSave}>save</button>
        </PluginSidebar>
    );
};

registerPlugin('plugin-sidebar-test', { render: PluginSidebarTest });
