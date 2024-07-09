import { createRoot } from 'react-dom/client';

import './style.scss';
import Style from './Components/Common/Style';
import BlockName from './Components/Frontend/BlockName';

document.addEventListener('DOMContentLoaded', () => {
	const blockEls = document.querySelectorAll('.wp-block-prefix-block-name');
	blockEls.forEach(blockEl => {
		const attributes = JSON.parse(blockEl.dataset.attributes);

		createRoot(blockEl).render(<>
			<Style attributes={attributes} id={blockEl.id} />

			<BlockName attributes={attributes} />
		</>);

		blockEl?.removeAttribute('data-attributes');
	});
});