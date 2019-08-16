const fs = require('fs');
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

function findTokens(node, recurse = 0) {
	if (recurse > 10) {
		return [];
	}
	if (node.tokens) {
		return node.tokens;
	}
	return findTokens(node.parent, recurse + 1);
}

function reportIfMissing(context, node, disallowed, name) {
	if (name === 'react-native') {
		const tokens = findTokens(node)
			.filter(t => {
				return t.type === 'Identifier' && disallowed.includes(t.value);
			})
			.map(t => {
				return t.value;
			});
		if (tokens.length > 0) {
			context.report({
				node,
				message: `Import ${and(
					tokens
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
				reportIfMissing(context, node, disallowed, node.source.value);
			},
			CallExpression: function handleRequires(node) {
				if (isStaticRequire(node)) {
					reportIfMissing(context, node, disallowed, node.arguments[0].value);
				}
			}
		};
	}
};
