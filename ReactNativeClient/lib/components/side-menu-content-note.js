const React = require('react'); const Component = React.Component;
const { TouchableOpacity , Button, Text, Image, StyleSheet, ScrollView, View, Alert } = require('react-native');
const { connect } = require('react-redux');
const Icon = require('react-native-vector-icons/Ionicons').default;
const Tag = require('lib/models/Tag.js');
const Note = require('lib/models/Note.js');
const Folder = require('lib/models/Folder.js');
const Setting = require('lib/models/Setting.js');
const { FoldersScreenUtils } = require('lib/folders-screen-utils.js');
const { Synchronizer } = require('lib/synchronizer.js');
const NavService = require('lib/services/NavService.js');
const { reg } = require('lib/registry.js');
const { _ } = require('lib/locale.js');
const { globalStyle, themeStyle } = require('lib/components/global-style.js');
const shared = require('lib/components/shared/side-menu-shared.js');
const { ActionButton } = require('lib/components/action-button.js');

class SideMenuContentNoteComponent extends Component {

	constructor() {
		super();

		this.styles_ = {};
	}

	styles() {
		const theme = themeStyle(this.props.theme);

		if (this.styles_[this.props.theme]) return this.styles_[this.props.theme];
		this.styles_ = {};

		let styles = {
			menu: {
				flex: 1,
				backgroundColor: theme.backgroundColor
			},
			button: {
				flex: 1,
				flexDirection: 'row',
				height: 36,
				alignItems: 'center',
				paddingLeft: theme.marginLeft,
				paddingRight: theme.marginRight,
			},
			sidebarIcon: {
				fontSize: 22,
				color: theme.color,
			},
		};

		styles.sideButton = Object.assign({}, styles.button, { flex: 0 });
		styles.sideButtonText = Object.assign({}, styles.buttonText);

		this.styles_[this.props.theme] = StyleSheet.create(styles);
		return this.styles_[this.props.theme];
	}

	makeDivider(key) {
		return <View style={{ marginTop: 15, marginBottom: 15, flex: -1, borderBottomWidth: 1, borderBottomColor: globalStyle.dividerColor }} key={key}></View>
	}

	renderSideBarButton(key, title, iconName, onPressHandler) {
		const theme = themeStyle(this.props.theme);

		return (
			<TouchableOpacity key={key} onPress={onPressHandler}>
				<View style={this.styles().sideButton}>
					{ !iconName ? null : <Icon name={iconName} style={this.styles().sidebarIcon} /> }
					<Text style={this.styles().sideButtonText}>{title}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		const theme = themeStyle(this.props.theme);

		let items = [];

		const options = this.props.options ? this.props.options() : [];

		for (const option of options) {
			items.push(this.renderSideBarButton(option.title, option.title, null, option.onPress));
		}

		let style = {
			flex:1,
			borderRightWidth: 1,
			borderRightColor: globalStyle.dividerColor,
			backgroundColor: theme.backgroundColor,
		};

		return (
			<View style={style}>
				<View style={{flex:1, opacity: this.props.opacity}}>
					<ScrollView scrollsToTop={false} style={this.styles().menu}>
						{ items }
					</ScrollView>
				</View>
			</View>
		);
	}
};

const SideMenuContentNote = connect(
	(state) => {
		return {
			theme: state.settings.theme,
		};
	}
)(SideMenuContentNoteComponent)

module.exports = { SideMenuContentNote };