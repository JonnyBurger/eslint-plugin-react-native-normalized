const isStaticRequire = node => {
	return (
		node &&
		node.callee &&
		node.callee.type === 'Identifier' &&
		node.callee.name === 'require' &&
		node.arguments.length === 1 &&
		node.arguments[0].type === 'Literal' &&
		typeof node.arguments[0].value === 'string'
	);
};

const and = (data, separator = 'and', oxfordComma = false) => {
	const input = [].concat(data);
	const items = input.length;
	const lastItem = input.pop();
	if (input.length) {
		return `${input.join(', ')}${
			oxfordComma && items > 2 ? ',' : ''
		} ${separator} ${lastItem}`.trim();
	} else {
		return lastItem;
	}
};

function reportIfMissing(context, node, disallowed, name, tokens) {
	if (name === 'react-native') {
		const filtered = tokens
			.filter(t => {
				return [
					t.type === 'Identifier' && disallowed.includes(t.value),
					t.key &&
						t.key.type === 'Identifier' &&
						disallowed.includes(t.key.name),

					t.type === 'ImportSpecifier' &&
						disallowed.includes(t.imported.name) &&
						t.parent.source.value === 'react-native'
				].some(Boolean);
			})
			.map(t => {
				if (t.imported) {
					return t.imported.name;
				}
				if (t.key) {
					return t.key.name;
				}
				return t.value;
			})
			.filter((value, index, self) => {
				return self.indexOf(value) === index;
			});
		if (filtered.length > 0) {
			context.report({
				node,
				message: `Import ${and(
					filtered
				)} from "react-native-normalized" instead for a more consistent cross-platform behavior.`
			});
		}
	}
}

module.exports = {
	meta: {
		type: 'suggestion'
	},

	create: function(context) {
		const options = context.options[0] || {};
		const disallowed = options.disallowed || ['Text', 'Image', 'Alert'];

		return {
			ImportDeclaration: function handleImports(node) {
				reportIfMissing(
					context,
					node,
					disallowed,
					node.source.value,
					node.parent.body.find(
						b =>
							b.type === 'ImportDeclaration' &&
							b.source.value === 'react-native'
					)
						? node.parent.body.find(
								b =>
									b.type === 'ImportDeclaration' &&
									b.source.value === 'react-native'
						  ).specifiers
						: node.parent.tokens
				);
			},
			CallExpression: function handleRequires(node) {
				if (isStaticRequire(node) && node.parent.id) {
					reportIfMissing(
						context,
						node,
						disallowed,
						node.arguments[0].value,
						node.parent.id.properties
					);
				}
			}
		};
	}
};
