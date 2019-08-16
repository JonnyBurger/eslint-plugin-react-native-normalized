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
		},
		{
			code: `
				import {Text} from 'react-native';
				import {Image} from 'react-native-normalized'
			`,
			errors: [
				{
					ruleId: 'react-native-normalized/forbid-native-components',
					message:
						'Import Text from "react-native-normalized" instead for a more consistent cross-platform behavior.'
				}
			]
		}
	],
	valid: [
		'import {Text} from "react-native-normalized"',
		'import {View} from "react-native"',
		'import {Image} from "got"',
		'import {View, TouchableOpacity, Keyboard} from "react-native";',
		`
			import {Text, Image} from 'react-native-normalized';
			import {StyleSheet} from 'react-native'
		`,
		`
			import {StyleSheet} from 'react-native'
			import {Text, Image} from 'react-native-normalized';
		`,
		`
			const {StyleSheet} = require('react-native')
			const {Text, Image} = require('react-native-normalized');
		`,
		`
			HudManager.setHudContent({
				icon: require('./assets/clear.png'),
				label: strings.COULD_NOT_VOTE
			});
		`,
		`
			'use strict';
			import {AsyncStorage} from 'react-native';
		`,
		`
			import React, {Component, ReactElement} from 'react';
			import {Text, ActivityIndicator} from 'react-native-normalized';
			import {StyleSheet, View, Platform} from 'react-native';
		`
	]
});
