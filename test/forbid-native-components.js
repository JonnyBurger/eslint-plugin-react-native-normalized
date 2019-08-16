import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/forbid-native-components';

const ruleTester = avaRuleTester(test, {
	env: {
		es6: true
	},
	parserOptions: {
		sourceType: 'module'
	}
});

ruleTester.run('react-native-normalized/forbid-native-components', rule, {
	invalid: [
		{
			code: 'import {Text} from "react-native"',
			errors: [
				{
					ruleId: 'react-native-normalized/forbid-native-components',
					message:
						'Import Text from "react-native-normalized" instead for a more consistent cross-platform behavior.'
				}
			]
		},
		{
			code: 'import {Text, View} from "react-native"',
			errors: [
				{
					ruleId: 'react-native-normalized/forbid-native-components',
					message:
						'Import Text from "react-native-normalized" instead for a more consistent cross-platform behavior.'
				}
			]
		},
		{
			code: 'const {Text} = require("react-native")',
			errors: [
				{
					ruleId: 'react-native-normalized/forbid-native-components',
					message:
						'Import Text from "react-native-normalized" instead for a more consistent cross-platform behavior.'
				}
			]
		},
		{
			code: 'const {Text, Image} = require("react-native")',
			errors: [
				{
					ruleId: 'react-native-normalized/forbid-native-components',
					message:
						'Import Text and Image from "react-native-normalized" instead for a more consistent cross-platform behavior.'
				}
			]
		},
		{
			code: 'const {Text, Image, Alert} = require("react-native")',
			errors: [
				{
					ruleId: 'react-native-normalized/forbid-native-components',
					message:
						'Import Text, Image and Alert from "react-native-normalized" instead for a more consistent cross-platform behavior.'
				}
			]
		}
	],
	valid: [
		'import {Text} from "react-native-normalized"',
		'import {View} from "react-native"',
		'import {Image} from "got"'
	]
});
