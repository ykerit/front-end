import { Icon, Menu } from 'antd';
import { Link } from 'dva/router'

export default function Header() {
  return (
    <div style={{ width: '100%' }}>
      <Menu
        mode="horizontal"
        style={{ paddingLeft: '75%', fontSize: 18 }}
      >
        <Menu.Item>
          <Link to="/"><Icon type="home" />首页</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to=""><Icon type="paper-clip"/>归档</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to=""><Icon type="tags" />标签</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to=""><Icon type="user"/>关于</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
