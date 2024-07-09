const BlockName = ({ attributes }) => {
	const { items, columns, layout, content, icon, img } = attributes;

	return <div className={`prefixBlockName columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile} ${layout || 'vertical'}`}>

		<h1>Front End</h1>
	</div>
}
export default BlockName;