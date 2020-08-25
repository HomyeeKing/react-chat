import React from 'react'
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const LeftMenu = ({ mode, theme }: any) => {
	return (
		<div>
			<Menu mode={mode} theme={theme}>
				<Menu.Item key="mail">
					<a href="/">首页</a>
				</Menu.Item>
				<SubMenu title={<span>博客</span>}>
					<MenuItemGroup title="Item 1">
						<Menu.Item key="setting:1">Option 1</Menu.Item>
						<Menu.Item key="setting:2">Option 2</Menu.Item>
					</MenuItemGroup>
					<MenuItemGroup title="Item 2">
						<Menu.Item key="setting:3">Option 3</Menu.Item>
						<Menu.Item key="setting:4">Option 4</Menu.Item>
					</MenuItemGroup>
				</SubMenu>
				<Menu.Item key="ChatRoom">
					<a href="/chat">聊天室</a>
				</Menu.Item>
			</Menu>
		</div>
	)
}

export default LeftMenu
