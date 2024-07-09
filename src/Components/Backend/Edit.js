import { __ } from '@wordpress/i18n';
import { useEffect } from 'react';

// Settings Components
import { tabController } from '../../../../Components/utils/functions';
import Settings from './Settings/Settings';

import Style from '../Common/Style';
import useWPAjax from '../../utils/useWPAjax';


const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;
	const { columns, layout, } = attributes;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	const { data, isLoading, refetch } = useWPAjax('open_stream_api_key', { nonce: window.wpApiSettings.nonce }, true)
	const { key } = data || {};
	useEffect(() => tabController(), [isSelected]);


	// Event Key 
	useEffect(() => {
		window.addEventListener('dataFetched', () => {
			refetch();
		});

	}, [isLoading, key]);

	useEffect(() => {

		if (!isLoading) {
			console.log(data);
		}

	}, [isLoading]);



	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} />

		<div className={className} id={`prefixBlockName-${clientId}`}>


			<div>
				<h1>Back End</h1>
			</div>
		</div>
	</>;
};
export default Edit;